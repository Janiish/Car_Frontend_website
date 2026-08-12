import type { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";

/**
 * This is a re-export of a Chakra UI component.
 * This allows us to use linting rules to manage which components are available to the consumer from Chakra UI vs. the Porsche Design System.
 */
import { Box } from "@chakra-ui/react";
export { Box } from "@chakra-ui/react";
const MotionBox = motion(Box);
export { MotionBox };
import type { BoxProps } from "@chakra-ui/react";
export type { BoxProps };
export type MotionBoxProps = Omit<BoxProps, "transition"> & HTMLMotionProps<"div">;
