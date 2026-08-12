import type { CldVideoPlayerProps as CloudinaryVideoPlayerProps } from "next-cloudinary";
import { getCldVideoUrl } from "next-cloudinary";
import type { ReactPlayerProps } from "react-player";
import ReactPlayer from "react-player";
import type { ContentfulCloudinaryAssetField } from "../cld-types";
import { chakra, forwardRef, useMergeRefs, type HTMLChakraProps } from "@chakra-ui/react";
import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import type { Dispatch, OnProgressProps } from "./cld-video-context";
import { useCldVideoPlayer } from "./cld-video-context";
import { ChakraVideo } from "./chakra-video";
import { getPosterUrl } from "../utils";
import { useCldVideoUrl } from "./hooks";
import { useInView } from "framer-motion";
import { MotionBox } from "../../components/project/motion-box";
import { animateProps } from "../animate-props";
import { useAiAssetTag, type AiAssetTagOwnProps } from "../../components/project/ai-tag";

type CldVideoProps = Omit<CloudinaryVideoPlayerProps, "src"> &
    ReactPlayerProps &
    AiAssetTagOwnProps & {
        cloudinaryAsset: ContentfulCloudinaryAssetField;
        wrapperProps?: HTMLChakraProps<"div">;
        inViewAutoplay?: boolean | null;
        animate?: boolean;
    };

const reactVideoPlayerPropsToForward: Array<keyof ReactPlayerProps> = [
    "url",
    "playing",
    "loop",
    "controls",
    "volume",
    "muted",
    "playbackRate",
    "width",
    "height",
    "progressInterval",
    "playsinline",
    "playIcon",
    "previewTabIndex",
    "pip",
    "stopOnUnmount",
    "light",
    "fallback",
    "wrapper",
    "onReady",
    "onStart",
    "onPlay",
    "onPause",
    "onBuffer",
    "onBufferEnd",
    "onEnded",
    "onClickPreview",
    "onEnablePIP",
    "onDisablePIP",
    "onError",
    "onDuration",
    "onSeek",
    "onProgress",
    "poster",
];

const ChakraReactPlayer = chakra(ReactPlayer, {
    shouldForwardProp: (prop: string) => reactVideoPlayerPropsToForward.includes(prop),
});

const handleInViewPlayPause = (
    clientSideVideoReady: boolean,
    autoplay: boolean | undefined,
    isInView: boolean,
    isPlaying: boolean,
    userPaused: boolean | undefined,
    dispatch: Dispatch
) => {
    if (clientSideVideoReady && autoplay && isInView && !isPlaying && !userPaused) {
        dispatch({ type: "PLAY" });
    } else if (!isInView && isPlaying) {
        dispatch({ type: "PAUSE" });
        dispatch({ type: "MUTE" });
    }
};

const CldVideo = forwardRef<CldVideoProps, typeof ReactPlayer>((props, ref) => {
    const {
        wrapperProps,
        cloudinaryAsset,
        playing: _playing,
        loop: _loop,
        controls: _controls,
        volume,
        muted: _muted,
        playbackRate,
        width,
        height,
        progressInterval,
        playsinline,
        playIcon,
        previewTabIndex,
        pip: _pip,
        stopOnUnmount,
        light,
        fallback: _fallback,
        wrapper: _wrapper,
        poster,
        preload,
        onReady,
        onStart,
        onPlay,
        onPause,
        onBuffer,
        onBufferEnd,
        onEnded,
        onClickPreview,
        onEnablePIP,
        onDisablePIP,
        onError,
        onDuration,
        onSeek,
        onProgress,
        sx,
        inViewAutoplay,
        animate = false,
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

    const reactPlayerProps = {
        volume,
        playbackRate,
        width,
        height,
        progressInterval,
        playsinline,
        playIcon,
        preload,
        poster,
        previewTabIndex,
        stopOnUnmount,
        light,
        onStart,
        onPlay,
        onPause,
        onBuffer,
        onBufferEnd,
        onEnded,
        onClickPreview,
        onEnablePIP,
        onDisablePIP,
        onError,
        onDuration,
        onSeek,
        onProgress,
    };

    const wrapperRef = useRef<HTMLDivElement>(null);
    const [clientSideVideoReady, setClientSideVideoReady] = useState(false);

    const isInView = useInView(wrapperRef, { once: false });

    const {
        state: {
            isMuted,
            isPlaying,
            isShowingPiP,
            isLoop,
            isSeeking,
            playerRef,
            autoplay,
            userPaused,
        },
        dispatch,
    } = useCldVideoPlayer();

    useEffect(() => {
        if (inViewAutoplay) {
            handleInViewPlayPause(
                clientSideVideoReady,
                autoplay,
                isInView,
                isPlaying,
                userPaused,
                dispatch
            );
        }
    }, [
        isPlaying,
        dispatch,
        autoplay,
        isInView,
        clientSideVideoReady,
        isMuted,
        userPaused,
        inViewAutoplay,
    ]);

    const refs = useMergeRefs(playerRef, ref);

    const videoUrl = useCldVideoUrl({
        cloudinaryAsset,
    });

    const ssrUrl = useMemo(() => {
        return getCldVideoUrl({
            src: cloudinaryAsset![0].public_id!,
            format: "auto:video",
        });
    }, [cloudinaryAsset]);

    const posterUrl = useMemo(() => {
        return getPosterUrl(cloudinaryAsset);
    }, [cloudinaryAsset]);

    const handleOnReady = useCallback(
        (player: ReactPlayer) => {
            setClientSideVideoReady(true);
            onReady && onReady(player);
        },
        [onReady]
    );

    const handleOnProgress = useCallback(
        (state: OnProgressProps) => {
            if (!isSeeking) {
                dispatch({ type: "SET_PLAYED", payload: state });
            }
        },
        [dispatch, isSeeking]
    );

    const handleOnDuration = useCallback(
        (durationInSeconds: number) => {
            dispatch({ type: "SET_DURATION", payload: durationInSeconds });
        },
        [dispatch]
    );

    const handleOnEnded = useCallback(() => {
        if (isLoop) {
            dispatch({ type: "PLAY" });
        }
    }, [dispatch, isLoop]);

    const handleOnEnablePiP = useCallback(() => {
        if (!isShowingPiP) {
            dispatch({ type: "SHOW_PICTURE_IN_PICTURE" });
        }
    }, [dispatch, isShowingPiP]);

    const handleDisablePiP = useCallback(() => {
        if (isShowingPiP) {
            dispatch({ type: "HIDE_PICTURE_IN_PICTURE" });
        }
    }, [dispatch, isShowingPiP]);

    return (
        <chakra.div
            borderRadius="large"
            __css={{ width: "100%", height: "100%", bg: "porscheBlack" }}
            ref={wrapperRef}
            {...wrapperProps}
        >
            <MotionBox
                {...(animate && animateProps)}
                position="relative"
                width="100%"
                height="100%"
            >
                <ChakraVideo
                    suppressHydrationWarning
                    src={ssrUrl}
                    preload="auto"
                    autoPlay={false}
                    muted={true}
                    loop={true}
                    playsInline
                    poster={posterUrl}
                    visibility={clientSideVideoReady ? "hidden" : "visible"}
                    objectFit="cover"
                    position="absolute"
                    zIndex={0}
                    width="100%"
                    height="100%"
                    aria-describedby={ariaDescribedBy}
                    {...rest}
                />
                <ChakraReactPlayer
                    playing={isPlaying}
                    {...reactPlayerProps}
                    {...rest}
                    sx={{
                        "& > video": {
                            objectFit: "cover",
                            "&:fullscreen": {
                                objectFit: "contain",
                            },
                        },
                        ...sx,
                    }}
                    width="100%"
                    height="100%"
                    className="react-player"
                    controls={false}
                    url={videoUrl}
                    pip={isShowingPiP}
                    muted={isMuted}
                    playsinline={true}
                    loop={isLoop}
                    progressInterval={60}
                    onReady={handleOnReady}
                    onProgress={handleOnProgress}
                    onDuration={handleOnDuration}
                    onEnded={handleOnEnded}
                    onEnablePIP={handleOnEnablePiP}
                    onDisablePIP={handleDisablePiP}
                    ref={refs}
                />
                {aiTagElement}
            </MotionBox>
        </chakra.div>
    );
});

CldVideo.displayName = "CldVideo";

export { CldVideo };
export type { CldVideoProps };
