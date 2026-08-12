import { useEffect, useMemo, useState } from "react";

type UseTwitchEmbedUrlOptions = {
    autoplay?: boolean;
    muted?: boolean;
};

export const useTwitchEmbedUrl = (
    embedId: string,
    type: "channel" | "video" | "collection" = "channel",
    options: UseTwitchEmbedUrlOptions = {
        autoplay: true,
        muted: true,
    }
): string => {
    // We can't set the hostname on the server side, so we need to use the client side
    const [hostname, setHostname] = useState<string | null>(null);
    useEffect(() => {
        setHostname(window.location.hostname);
    }, []);

    const autoplay = useMemo(() => {
        if (options.autoplay === true) {
            return "true";
        }
        return "false";
    }, [options.autoplay]);

    const muted = useMemo(() => {
        if (options.muted === true) {
            return "true";
        }
        return "false";
    }, [options.muted]);

    return useMemo(() => {
        return `https://player.twitch.tv/?${type}=${embedId}&parent=${hostname}&muted=${muted}&autoplay=${autoplay}`;
    }, [autoplay, embedId, hostname, muted, type]);
};
