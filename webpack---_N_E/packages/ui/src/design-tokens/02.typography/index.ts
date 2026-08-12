import fontFamilies from "./fontFamilies";
import fontSizes from "./fontSizes";
import fontWeights from "./fontWeights";
import lineHeights from "./lineHeights";
import letterSpacings from "./letterSpacings";

const fallbackFonts = `'Arial Narrow', Arial, 'Heiti SC', SimHei, sans-serif`;

const typography = {
    fontWeights,
    lineHeights,
    letterSpacings,
    // Build up font-stacks from font-family tokens
    fonts: {
        body: `${fontFamilies.body}, ${fallbackFonts}`,
        heading: `${fontFamilies.heading}, ${fallbackFonts}`,
    },
    fontSizes,
};

export default typography;

export { fontFamilies, fontWeights, lineHeights, letterSpacings, fontSizes };
