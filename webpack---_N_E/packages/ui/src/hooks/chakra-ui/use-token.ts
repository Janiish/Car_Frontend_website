import { useToken as $useToken } from "@chakra-ui/react";
import type { Dict } from "@chakra-ui/utils";
import { useTheme } from "./chakra-ui";

type StringOrNumber = string | number;

// https://github.com/chakra-ui/chakra-ui/blob/be28f5d0ba3a14d9a6b6bd9e059b922d25cdb260/packages/core/styled-system/src/create-theme-vars/theme-tokens.ts#L3
const tokens = [
    "colors",
    "borders",
    "borderWidths",
    "borderStyles",
    "fonts",
    "fontSizes",
    "fontWeights",
    "letterSpacings",
    "lineHeights",
    "radii",
    "space",
    "shadows",
    "sizes",
    "zIndices",
    "transition",
    "blur",
    "breakpoints",
];

const customGetTokenValue = <T extends StringOrNumber>(
    theme: Dict,
    scale: string,
    value: T,
    fallback: T
) => {
    if (value === null) {
        return value;
    }

    const getValue = (val: T) => theme[scale]?.[val];

    return getValue(value) ?? getValue(fallback) ?? fallback;
};

export const customGetToken = <T extends StringOrNumber | StringOrNumber[]>(
    scale: string,
    token: T,
    fallback?: T
    // eslint-disable-next-line no-unused-vars
): ((theme: Dict) => T) => {
    const _token = Array.isArray(token) ? token : [token];
    const _fallback = Array.isArray(fallback) ? fallback : [fallback];

    return (theme: Dict) => {
        const fallbackArr = _fallback.filter(Boolean) as T[];
        const result = _token.map((token, index) => {
            return customGetTokenValue(theme, scale, token, fallbackArr[index] ?? token);
        });

        return Array.isArray(token) ? result : result[0];
    };
};

export const useToken = <T extends StringOrNumber | StringOrNumber[]>(
    scale: string,
    token: T,
    fallback?: T
): T => {
    const theme = useTheme();

    if (!tokens.includes(scale)) {
        return customGetToken(scale, token, fallback)(theme);
    }

    return $useToken<StringOrNumber | StringOrNumber[]>(scale, token, fallback) as T;
};
