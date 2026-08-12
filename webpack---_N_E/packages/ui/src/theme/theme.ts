import type { ChakraTheme, RecursiveObject, ThemeComponents, ThemeConfig } from "@chakra-ui/react";
import { theme as chakraDefaultTheme } from "@chakra-ui/react";
import {
    aspectRatios,
    typography,
    space,
    sizes,
    radii,
    borders,
    shadows,
    transitions,
    zIndices,
    breakpoints,
    colors,
    opacities,
    blur,
} from "../design-tokens";
import { globalStyles } from "./global-styles";
import { textTheme } from "./components/text";
import { headingTheme } from "./components/heading";
import { linkTheme } from "./components/link";
import { tableTheme } from "./components/table";
import { blockquoteTheme } from "./components/blockquote";
import { tagTheme } from "./components/tag";
import { flagTheme } from "./components/flag";
import { modalTheme } from "./components/modal";
import { sliderTheme } from "./components/slider";
import { menuTheme } from "./components/menu";
import { ndlIconTheme } from "./new-design-language-components/icon";
import { ndlButtonTheme } from "./new-design-language-components/button";
import { ndlSurfaceTheme } from "./new-design-language-components/surface";
import { ndlHeadingTheme } from "./new-design-language-components/heading";
import { ndlTextTheme } from "./new-design-language-components/text";
import { ndlToolbarTheme } from "./new-design-language-components/toolbar";
import { fluidTypographyTheme } from "./components/fluid-typography";

const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
    disableTransitionOnChange: true,
};

const direction = "ltr";

const components: ThemeComponents = {
    Text: textTheme,
    Heading: headingTheme,
    Link: linkTheme,
    List: chakraDefaultTheme.components.List,
    Table: tableTheme,
    Blockquote: blockquoteTheme,
    Tag: tagTheme,
    Flag: flagTheme,
    Modal: modalTheme,
    Slider: sliderTheme,
    Menu: menuTheme,
    FluidTypography: fluidTypographyTheme,
    // New Porsche Design Language Components
    NdlIcon: ndlIconTheme,
    NdlButton: ndlButtonTheme,
    NdlSurface: ndlSurfaceTheme,
    NdlHeading: ndlHeadingTheme,
    NdlText: ndlTextTheme,
    NdlToolbar: ndlToolbarTheme,
};

const theme: ChakraTheme & {
    aspectRatios: RecursiveObject<string>;
    opacities: RecursiveObject<string | number>;
    blur: RecursiveObject<string>;
} = {
    config,
    direction,
    layerStyles: {},
    textStyles: {},
    //
    components,
    //
    styles: globalStyles,
    //
    borders,
    breakpoints,
    colors,
    radii,
    shadows,
    space,
    sizes: {
        ...sizes,
        ...chakraDefaultTheme.sizes,
    },
    transition: transitions,
    zIndices,
    fontWeights: typography.fontWeights,
    fonts: typography.fonts,
    fontSizes: typography.fontSizes,
    lineHeights: typography.lineHeights,
    letterSpacings: typography.letterSpacings,
    // Aspect Ratios and Opacities are not part of the default Chakra theme so no need to merge
    aspectRatios,
    opacities,
    blur,
};

export { theme };
