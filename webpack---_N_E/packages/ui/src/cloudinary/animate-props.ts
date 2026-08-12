import type { HTMLMotionProps } from "framer-motion";

const animateProps: HTMLMotionProps<"div"> = {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.2 },
    variants: {
        hidden: { scale: 1.2 },
        visible: {
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0, 0.61, 0.37, 1],
                delay: 0.2,
            },
        },
    },
};

export { animateProps };
