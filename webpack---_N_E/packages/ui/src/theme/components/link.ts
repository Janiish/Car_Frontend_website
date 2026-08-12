import type { ComponentStyleConfig } from "@chakra-ui/react";
import { themeLightPrimary } from "@porsche-design-system/components-react/styles";

const linkTheme: ComponentStyleConfig = {
    baseStyle: {
        color: themeLightPrimary,
    },
    defaultProps: {},
};

export { linkTheme };
