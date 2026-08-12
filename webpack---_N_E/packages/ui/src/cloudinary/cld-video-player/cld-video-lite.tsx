import { chakra, useMergeRefs, type HTMLChakraProps } from "@chakra-ui/react";
import {
    forwardRef,
    useEffect,
    useMemo,
    useRef,
    type MutableRefObject,
    type ReactNode,
    type RefObject,
} from "react";
import { ChakraVideo } from "./chakra-video";
import type { ContentfulCloudinaryAssetField } from "../cld-types";
import { getCldVideoUrl, getPosterUrl } from "../utils";
import { useCldVideoUrl } from "./hooks";
import { useInView } from "framer-motion";
import { useAiAssetTag, type AiAssetTagOwnProps } from "../../components/project/ai-tag";

/** Two-phase load margins: attach the source generously early; start playback only once truly visible. */
const NEAR_MARGIN = "300px 0px";
const VISIBLE_MARGIN = "0px";

type CldVideoLiteProps = React.ComponentProps<typeof ChakraVideo> &
    AiAssetTagOwnProps & {
        cloudinaryAsset: ContentfulCloudinaryAssetField;
        wrapperProps?: HTMLChakraProps<"div">;
        watchIsInView?: boolean;
        warm?: boolean;
        onFirstFrame?: () => void;
        children?: ReactNode;
    };

function resolveSource(shouldLoad: boolean, ssrUrl: string, videoUrl: string | null) {
    if (!shouldLoad || !videoUrl) return { src: ssrUrl, preload: "none" as const };
    return { src: videoUrl, preload: "auto" as const };
}

function safePlay(video: HTMLVideoElement) {
    const playPromise = video.play();
    if (playPromise !== undefined) {
        playPromise.catch(() => undefined);
    }
}

function useSafeVideoPlay(
    videoRef: RefObject<HTMLVideoElement | null>,
    shouldPlay: boolean,
    src: string
) {
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        if (!shouldPlay) {
            video.pause();
            return;
        }

        let cancelled = false;
        const tryPlay = () => {
            if (!cancelled) safePlay(video);
        };

        if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
            tryPlay();
            return;
        }

        video.addEventListener("loadeddata", tryPlay, { once: true });
        return () => {
            cancelled = true;
            video.removeEventListener("loadeddata", tryPlay);
        };
    }, [videoRef, shouldPlay, src]);
}

function fireFirstFrame(
    video: HTMLVideoElement | null,
    firedRef: MutableRefObject<boolean>,
    onFirstFrame: (() => void) | undefined
) {
    if (firedRef.current || !onFirstFrame) return;

    const mark = () => {
        firedRef.current = true;
        onFirstFrame();
    };

    if (video && "requestVideoFrameCallback" in HTMLVideoElement.prototype) {
        video.requestVideoFrameCallback(mark);
        return;
    }
    mark();
}

function posterBackgroundStyle(posterUrl: string | undefined) {
    if (!posterUrl) return undefined;
    return {
        backgroundImage: `url(${posterUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    };
}

const CldVideoLite = forwardRef<HTMLVideoElement, CldVideoLiteProps>((props, ref) => {
    const {
        wrapperProps,
        cloudinaryAsset,
        watchIsInView = true,
        autoPlay = true,
        warm = false,
        onFirstFrame,
        children,
        aiTagPosition,
        aiTagOffset,
        hideAiTag,
        ...rest
    } = props;

    const { ariaDescribedBy, tag: aiTagElement } = useAiAssetTag(cloudinaryAsset, "video", {
        aiTagPosition,
        aiTagOffset,
        hideAiTag,
    });

    const wrapperRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const mergedVideoRef = useMergeRefs(videoRef, ref);
    const isNear = useInView(wrapperRef, { once: true, margin: NEAR_MARGIN });
    const isVisible = useInView(wrapperRef, { once: true, margin: VISIBLE_MARGIN });
    const firstFrameFiredRef = useRef(false);

    const videoUrl = useCldVideoUrl({ cloudinaryAsset });
    const posterUrl = useMemo(() => getPosterUrl(cloudinaryAsset), [cloudinaryAsset]);
    const ssrUrl = useMemo(
        () => getCldVideoUrl({ src: cloudinaryAsset![0].public_id! }),
        [cloudinaryAsset]
    );

    const shouldLoad = warm || !watchIsInView || isNear;
    const { src, preload } = resolveSource(shouldLoad, ssrUrl, videoUrl);
    const shouldPlay = Boolean(autoPlay && shouldLoad && (!watchIsInView || isVisible));

    useSafeVideoPlay(videoRef, shouldPlay, src);

    useEffect(() => {
        const video = videoRef.current;
        if (video && !video.muted) video.muted = true;
    }, []);

    return (
        <chakra.div
            borderRadius="large"
            ref={wrapperRef}
            __css={{ position: "relative", width: "100%", height: "100%", bg: "porscheBlack" }}
            {...wrapperProps}
            style={posterBackgroundStyle(posterUrl)}
        >
            <ChakraVideo
                {...rest}
                ref={mergedVideoRef}
                src={src}
                preload={preload}
                autoPlay={false}
                muted={true}
                loop={true}
                playsInline
                poster={posterUrl}
                objectFit="cover"
                position="absolute"
                zIndex={0}
                width="100%"
                height="100%"
                suppressHydrationWarning
                aria-describedby={ariaDescribedBy}
                onLoadedData={() =>
                    fireFirstFrame(videoRef.current, firstFrameFiredRef, onFirstFrame)
                }
            >
                {children}
            </ChakraVideo>
            {aiTagElement}
        </chakra.div>
    );
});

CldVideoLite.displayName = "CldVideoLite";

export { CldVideoLite };
