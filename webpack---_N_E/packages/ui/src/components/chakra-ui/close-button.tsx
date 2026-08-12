import type { ButtonProps } from "../porsche-design-system/button";
import { Button } from "../porsche-design-system/button";
import { forwardRef } from "@chakra-ui/react";

type CloseButtonProps = Omit<ButtonProps, "aria-label">;

const CloseButton = forwardRef<CloseButtonProps, "button">((props, ref) => (
    <Button
        variant="secondary"
        theme="dark"
        {...props}
        ref={ref}
        aria-label="close"
        icon="close"
        hideLabel={true}
    />
));

export type { CloseButtonProps };
export { CloseButton };
