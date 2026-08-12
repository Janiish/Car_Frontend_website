import {
    forwardRef,
    useModalContext,
    ModalOverlay as ChakraModalOverlay,
    useModalStyles,
} from "@chakra-ui/react";
import type { ModalOverlayProps as ChakraModalOverlayProps } from "@chakra-ui/react";
import { CloseButton } from "./close-button";
import type { CloseButtonProps } from "./close-button";
import { callAllHandlers } from "@chakra-ui/utils";
import { frostedGlassStyle } from "@porsche-design-system/components-react/styles";

type ModalCloseButtonProps = CloseButtonProps;

const ModalCloseButton = forwardRef<ModalCloseButtonProps, "button">((props, ref) => {
    const { onClick, ...rest } = props;
    const { onClose } = useModalContext();

    const styles = useModalStyles();

    return (
        <CloseButton
            ref={ref}
            onClick={callAllHandlers(onClick, (event) => {
                event.stopPropagation();
                onClose();
            })}
            __css={styles.closeButton}
            {...rest}
        />
    );
});

export { ModalCloseButton };
export type { ModalCloseButtonProps };

type ModalOverlayProps = ChakraModalOverlayProps;
const ModalOverlay = (props: ModalOverlayProps) => (
    <ChakraModalOverlay backdropFilter={frostedGlassStyle.backdropFilter} {...props} />
);
export { ModalOverlay };
export type { ModalOverlayProps };

/**
 * This is a re-export of a Chakra UI component.
 * This allows us to use linting rules to manage which components are available to the consumer from Chakra UI vs. the Porsche Design System.
 */
export { Modal, ModalContent, ModalHeader, ModalFooter, ModalBody } from "@chakra-ui/react";
export type {
    ModalProps,
    ModalContentProps,
    ModalHeaderProps,
    ModalFooterProps,
    ModalBodyProps,
} from "@chakra-ui/react";
