import { useEffect, useRef } from "react";
// eslint-disable-next-line no-restricted-imports -- getImageProps is not re-exported by @project/ui; raw next/image is the only source for art-directed <picture> support
import { getImageProps } from "next/image";
import breakpoints from "@project/ui/src/design-tokens/09.breakpoints/breakpoints";

const GARAGE_POSTER = {
    desktop: "/homepage/garage/garage-poster.png",
    mobile: "/homepage/garage/garage-mobile-poster.png",
} as const;

type GaragePosterProps = {
    /**
     * Fired once, the first time the visible poster variant finishes
     * decoding. Informational only — this is NOT the page-loader gate (see
     * plan 014, which gates on garage video first-frame); it only improves
     * what the loader's max-wait fallback reveals onto. Not wired by this
     * plan (garage-section.tsx passes nothing); 014 wires it.
     */
    onDecoded?: () => void;
};

/**
 * SSR-correct art-directed garage poster. Replaces the JS-selected
 * `posterSrc = isDesktopL ? desktop : mobile` pattern, whose `isDesktopL`
 * server snapshot is hardcoded `false` (`homepage-responsive-context.tsx`),
 * causing every SSR paint + first hydration frame to show the MOBILE poster,
 * then flip to desktop post-hydration with a fresh, unpreloaded fetch.
 *
 * A `<picture>` with a `<source media>` art-directed via `getImageProps` lets
 * the browser pick the correct variant from static HTML, pre-hydration, with
 * zero JS and exactly one fetch. The media query below MUST stay identical to
 * the one `isDesktopL` evaluates (`use-video-sources.ts`) so the poster and
 * video tiers always agree, including on a live resize.
 */
const GaragePoster = ({ onDecoded }: GaragePosterProps) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const firedRef = useRef(false);

    const {
        props: { srcSet: desktopSrcSet },
    } = getImageProps({
        alt: "",
        fill: true,
        sizes: "100vw",
        priority: true,
        style: { objectFit: "cover", objectPosition: "center" },
        src: GARAGE_POSTER.desktop,
    });
    const { props: mobileProps } = getImageProps({
        alt: "",
        fill: true,
        sizes: "100vw",
        priority: true,
        style: { objectFit: "cover", objectPosition: "center" },
        src: GARAGE_POSTER.mobile,
    });

    useEffect(() => {
        const img = imgRef.current;
        if (!img || firedRef.current) return;

        const fire = () => {
            if (firedRef.current) return;
            firedRef.current = true;
            onDecoded?.();
        };

        if (img.complete && img.naturalWidth > 0) {
            fire();
            return;
        }
        if (typeof img.decode === "function") {
            img.decode().then(fire).catch(fire);
            return;
        }
        img.addEventListener("load", fire, { once: true });
        return () => img.removeEventListener("load", fire);
    }, [onDecoded]);

    return (
        <picture>
            <source media={`(min-width: ${breakpoints.l})`} srcSet={desktopSrcSet} sizes="100vw" />
            {/* eslint-disable-next-line jsx-a11y/alt-text -- alt="" is included in the spread mobileProps from getImageProps */}
            <img ref={imgRef} {...mobileProps} />
        </picture>
    );
};

GaragePoster.displayName = "GaragePoster";

export { GaragePoster };
