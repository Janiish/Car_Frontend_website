import { memo, useCallback, useMemo, useRef } from "react";
import { easingCurve } from "@/components/contentful/dashboard/motion-configs";
import { MotionBox, NdlHeading } from "@project/ui";
import type { MotionBoxProps } from "@project/ui";
import { type Variants } from "framer-motion";
import { useHomepageBreakpoints, useHomepageMotionPref } from "../../homepage-responsive-context";

type GarageTitleProps = MotionBoxProps & { isDashboardOpen: boolean };

const GarageTitle = memo(({ children, isDashboardOpen, ...props }: GarageTitleProps) => {
    const { prefersReducedMotion } = useHomepageMotionPref();
    const { isDesktopMd: isDesktop } = useHomepageBreakpoints();
    const containerRef = useRef<HTMLDivElement>(null);

    // Desktop: filter:blur (original design intent).
    // Mobile: GPU-composited scale+opacity only (filter:blur forces rasterization on mobile GPUs).
    const motionVariants = useMemo<Variants>(() => {
        if (prefersReducedMotion) {
            return {
                visible: { y: 0, opacity: 1, transition: { duration: 0 } },
                hidden: { y: 0, opacity: 0, transition: { duration: 0 } },
            };
        }
        if (isDesktop) {
            return {
                visible: {
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: 1, ease: easingCurve, delay: 0.33 },
                },
                hidden: {
                    y: "50vh",
                    filter: "blur(10px)",
                    transition: { duration: 1, ease: easingCurve },
                },
            };
        }
        return {
            visible: {
                y: 0,
                opacity: 1,
                scale: 1,
                transition: { duration: 1, ease: easingCurve, delay: 0.33 },
            },
            hidden: {
                y: "50vh",
                opacity: 0,
                scale: 0.97,
                transition: { duration: 1, ease: easingCurve },
            },
        };
    }, [prefersReducedMotion, isDesktop]);

    const willChangeValue = isDesktop ? "transform, filter" : "transform, opacity";

    const handleAnimationStart = useCallback(() => {
        if (!prefersReducedMotion && containerRef.current) {
            containerRef.current.style.willChange = willChangeValue;
        }
    }, [prefersReducedMotion, willChangeValue]);

    const handleAnimationComplete = useCallback(() => {
        if (containerRef.current) {
            containerRef.current.style.willChange = "auto";
        }
    }, []);

    return (
        <MotionBox
            {...props}
            ref={containerRef}
            variants={motionVariants}
            animate={isDashboardOpen ? "hidden" : "visible"}
            onAnimationStart={handleAnimationStart}
            onAnimationComplete={handleAnimationComplete}
        >
            <NdlHeading
                size="headerXL"
                fontSize={{ base: "desktopHeadingXLarge", md: "ndlDesktopHeaderXl" }}
                color="allWhite"
                as="h1"
                whiteSpace={{ base: "normal", md: "break-spaces" }}
                sx={{
                    textWrap: "balance",
                }}
            >
                {children}
            </NdlHeading>
        </MotionBox>
    );
});

GarageTitle.displayName = "GarageTitle";

export { GarageTitle };
