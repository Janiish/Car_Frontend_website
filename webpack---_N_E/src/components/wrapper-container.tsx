import type { BoxProps } from "@project/ui";
import { Box } from "@project/ui";
import type { ReactNode } from "react";

type WrapperContainerProps = BoxProps & {
    isSplitLayout?: boolean;
    children: ReactNode;
};

export const WrapperContainer = ({
    isSplitLayout = false,
    children,
    ...rest
}: WrapperContainerProps) => {
    return (
        <Box
            className="wrapper-container"
            maxWidth={{
                base: "wrapperContainer",
                l: isSplitLayout ? "halfWrapperContainer" : "wrapperContainer",
            }}
            margin={{ base: "auto", l: isSplitLayout ? "unset" : "auto" }}
            float={{ base: "none", l: isSplitLayout ? "right" : "none" }}
            px={{ base: 5, md: 10 }}
            width="full"
            {...rest}
        >
            {children}
        </Box>
    );
};
