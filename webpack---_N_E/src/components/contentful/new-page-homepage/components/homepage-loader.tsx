import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { RemoveScroll } from "react-remove-scroll";
import { MotionBox } from "@project/ui";
import type { NewPageHomepagePageData } from "@/components/contentful/new-page-homepage/new-page-homepage-page-data";
import { useLenisContext } from "../lenis-provider";
import { useHomepageBreakpoints, useHomepageMotionPref } from "../homepage-responsive-context";
import {
    LOADER_LOTTIE_SIZE,
    LOADER_LOTTIE_SPEED,
    LOADER_MIN_VISIBLE_MS,
    LOADER_MAX_WAIT_MS,
    LOADER_EXIT_MS,
    LOADER_LOTTIE_PRE_EXIT_MS,
} from "../configs/loader-tokens";
import { easeOutStrong, easeDecelerate } from "../configs/motion-tokens";
import { selectTabSources } from "../sections/cars/cars-config";
import { warmVideoCacheAsync } from "@/lib/video/warm-video-cache";
import { useScrubEngine } from "../components/scrub-player/use-scrub-engine";
import { LoaderLottie } from "./loader-lottie";

type HomepageLoaderProps = {
    /** True once the garage hero's FSV is fully decoded (loadMode="full"). */
    heroReady: boolean;
    /** True once the initial car's FSV is fully decoded (loadMode="full") in the cars section. */
    initialCarReady: boolean;
    /** Called once the exit animation (or reduced-motion fade) fully completes and the loader unmounts. */
    onDone: () => void;
    /** Used to resolve and cache-warm the initially-selected car's video while the CarsSection chunk loads. */
    carsSectionCarsCollection?: NewPageHomepagePageData["carsSectionCarsCollection"];
};

/**
 * Full-viewport, SSR-rendered-open page-intro loader. Plays on every mount
 * (i.e. every navigation to `/` — this is a Pages Router page, no
 * app-router/taxi.js transition framework involved).
 *
 * Reveal gate (NO skip affordance — loops until one of these resolves):
 *   revealed = capElapsed
 *     || (heroReady && initialCarReady && elapsed >= LOADER_MIN_VISIBLE_MS)
 */
const HomepageLoader = ({
    heroReady,
    initialCarReady,
    onDone,
    carsSectionCarsCollection,
}: HomepageLoaderProps) => {
    const { prefersReducedMotion } = useHomepageMotionPref();
    const { isDesktopL } = useHomepageBreakpoints();
    const { lenisRef } = useLenisContext();
    const engine = useScrubEngine();

    const [visible, setVisible] = useState(true);
    const [minElapsed, setMinElapsed] = useState(false);
    const [capElapsed, setCapElapsed] = useState(false);

    useEffect(() => {
        lenisRef.current?.lenis?.stop();
    }, [lenisRef]);

    useEffect(() => {
        if (!visible) {
            lenisRef.current?.lenis?.start();
        }
    }, [visible, lenisRef]);

    useEffect(() => {
        if (prefersReducedMotion) setVisible(false);
    }, [prefersReducedMotion]);

    useEffect(() => {
        const minTimer = setTimeout(() => setMinElapsed(true), LOADER_MIN_VISIBLE_MS);
        const maxTimer = setTimeout(() => setCapElapsed(true), LOADER_MAX_WAIT_MS);
        return () => {
            clearTimeout(minTimer);
            clearTimeout(maxTimer);
        };
    }, []);

    // Cache-warm the initially-selected car's video while the CarsSection
    // chunk is still loading — uses the shared dedupe set so
    // cars-section.tsx's own later warmVideoCache call is a no-op.
    //
    // Warm the file the *active engine* will actually play: the <video>
    // fallback backend uses the .mp4, every fsv backend the .fsv. Warming the
    // wrong one leaves the file that gets scrubbed cold (the exact cause of the
    // slow Safari/fallback scrub). Wait for engine detection so we never guess.
    useEffect(() => {
        if (engine === null) return;
        const carsItems = (carsSectionCarsCollection?.items ?? []).filter(
            (car): car is NonNullable<typeof car> => car != null
        );
        const initialCar = carsItems[0];
        if (!initialCar) return;
        const [source] = selectTabSources([initialCar], isDesktopL);
        const url = engine === "video" ? source?.mp4 : (source?.fsv ?? source?.mp4);
        if (!url) return;
        const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
            .connection;
        if (connection?.saveData) return;
        warmVideoCacheAsync(url);
    }, [carsSectionCarsCollection, isDesktopL, engine]);

    useEffect(() => {
        if (!visible) return;
        const ready = (capElapsed && heroReady) || (heroReady && initialCarReady && minElapsed);
        if (ready) setVisible(false);
    }, [visible, capElapsed, heroReady, initialCarReady, minElapsed]);

    const showLottie = !prefersReducedMotion;

    return (
        <>
            <noscript>
                <style>{`#homepage-loader{display:none}`}</style>
            </noscript>
            <RemoveScroll enabled={visible}>
                <AnimatePresence onExitComplete={onDone}>
                    {visible && (
                        <MotionBox
                            id="homepage-loader"
                            role="status"
                            aria-label="Loading"
                            data-lenis-prevent
                            position="fixed"
                            inset={0}
                            zIndex={2200}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            bg="porscheBlack"
                            initial={false}
                            style={
                                prefersReducedMotion ? undefined : { clipPath: "inset(0 0 0% 0)" }
                            }
                            exit={
                                prefersReducedMotion
                                    ? {
                                          opacity: 0,
                                          transition: { duration: 0.3, ease: easeDecelerate },
                                      }
                                    : {
                                          clipPath: "inset(0 0 100% 0)",
                                          transition: {
                                              duration: LOADER_EXIT_MS / 1000,
                                              ease: easeOutStrong,
                                              delay: (LOADER_LOTTIE_PRE_EXIT_MS - 100) / 1000,
                                          },
                                      }
                            }
                        >
                            {showLottie && (
                                <MotionBox
                                    // Opacity-only exit (no `scale`): a transform target
                                    // makes framer-motion promote this wrapper to a
                                    // `will-change: transform` layer, and Chrome renders
                                    // SVGs on such layers from a rasterised texture
                                    // (aliased edges) instead of as live vectors. Fading
                                    // alone keeps the lottie crisp through the exit.
                                    exit={{
                                        opacity: 0,
                                        transition: {
                                            duration: LOADER_LOTTIE_PRE_EXIT_MS / 1000,
                                            ease: easeDecelerate,
                                        },
                                    }}
                                >
                                    <LoaderLottie
                                        size={LOADER_LOTTIE_SIZE}
                                        speed={LOADER_LOTTIE_SPEED}
                                    />
                                </MotionBox>
                            )}
                        </MotionBox>
                    )}
                </AnimatePresence>
            </RemoveScroll>
        </>
    );
};

HomepageLoader.displayName = "HomepageLoader";

export { HomepageLoader };
