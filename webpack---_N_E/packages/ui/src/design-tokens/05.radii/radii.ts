import {
    borderRadiusLarge,
    borderRadiusMedium,
    borderRadiusSmall,
} from "@porsche-design-system/components-react/styles";

const radii = {
    ndlxlarge: "32px",
    large: borderRadiusLarge,
    medium: borderRadiusMedium,
    small: borderRadiusSmall,
    full: "9999px",
    // Porsche Design Language Radii
    ndlRadiusXXLarge: "48px",
    ndlRadiusXLarge: "32px",
    ndlRadiusLarge: "24px",
    ndlRadiusMedium: "16px",
    ndlRadiusSmall: "8px",
    ndlRadiusXSmall: "6px",
    // Semantic radii (Figma card / slide specs — values sit between the numeric scale steps)
    ndlRadiusCard: "12px",
    ndlRadiusSlide: "14px",
};

export default radii;
