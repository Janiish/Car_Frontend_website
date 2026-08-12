import { Box, chakra } from "@chakra-ui/react";
import type { ResponsiveValue } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { MotionBox } from "@project/ui";
import { Icon } from "../porsche-design-system/icon";
import type { IconName } from "../porsche-design-system/icon";
import { getFocusStyle } from "@porsche-design-system/components-react/styles";
import type { ButtonHTMLAttributes } from "react";

const StyledButton = chakra("button");

type NdlIconButtonProps = {
    onClick: () => void;
    icon: IconName;
    ariaLabel: string;
    ariaControlsId?: string;
    ariaExpanded?: boolean;
    backgroundColor?: string;
    hoverBackgroundColor?: string;
    backdropBlur?: string;
    borderRadius?: string;
    size?: ResponsiveValue<string | number>;
    iconTheme?: "light" | "dark";
} & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "onClick" | "aria-label" | "aria-controls" | "aria-expanded"
>;

const NdlIconButton = ({
    onClick,
    icon,
    ariaLabel,
    ariaControlsId,
    ariaExpanded,
    backgroundColor = "ndlTransparencyBlack",
    hoverBackgroundColor = "ndlTransparencyGreyHover",
    backdropBlur,
    borderRadius = "ndlRadiusXSmall",
    size = 9,
    iconTheme = "dark",
    ...rest
}: NdlIconButtonProps) => {
    return (
        <StyledButton
            type="button"
            aria-controls={ariaControlsId}
            aria-expanded={ariaExpanded}
            aria-label={ariaLabel}
            onClick={onClick}
            borderRadius={borderRadius}
            backgroundColor={backgroundColor}
            backdropFilter={backdropBlur ? "auto" : undefined}
            backdropBlur={backdropBlur}
            width={size}
            height={size}
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="none"
            outline="none"
            cursor="pointer"
            transitionProperty="background-color"
            transitionDuration="short"
            _focusVisible={{
                ...getFocusStyle(),
                borderRadius,
            }}
            _hover={{
                backgroundColor: hoverBackgroundColor,
            }}
            {...rest}
        >
            <Box
                position="relative"
                width="100%"
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <AnimatePresence initial={false}>
                    <MotionBox
                        as="span"
                        key={icon}
                        position="absolute"
                        inset={0}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <Icon name={icon} theme={iconTheme} />
                    </MotionBox>
                </AnimatePresence>
            </Box>
        </StyledButton>
    );
};

export { NdlIconButton };
export type { NdlIconButtonProps };
