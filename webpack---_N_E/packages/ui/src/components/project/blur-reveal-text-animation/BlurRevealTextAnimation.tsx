import { memo } from "react";
import { type Transition, type Variants } from "framer-motion";
import { Box, MotionBox } from "@project/ui";

export type BlurRevealVariant = "hidden" | "visible";

export type BlurRevealTextAnimationProps = {
    children: string;
    className?: string;
    delay?: number;
    stagger?: number;
    speed?: number;
    autoStart?: boolean;
    animate?: BlurRevealVariant;
    reverse?: boolean;
    onAnimationStart?: () => void;
    onAnimationComplete?: () => void;
    inView?: boolean;
    once?: boolean;
    /** When true, replaces filter:blur with scale+opacity (GPU-composited, better for mobile). */
    disableBlur?: boolean;
};

const BlurRevealTextAnimationBase = ({
    children,
    className,
    delay = 0,
    stagger = 0.03,
    speed = 0.3,
    autoStart = true,
    animate: animateProp,
    reverse = false,
    onAnimationStart,
    onAnimationComplete,
    inView = false,
    once = true,
    disableBlur = false,
}: BlurRevealTextAnimationProps) => {
    const words = children.split(" ").filter((word) => word.length > 0);

    const itemTransition: Transition = {
        type: "tween",
        ease: "easeOut",
        duration: speed,
    };

    const container: Variants = {
        hidden: {
            transition: {
                staggerChildren: stagger,
                delayChildren: reverse ? 0 : delay,
                staggerDirection: reverse ? -1 : 1,
            },
        },
        visible: {
            transition: {
                staggerChildren: stagger,
                delayChildren: reverse ? 0 : delay,
                staggerDirection: reverse ? -1 : 1,
            },
        },
    };

    const revealItem: Variants = disableBlur
        ? {
              hidden: { opacity: 0, y: 10, scale: 0.95, transition: itemTransition },
              visible: { opacity: 1, y: 0, scale: 1, transition: itemTransition },
          }
        : {
              hidden: { opacity: 0, y: 10, filter: "blur(10px)", transition: itemTransition },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: itemTransition },
          };

    const concealItem: Variants = disableBlur
        ? {
              hidden: { opacity: 1, y: 0, scale: 1, transition: itemTransition },
              visible: { opacity: 0, y: 10, scale: 0.95, transition: itemTransition },
          }
        : {
              hidden: { opacity: 1, y: 0, filter: "blur(0px)", transition: itemTransition },
              visible: { opacity: 0, y: 10, filter: "blur(10px)", transition: itemTransition },
          };

    const item = reverse ? concealItem : revealItem;

    const resolvedAnimate = (() => {
        if (animateProp !== undefined) return animateProp;
        if (inView) return undefined;
        return autoStart ? "visible" : "hidden";
    })();

    return (
        <MotionBox
            as="p"
            className={className}
            display="flex"
            flexWrap="wrap"
            variants={container}
            initial="hidden"
            whileInView={inView ? "visible" : undefined}
            animate={resolvedAnimate}
            viewport={{ once }}
            onAnimationStart={onAnimationStart}
            onAnimationComplete={onAnimationComplete}
        >
            {words.map((word, index) => (
                <MotionBox
                    as="span"
                    key={`${word}-${index}`}
                    display="inline-block"
                    variants={item}
                >
                    {word}
                    {index < words.length - 1 && (
                        <Box as="span" display="inline-block">
                            &nbsp;
                        </Box>
                    )}
                </MotionBox>
            ))}
        </MotionBox>
    );
};

export const BlurRevealTextAnimation = memo(BlurRevealTextAnimationBase);
