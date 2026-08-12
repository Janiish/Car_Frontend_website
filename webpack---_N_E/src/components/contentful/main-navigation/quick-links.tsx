import type { MotionBoxProps } from "@project/ui";
import { Box, MotionBox } from "@project/ui";

type QuickLinksProps = MotionBoxProps;

const QuickLinks = ({ children, ...props }: QuickLinksProps) => (
    <MotionBox
        className="quick-links"
        key="quick-links"
        display="flex"
        height="navQuickLinksHeight"
        position="relative"
        willChange="width"
        mx="auto"
        zIndex={2}
        minWidth={{ base: "100%", l: "auto" }}
        px={6}
        {...props}
    >
        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={{ base: 0, l: 6 }}
            flex={1}
        >
            {children}
        </Box>
    </MotionBox>
);

export { QuickLinks };
