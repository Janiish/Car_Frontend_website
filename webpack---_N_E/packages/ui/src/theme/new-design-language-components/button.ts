import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const getNdlColorSchemeProps = (colorScheme: string) => {
    switch (colorScheme) {
        case "transparent":
            return {
                color: "allWhite",
                backgroundColor: "transparent",
                _hover: {
                    backgroundColor: "ndlTransparencyGrey",
                },
                _groupHover: {
                    backgroundColor: "ndlTransparencyGrey",
                },
                _disabled: {
                    opacity: 0.5,
                    _hover: {
                        backgroundColor: "transparent",
                    },
                },
            };
        case "grey":
            return {
                color: "allWhite",
                backgroundColor: "ndlTransparencyBlack",
                backdropFilter: "auto",
                backdropBlur: "ndlFrostedGlassHigh",
                _hover: {
                    backgroundColor: "ndlTransparencyGreyHover",
                },
                _groupHover: {
                    backgroundColor: "ndlTransparencyGreyHover",
                },
                _disabled: {
                    opacity: 0.5,
                    _hover: {
                        backgroundColor: "ndlTransparencyGreyHover",
                    },
                },
            };
        case "solidGrey":
            return {
                color: "allWhite",
                backgroundColor: "ndlTransparencyGrey",
                backdropFilter: "auto",
                backdropBlur: "ndlFrostedGlassHigh",
                _hover: {
                    backgroundColor: "ndlTransparencyGreyHover",
                },
                _groupHover: {
                    backgroundColor: "ndlTransparencyGreyHover",
                },
                _disabled: {
                    opacity: 0.5,
                    _hover: {
                        backgroundColor: "ndlTransparencyGrey",
                    },
                },
            };
        case "white":
            return {
                color: "porscheBlack",
                backgroundColor: "allWhite",
                _disabled: {
                    opacity: 0.5,
                    _hover: {
                        backgroundColor: "allWhite",
                    },
                },
            };
        case "motorsportsRed":
            return {
                color: "allWhite",
                backgroundColor: "motorsportsRed",
                _disabled: {
                    opacity: 0.5,
                    _hover: {
                        backgroundColor: "motorsportsRed",
                    },
                },
            };
    }
};

const baseStyle = defineStyle((props) => {
    const { colorScheme } = props;

    const colorSchemeProps = getNdlColorSchemeProps(colorScheme);

    return {
        ...colorSchemeProps,
        transitionProperty: "all",
        transitionDuration: "short",
        borderRadius: "ndlRadiusXSmall",
        lineHeight: 1,
        fontSize: {
            base: "mobileTextXSmall",
            l: "desktopTextSmall",
        },
        _focusVisible: {
            outline: "2px solid #1A44EA",
            outlineOffset: "0px",
            "&:not(:focus-visible)": {
                outlineColor: "transparent",
            },
        },
    };
});

const variantNumber = defineStyle({
    fontSize: {
        base: "desktopTextSmall",
    },
});

const variantIcon = defineStyle({});

const variantText = defineStyle({});

const sizeLarge = defineStyle((props) => {
    const { variant } = props;

    const width = variant === "text" ? "auto" : 12;

    const height =
        variant === "text"
            ? {
                  base: 14,
                  l: 12,
              }
            : 12;

    const px =
        variant === "text"
            ? {
                  base: 4,
                  l: 5,
              }
            : 3;
    const py =
        variant === "text"
            ? {
                  base: 5,
                  l: 4,
              }
            : 3;

    const fontSize =
        variant === "text"
            ? {
                  base: "mobileHeadingSmall",
                  l: "mobileHeadingSmall",
              }
            : {
                  base: "mobileTextXSmall",
                  l: "desktopTextSmall",
              };

    return {
        width,
        height,
        px,
        py,
        fontSize,
    };
});

const sizeSmall = defineStyle((props) => {
    const { variant } = props;

    const width = variant === "text" ? "auto" : 8;

    const height =
        variant === "text"
            ? {
                  base: 10,
                  l: 8,
              }
            : 8;

    const px =
        variant === "text"
            ? {
                  base: 3,
                  l: 4,
              }
            : 1;
    const py =
        variant === "text"
            ? {
                  base: 1,
                  l: 2,
              }
            : 1;

    const fontSize =
        variant === "text"
            ? {
                  base: "mobileHeadingSmall",
                  l: "mobileHeadingSmall",
              }
            : {
                  base: "mobileTextXSmall",
                  l: "desktopTextSmall",
              };

    return {
        width,
        height,
        px,
        py,
        fontSize,
    };
});

const sizeXSmall = defineStyle((props) => {
    const { variant } = props;

    const width = variant === "text" ? "auto" : 7;

    const height = variant === "text" ? "auto" : 7;

    const px =
        variant === "text"
            ? {
                  base: 2,
                  l: 3,
              }
            : 1;
    const py =
        variant === "text"
            ? {
                  base: 0.5,
                  l: 1,
              }
            : 0.5;

    const fontSize =
        variant === "text"
            ? {
                  base: "mobileHeadingSmall",
                  l: "mobileHeadingSmall",
              }
            : {
                  base: "mobileTextXSmall",
                  l: "desktopTextSmall",
              };

    return {
        width,
        height,
        px,
        py,
        fontSize,
    };
});

const ndlButtonTheme = defineStyleConfig({
    baseStyle,
    variants: {
        number: variantNumber,
        icon: variantIcon,
        text: variantText,
    },
    sizes: { large: sizeLarge, small: sizeSmall, xSmall: sizeXSmall },
    defaultProps: {
        variant: "icon",
        size: "large",
    },
});

export { ndlButtonTheme };
