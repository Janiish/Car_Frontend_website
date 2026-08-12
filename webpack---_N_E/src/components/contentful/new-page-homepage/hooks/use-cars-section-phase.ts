import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { useTransform, type MotionValue } from "framer-motion";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export type CarsSectionPhase = "entry" | "fixed" | "hidden";

export function useCarsSectionPhase(
    containerRef: RefObject<HTMLDivElement | null>,
    wrapperRef: RefObject<HTMLDivElement | null>,
    scrollYProgress: MotionValue<number>,
    entryProgress: MotionValue<number>,
    exitProgress: MotionValue<number>
) {
    const [phase, setPhase] = useState<CarsSectionPhase>("entry");
    const phaseRef = useRef(phase);
    phaseRef.current = phase;
    const scrollProgressRef = useRef(0);

    useIsomorphicLayoutEffect(() => {
        const wrapper = wrapperRef.current;
        const container = containerRef.current;
        if (!wrapper || !container) return;

        const scrollY = window.scrollY;
        const vpH = window.innerHeight;
        const wrapperTop = wrapper.getBoundingClientRect().top + scrollY;
        const containerBottom =
            container.getBoundingClientRect().top + scrollY + container.offsetHeight;

        const entry = Math.min(Math.max((scrollY - wrapperTop + vpH) / vpH, 0), 1);
        const exit = Math.min(Math.max((scrollY - containerBottom + vpH) / vpH, 0), 1);

        if (entry >= 0.99 && exit >= 0.99) {
            setPhase("hidden");
        } else if (entry >= 0.99) {
            setPhase("fixed");
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(
        () =>
            entryProgress.on("change", (latest) => {
                if (latest < 0.99 && phaseRef.current !== "entry") {
                    setPhase("entry");
                } else if (latest >= 0.99 && phaseRef.current === "entry") {
                    setPhase("fixed");
                }
            }),
        [entryProgress]
    );

    useEffect(
        () =>
            exitProgress.on("change", (latest) => {
                if (latest >= 0.99 && phaseRef.current === "fixed") {
                    setPhase("hidden");
                } else if (latest < 0.99 && phaseRef.current === "hidden") {
                    setPhase(entryProgress.get() >= 0.99 ? "fixed" : "entry");
                }
            }),
        [exitProgress, entryProgress]
    );

    useEffect(
        () =>
            scrollYProgress.on("change", (latest) => {
                scrollProgressRef.current = latest;
            }),
        [scrollYProgress]
    );

    const parallaxY = useTransform(entryProgress, [0, 1], ["50vh", "0vh"]);

    return {
        parallaxY,
        isFixed: phase === "fixed",
        isVisible: phase !== "hidden",
    };
}
