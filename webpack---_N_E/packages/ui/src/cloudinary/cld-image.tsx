import { CldImage as CloudinaryImage } from "next-cloudinary";
import type { CldImageProps as CloudinaryImageProps } from "next-cloudinary";
import type { BoxProps } from "../components/chakra-ui/box";
import type { ChakraComponent, HTMLChakraProps, ResponsiveValue } from "@chakra-ui/react";
import { chakra, forwardRef, useTheme, getToken } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useRef, useState, type SyntheticEvent } from "react";
import type { ContentfulCloudinaryAssetField } from "./cld-types";
import { MotionBox } from "../components/project/motion-box";
import { animateProps } from "./animate-props";
import { useAiAssetTag, type AiAssetTagOwnProps } from "../components/project/ai-tag";
import type { HTMLMotionProps } from "framer-motion";
import { useBreakpointValue } from "../hooks/chakra-ui/chakra-ui";
import { theme } from "../theme/theme";

export const getImageIsLandscape = (imageArr?: { width: number; height: number }[]): boolean => {
    if (!imageArr?.[0]) return false;
    const image = imageArr[0];
    return image.width > image.height;
};

type PureCldImageProps = Omit<
    CloudinaryImageProps,
    "sizes" | "src" | "alt" | "objectFit" | "aspectRatio"
> & {
    sizes?: ResponsiveValue<string>;
    cloudinaryAsset: ContentfulCloudinaryAssetField;
    wrapperProps?: BoxProps;
    motionWrapperProps?: BoxProps & HTMLMotionProps<"div">;
    alt?: string;
};

type HTMLChakraPropsForImg = Omit<HTMLChakraProps<"img">, "aspectRatio">;

type CldImageProps = PureCldImageProps &
    Omit<HTMLChakraPropsForImg, keyof PureCldImageProps> &
    AiAssetTagOwnProps & {
        fill?: boolean;
        animate?: boolean;
        aspectRatio?: ResponsiveValue<string | number>;
    };

const ChakraCloudinaryImage: ChakraComponent<
    "img",
    Omit<CldImageProps, "cloudinaryAsset">
> = chakra(CloudinaryImage, {
    shouldForwardProp: (prop) =>
        [
            "src",
            "alt",
            "width",
            "height",
            "fill",
            "loader",
            "quality",
            "priority",
            "loading",
            "placeholder",
            "blurDataURL",
            "unoptimized",
            "onLoad",
            "sizes",
            "gravity",
            "crop",
            "blur",
            "overflow",
            "rawTransformations",
            "aspectRatio",
            // This allowlist replaces Chakra's default forwarding, which would
            // otherwise pass `aria-*` through automatically. Needed so the AI
            // disclosure can be linked to the image it describes.
            "aria-describedby",
        ].includes(prop),
});

ChakraCloudinaryImage.displayName = "ChakraCloudinaryImage";

function validateCloudinaryAsset(cloudinaryAsset: ContentfulCloudinaryAssetField) {
    if (!cloudinaryAsset) {
        throw new Error("CldImage: cloudinaryAsset is required");
    }

    if (Array.isArray(cloudinaryAsset)) {
        if (cloudinaryAsset.length === 0) {
            throw new Error("CldImage: cloudinaryAsset is required but array was empty");
        }

        if (cloudinaryAsset.length > 1) {
            throw new Error(
                "CldImage: cloudinaryAsset should be a single asset, not an array of assets - this needs to be configured in the Contentful Cloudinary App"
            );
        }
    }

    return cloudinaryAsset;
}

const createSizeStringWithBreakpoint = (size: string, breakpoint: string) => {
    return `(max-width: ${parseInt(breakpoint) - 1}px) ${size}`;
};

const useCloudinaryAspectRatio = (
    aspectRatio: ResponsiveValue<string> | undefined
): string | null => {
    const aspectRatioTokenKeyForCurrentBreakpoint = useBreakpointValue(
        typeof aspectRatio === "string" ? { base: aspectRatio } : (aspectRatio ?? [null])
    );

    let aspectRatioTokenValueForCurrentBreakpoint: string | null = null;

    if (aspectRatioTokenKeyForCurrentBreakpoint) {
        aspectRatioTokenValueForCurrentBreakpoint = getToken(
            "aspectRatios",
            aspectRatioTokenKeyForCurrentBreakpoint
        )(theme);
    }

    return aspectRatioTokenValueForCurrentBreakpoint;
};

const useParsedSizes = (sizes?: ResponsiveValue<string>) => {
    const { breakpoints }: { breakpoints: Record<string, string> } = useTheme();

    const parseSizes = useCallback(
        (inputSizes: ResponsiveValue<string>) => {
            const remainingBreakpoints = Object.values(breakpoints).slice(1);
            const parsedSizes: string[] = [];

            // Convert inputSizes to a unified format (array)
            const unifiedSizes = Array.isArray(inputSizes)
                ? inputSizes.map((size, index) => ({ size, index }))
                : Object.entries(inputSizes).map(([_, size], index) => ({ size, index }));

            unifiedSizes.forEach(({ size, index }) => {
                if (!size) return;
                const isLast = index === unifiedSizes.length - 1;
                const s = isLast
                    ? size
                    : createSizeStringWithBreakpoint(size, remainingBreakpoints[index]);
                if (s) parsedSizes.push(s);
            });

            return parsedSizes.join(", ");
        },
        [breakpoints]
    );

    return useMemo(() => {
        if (!sizes) return;
        if (typeof sizes === "string") return sizes;
        return parseSizes(sizes);
    }, [sizes, parseSizes]);
};

const CROSSFADE_TRANSITION = "opacity 400ms cubic-bezier(0.23, 1, 0.32, 1)";

function useBlurCrossfade(
    decoratedBlur: string | undefined,
    onLoad: ((event: SyntheticEvent<HTMLImageElement>) => void) | undefined
) {
    const [loaded, setLoaded] = useState(false);
    const wrapperRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!wrapperRef.current) return;
        const img = wrapperRef.current.querySelector("img");
        if (img?.complete && img.naturalWidth > 0) setLoaded(true);
    }, []);

    const handler = useCallback(
        (event: SyntheticEvent<HTMLImageElement>) => {
            setLoaded(true);
            onLoad?.(event);
        },
        [onLoad]
    );

    return { loaded, wrapperRef, onLoad: handler };
}

/**
 * Server-decorated LQIP is rendered via the manual blur-crossfade overlay
 * below (see `useBlurUrl`/`blurUrl`), so next/image's own `placeholder="blur"`
 * is intentionally NOT auto-applied from the decorated asset here - doing so
 * would stack two blur layers on top of each other. Callers can still opt
 * into next/image's built-in placeholder explicitly via their own props.
 */
function resolveBlurProps(
    callerPlaceholder: CloudinaryImageProps["placeholder"] | undefined,
    callerBlurDataURL: string | undefined
) {
    return { placeholder: callerPlaceholder, blurDataURL: callerBlurDataURL };
}

function resolveCldProps(
    rawTransformations: CldImageProps["rawTransformations"],
    crop: CldImageProps["crop"],
    gravity: CldImageProps["gravity"]
) {
    return {
        ...(rawTransformations ? {} : { gravity: gravity ?? "auto", crop: crop ?? "thumb" }),
        rawTransformations,
    };
}

/**
 * Only returns a blur URL for assets that were actually decorated
 * server-side with a blur placeholder. Deliberately does NOT fall back to
 * generating a Cloudinary URL on the fly - that would trigger an extra
 * network request and the manual overlay for every image site-wide,
 * including the majority of pre-existing usages that never opted into it.
 */
function useBlurUrl(asset: NonNullable<ContentfulCloudinaryAssetField>) {
    return asset[0]?.blur_data_url ?? undefined;
}

function resolveWrapperCss(
    overflow: CldImageProps["overflow"],
    width: CldImageProps["width"],
    height: CldImageProps["height"]
) {
    return {
        position: "relative" as const,
        overflow: overflow ?? "hidden",
        width: width ?? "100%",
        height: height ?? "100%",
    };
}

const CldImage = forwardRef<CldImageProps, "img">((props, ref) => {
    const validCloudinaryAsset = validateCloudinaryAsset(props.cloudinaryAsset);

    const {
        // These are the props for Next Image
        alt,
        width,
        height,
        fill,
        loader,
        onError,
        quality,
        priority,
        loading,
        sizes,
        placeholder,
        blurDataURL,
        unoptimized,
        onLoad,
        objectFit,
        objectPosition,
        title,
        cloudinaryAsset,
        wrapperProps,
        crop,
        gravity,
        overflow,
        rawTransformations,
        animate = false,
        motionWrapperProps,
        aspectRatio,
        aiTagPosition,
        aiTagOffset,
        hideAiTag,
        ...rest
    } = props;

    const { ariaDescribedBy, tag: aiTagElement } = useAiAssetTag(cloudinaryAsset, "image", {
        aiTagPosition,
        aiTagOffset,
        hideAiTag,
    });

    const { placeholder: _placeholder, blurDataURL: _blurDataURL } = resolveBlurProps(
        placeholder,
        blurDataURL
    );

    const blurUrl = useBlurUrl(validCloudinaryAsset);
    const blur = useBlurCrossfade(blurUrl, onLoad);

    const imageProps: Omit<CloudinaryImageProps, "src" | "alt"> = {
        width,
        height,
        quality,
        priority,
        loading,
        fill,
        onError,
        loader,
        onLoad: blur.onLoad,
        placeholder: _placeholder,
        blurDataURL: _blurDataURL,
        unoptimized,
        objectPosition,
        title,
    };

    const sizesString = useParsedSizes(sizes);

    const cloudinaryAspectRatio = useCloudinaryAspectRatio(aspectRatio as ResponsiveValue<string>);

    const _src = validCloudinaryAsset[0].public_id;
    const _objectFit =
        (objectFit as "contain" | "cover" | "fill" | "none" | "scale-down") ?? "cover";
    const _alt = validCloudinaryAsset[0].context?.custom?.alt ?? alt ?? "";
    const cldProps = resolveCldProps(rawTransformations, crop, gravity);

    if (!_src) {
        throw new Error("CldImage: Missing public_id in cloudinaryAsset");
    }

    return (
        <chakra.div
            borderRadius="large"
            __css={resolveWrapperCss(overflow, width, height)}
            {...wrapperProps}
            ref={(node: never) => {
                blur.wrapperRef.current = node;
                if (typeof ref === "function") ref(node);
                else if (ref) (ref as React.MutableRefObject<typeof node>).current = node;
            }}
        >
            {blurUrl && (
                <div
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 1,
                        backgroundImage: `url(${blurUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "blur(32px)",
                        transform: "scale(1.1) translateZ(0)",
                        opacity: blur.loaded ? 0 : 1,
                        transition: CROSSFADE_TRANSITION,
                        pointerEvents: "none",
                    }}
                />
            )}
            <MotionBox
                {...(animate && animateProps)}
                position="relative"
                width="100%"
                height="100%"
                style={{
                    opacity: blur.loaded ? 1 : 0,
                    transition: CROSSFADE_TRANSITION,
                }}
                {...motionWrapperProps}
            >
                <ChakraCloudinaryImage
                    {...rest}
                    {...imageProps}
                    {...(sizes && { sizes: sizesString })}
                    {...(sizes && !width && !height && { fill: true })}
                    {...cldProps}
                    {...(cloudinaryAspectRatio && {
                        aspectRatio: cloudinaryAspectRatio,
                    })}
                    alt={_alt}
                    objectFit={_objectFit}
                    src={_src}
                    ref={ref}
                    zIndex={0}
                    aria-describedby={ariaDescribedBy}
                />
                {aiTagElement}
            </MotionBox>
        </chakra.div>
    );
});

CldImage.displayName = "CldImage";

export { CldImage };
export type { CldImageProps };
