// eslint-disable-next-line no-restricted-imports
import type { ButtonProps } from "@chakra-ui/react";
// eslint-disable-next-line no-restricted-imports
import { chakra, forwardRef, shouldForwardProp } from "@chakra-ui/react";
import type { MotionProps } from "framer-motion";
import { motion, isValidMotionProp } from "framer-motion";

const Button = chakra(motion.button, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

type QuickLinkButtonProps = ButtonProps & MotionProps;

const QuickLinkButton = forwardRef<QuickLinkButtonProps, "button">((props, ref) => {
    return (
        <Button
            _hover={{ opacity: 0.5 }}
            transition="var(--transition-property-common), var(--transition-duration-short) var(--transition-easing-base)"
            {...props}
            ref={ref}
        />
    );
});

export { QuickLinkButton };
