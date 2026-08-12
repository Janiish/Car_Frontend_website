import type { RefObject, ReactNode } from "react";
import { useEffect, createRef, createContext, useContext, useReducer, useMemo } from "react";
import type ReactPlayer from "react-player";
import { usePrefersReducedMotion } from "../../hooks/chakra-ui/chakra-ui";

type OnProgressProps = {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
};

type SetPlayedAction = { type: "SET_PLAYED"; payload: OnProgressProps };
type SetDurationAction = { type: "SET_DURATION"; payload: number };
type SetIsSeekingAction = { type: "SET_IS_SEEKING"; payload: boolean };

type Action =
    | { type: "PLAY" }
    | { type: "PAUSE" }
    | { type: "MUTE" }
    | { type: "UNMUTE" }
    | { type: "SHOW_PICTURE_IN_PICTURE" }
    | { type: "HIDE_PICTURE_IN_PICTURE" }
    | { type: "SHOW_FULLSCREEN" }
    | { type: "HIDE_FULLSCREEN" }
    | { type: "USER_PAUSED" }
    | { type: "USER_UNPAUSED" }
    | SetPlayedAction
    | SetDurationAction
    | SetIsSeekingAction;

export type Dispatch = (action: Action) => void;

type CldVideoProviderProps = {
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
    children: ReactNode;
};

type CldVideoPlayerState = {
    played: OnProgressProps;
    duration: number;
    isLoop: boolean;
    isMuted: boolean;
    isPlaying: boolean;
    isSeeking: boolean;
    isShowingPiP: boolean;
    isShowingFullscreen: boolean;
    playerRef: RefObject<ReactPlayer> | null;
    autoplay?: boolean;
    userPaused?: boolean;
};

const CldVideoPlayerContext = createContext<
    { state: CldVideoPlayerState; dispatch: Dispatch } | undefined
>(undefined);

const cldPlayerReducer = (state: CldVideoPlayerState, action: Action): CldVideoPlayerState => {
    switch (action.type) {
        case "PLAY":
            return { ...state, isPlaying: true };
        case "PAUSE":
            return { ...state, isPlaying: false };
        case "USER_PAUSED":
            return { ...state, userPaused: true };
        case "USER_UNPAUSED":
            return { ...state, userPaused: false };
        case "MUTE":
            return { ...state, isMuted: true };
        case "UNMUTE":
            return { ...state, isMuted: false };
        case "SHOW_PICTURE_IN_PICTURE":
            return { ...state, isShowingPiP: true };
        case "HIDE_PICTURE_IN_PICTURE":
            return { ...state, isShowingPiP: false };
        case "SET_PLAYED":
            return { ...state, played: action.payload };
        case "SET_DURATION":
            return { ...state, duration: action.payload };
        case "SET_IS_SEEKING":
            return { ...state, isSeeking: action.payload };
        default:
            return state;
    }
};

const defaultState: CldVideoPlayerState = {
    isPlaying: true,
    isMuted: true,
    isLoop: true,
    playerRef: null,
    duration: 0,
    played: { played: 0, playedSeconds: 0, loaded: 0, loadedSeconds: 0 },
    isSeeking: false,
    isShowingFullscreen: false,
    isShowingPiP: false,
    autoplay: false,
    userPaused: false,
};

const isDefined = (value: unknown) => typeof value !== "undefined" && value !== null;

const determineIfShouldAutoplay = ({
    prefersReducedMotion,
    autoplay,
}: {
    prefersReducedMotion: boolean;
    autoplay?: boolean;
}) => {
    if (isDefined(autoplay) && !prefersReducedMotion) {
        return Boolean(autoplay);
    }

    return !prefersReducedMotion;
};

const CldVideoPlayerProvider = ({ children, loop, muted, autoplay }: CldVideoProviderProps) => {
    const prefersReducedMotion = usePrefersReducedMotion({ ssr: true, fallback: true });

    const playerRef = createRef<ReactPlayer>();

    const [state, dispatch] = useReducer(cldPlayerReducer, {
        ...defaultState,
        isPlaying: determineIfShouldAutoplay({ prefersReducedMotion, autoplay }),
        ...(isDefined(muted) && { isMuted: muted }),
        ...(isDefined(loop) && { isLoop: loop }),
        ...(isDefined(autoplay) && { autoplay }),
        playerRef,
    });

    useEffect(() => {
        if (determineIfShouldAutoplay({ prefersReducedMotion, autoplay }) && !state.isPlaying) {
            dispatch({ type: "PLAY" });
        }
        // dont re-dispatch ever
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prefersReducedMotion]);

    const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return (
        <CldVideoPlayerContext.Provider value={contextValue}>
            {children}
        </CldVideoPlayerContext.Provider>
    );
};
CldVideoPlayerProvider.displayName = "CldVideoPlayerProvider";

const useCldVideoPlayer = () => {
    const context = useContext(CldVideoPlayerContext);

    if (!context) {
        throw new Error("useCldVideoPlayer must be used within CldVideoPlayerProvider");
    }

    return context;
};

export { CldVideoPlayerProvider, useCldVideoPlayer };
export type { CldVideoPlayerState, OnProgressProps };
