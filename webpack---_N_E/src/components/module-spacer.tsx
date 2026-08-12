import React, { forwardRef } from "react";
import { Box, type BoxProps } from "@project/ui";
import { WrapperContainer } from "./wrapper-container";

type ModuleSpaceProps = BoxProps & {
    wrapperProps?: BoxProps;
};

export const ModuleSpacer = forwardRef<HTMLDivElement, ModuleSpaceProps>(
    ({ children, wrapperProps, ...props }, ref) => {
        return (
            <Box py={{ base: 10, s: 20 }} {...props} ref={ref} className="module-spacer">
                <WrapperContainer {...wrapperProps}>{children}</WrapperContainer>
            </Box>
        );
    }
);

ModuleSpacer.displayName = "ModuleSpacer";
