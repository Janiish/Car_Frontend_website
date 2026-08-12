import { useHomepageBreakpoints } from "../homepage-responsive-context";
import type { VideoSourceSet } from "../configs/video-sources.config";

type VideoSourceConfig = { desktop: VideoSourceSet; mobile: VideoSourceSet };

function useVideoSources(config: VideoSourceConfig): VideoSourceSet {
    const { isDesktopL } = useHomepageBreakpoints();
    return isDesktopL ? config.desktop : config.mobile;
}

export { useVideoSources };
