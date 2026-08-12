import type React from "react";
import { useRef, useEffect } from "react";
import { useScroll, useTransform } from "framer-motion";

export function useCarScrollProgress(
    containerRef: React.RefObject<HTMLDivElement | null>,
    wrapperRef: React.RefObject<HTMLDivElement | null>
) {
    const { scrollYProgress: fullContainerProgress } = useScroll({
        target: containerRef as React.RefObject<HTMLElement>,
        offset: ["start start", "end start"],
    });

    const boundaryRef = useRef(0.85);
    useEffect(() => {
        const update = () => {
            const el = containerRef.current;
            if (!el) return;
            boundaryRef.current = Math.max(0.01, 1 - window.innerHeight / el.offsetHeight);
        };
        update();
        window.addEventListener("resize", update, { passive: true });
        return () => window.removeEventListener("resize", update);
    }, [containerRef]);

    const scrollYProgress = useTransform(fullContainerProgress, (v) =>
        Math.min(v / boundaryRef.current, 1)
    );

    const exitProgress = useTransform(fullContainerProgress, (v) => {
        const b = boundaryRef.current;
        return Math.max(0, (v - b) / (1 - b));
    });

    const { scrollYProgress: entryProgress } = useScroll({
        target: wrapperRef as React.RefObject<HTMLElement>,
        offset: ["start end", "start start"],
    });

    return { scrollYProgress, exitProgress, entryProgress };
}
