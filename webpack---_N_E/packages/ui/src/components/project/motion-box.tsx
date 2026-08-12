import { chakra, shouldForwardProp } from "@chakra-ui/react";
import type { ForwardRefComponent, HTMLMotionProps } from "framer-motion";
import { isValidMotionProp, motion } from "framer-motion";

const MotionBox = chakra<
    ForwardRefComponent<HTMLDivElement, HTMLMotionProps<"div">>,
    HTMLMotionProps<"div">
>(motion.div, {
    /**
     * Allow motion props and non-Chakra props to be forwarded.
     */
    shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

export { MotionBox };
