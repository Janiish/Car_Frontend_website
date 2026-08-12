import { getCldImageUrl } from "next-cloudinary";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { ContentfulCloudinaryAssetField } from "./cld-types";
import { useAiAssetTag, type AiAssetTagOwnProps } from "../components/project/ai-tag";

// Mirrors Next.js' default `images.deviceSizes`. Unlike CldImage (which wraps
// next/image and reads these from next.config), CldPicture builds its srcset by
// hand, so the widths must be defined here to keep Cloudinary's cached variants
// consistent with the rest of the app.
const DEFAULT_DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

type CropConfig = {
    aspectRatio: string;
    type?: string;
    gravity?: string;
};

type BreakpointSource = {
    media: string;
    crop: CropConfig;
    widths?: number[];
    sizes?: string;
};

export type CldPictureProps = AiAssetTagOwnProps & {
    cloudinaryAsset: ContentfulCloudinaryAssetField;
    sources: BreakpointSource[];
    defaultCrop: CropConfig;
    defaultWidths?: number[];
    sizes?: string;
    alt?: string;
    priority?: boolean;
    loading?: "lazy" | "eager";
    style?: CSSProperties;
    className?: string;
    /**
     * Links the `<img>` to a disclosure rendered by the caller. Pair with
     * `hideAiTag` and the caller's own `AiAssetTag` so the badge stays
     * reachable when a screen reader jumps straight to the image.
     */
    imgAriaDescribedBy?: string;
};

function buildSrcSet(publicId: string, crop: CropConfig, widths: number[]) {
    const cropType = crop.type ?? "thumb";
    const gravity = crop.gravity ?? "auto";

    return widths
        .map((w) => {
            const url = getCldImageUrl({
                src: publicId,
                width: w,
                format: "auto",
                quality: "auto",
                rawTransformations: [`c_${cropType},ar_${crop.aspectRatio},g_${gravity}`],
            });
            return `${url} ${w}w`;
        })
        .join(", ");
}

export const CldPicture = ({
    cloudinaryAsset,
    sources,
    defaultCrop,
    defaultWidths = DEFAULT_DEVICE_SIZES,
    sizes = "100vw",
    alt,
    priority = false,
    loading,
    style,
    className,
    aiTagPosition,
    aiTagOffset,
    hideAiTag,
    imgAriaDescribedBy,
}: CldPictureProps) => {
    const publicId = cloudinaryAsset?.[0]?.public_id;
    const resolvedAlt = cloudinaryAsset?.[0]?.context?.custom?.alt ?? alt ?? "";
    const blurDataUrl = cloudinaryAsset?.[0]?.blur_data_url ?? undefined;

    const { ariaDescribedBy, tag: aiTagElement } = useAiAssetTag(cloudinaryAsset, "image", {
        aiTagPosition,
        aiTagOffset,
        hideAiTag,
    });

    const [loaded, setLoaded] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!blurDataUrl || !imgRef.current) return;
        if (imgRef.current.complete && imgRef.current.naturalWidth > 0) setLoaded(true);
    }, [blurDataUrl]);

    const srcSets = useMemo(() => {
        if (!publicId) return null;
        return {
            sources: sources.map((source) => ({
                media: source.media,
                srcSet: buildSrcSet(publicId, source.crop, source.widths ?? defaultWidths),
                sizes: source.sizes ?? sizes,
            })),
            fallback: buildSrcSet(publicId, defaultCrop, defaultWidths),
        };
    }, [publicId, sources, defaultCrop, defaultWidths, sizes]);

    if (!srcSets) return null;

    const resolvedLoading = loading ?? (priority ? undefined : "lazy");

    // React 18.2 doesn't recognize the camelCase `fetchPriority` prop and warns
    // when it's forwarded to the DOM, so emit the lowercase `fetchpriority`
    // attribute directly. Only set it when prioritizing to avoid a stray attr.
    const fetchPriorityAttr = priority ? { fetchpriority: "high" } : {};

    const crossfade = "opacity 400ms cubic-bezier(0.23, 1, 0.32, 1)";

    return (
        // Single wrapper keeps the overlay from being treated as a fill-child by
        // parents like Chakra `AspectRatio` (which force `& > *` to 100%/100%).
        // `absolute` + `inset:0` fills — and positions — inside both an
        // AspectRatio ratio box and any relative caller container.
        <div style={{ position: "absolute", inset: 0 }}>
            {blurDataUrl && (
                <div
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `url(${blurDataUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "blur(32px)",
                        transform: "scale(1.1) translateZ(0)",
                        opacity: loaded ? 0 : 1,
                        transition: crossfade,
                    }}
                />
            )}
            <picture style={{ display: "block" }}>
                {srcSets.sources.map((source) => (
                    <source
                        key={source.media}
                        media={source.media}
                        srcSet={source.srcSet}
                        sizes={source.sizes}
                    />
                ))}
                <img
                    ref={imgRef}
                    srcSet={srcSets.fallback}
                    sizes={sizes}
                    alt={resolvedAlt}
                    loading={resolvedLoading}
                    decoding={priority ? "sync" : "async"}
                    aria-describedby={ariaDescribedBy ?? imgAriaDescribedBy}
                    {...fetchPriorityAttr}
                    className={className}
                    onLoad={blurDataUrl ? () => setLoaded(true) : undefined}
                    style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        inset: 0,
                        objectFit: "cover",
                        ...style,
                        ...(blurDataUrl && {
                            opacity: loaded ? 1 : 0,
                            transition: crossfade,
                        }),
                    }}
                />
            </picture>
            {aiTagElement}
        </div>
    );
};
