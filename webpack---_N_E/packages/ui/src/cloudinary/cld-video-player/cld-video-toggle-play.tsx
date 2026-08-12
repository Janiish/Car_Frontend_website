import { useCallback, type MouseEventHandler } from "react";
import { useCldVideoPlayer } from "./cld-video-context";
import { Button } from "../../components/porsche-design-system/button";
import type { ButtonProps } from "../../components/porsche-design-system/button";
import { ButtonPure } from "../../components/porsche-design-system/button-pure";

type CldVideoTogglePlayProps = Omit<ButtonProps, "aria-label"> & {
    mobile?: boolean;
};

export const useTogglePlay = () => {
    const {
        state: { userPaused, isPlaying },
        dispatch,
    } = useCldVideoPlayer();

    return useCallback<MouseEventHandler>(() => {
        dispatch({ type: isPlaying ? "PAUSE" : "PLAY" });
        dispatch({ type: userPaused ? "USER_UNPAUSED" : "USER_PAUSED" });
    }, [dispatch, isPlaying, userPaused]);
};

const CldVideoTogglePlay = (props: CldVideoTogglePlayProps) => {
    const { mobile, onClick, ...rest } = props;

    const { state } = useCldVideoPlayer();

    const togglePlay = useTogglePlay();

    const handleButtonClick: MouseEventHandler = (event) => {
        togglePlay(event);

        if (onClick) {
            onClick(event);
        }
    };

    const buttonTitle = state.isPlaying ? "pause video" : "play video";

    if (mobile) {
        return (
            <ButtonPure
                onClick={handleButtonClick}
                theme="dark"
                {...rest}
                hideLabel={true}
                icon={state.isPlaying ? "pause" : "play"}
                border="2px solid var(--colors-allWhite)"
                borderRadius="var(--radii-small)"
                size="x-large"
                aria={{
                    "aria-label": buttonTitle,
                }}
            >
                {buttonTitle}
            </ButtonPure>
        );
    }

    return (
        <Button
            onClick={handleButtonClick}
            theme="dark"
            variant="secondary"
            {...rest}
            hideLabel={true}
            icon={state.isPlaying ? "pause" : "play"}
            aria={{
                "aria-label": buttonTitle,
            }}
        >
            {buttonTitle}
        </Button>
    );
};
CldVideoTogglePlay.displayName = "CldVideoTogglePlay";

export { CldVideoTogglePlay };
