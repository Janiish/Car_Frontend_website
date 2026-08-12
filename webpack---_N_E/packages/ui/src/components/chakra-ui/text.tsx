import { Text as ChakraText } from "@chakra-ui/react";
import type { TextProps as ChakraTextProps } from "@chakra-ui/react";

type TextProps = ChakraTextProps & {
    dateTime?: string;
};

const Text = ({ sx, ...props }: TextProps) => (
    <ChakraText sx={{ hyphens: "none", ...sx }} {...props} />
);

export { Text };
export type { TextProps };
