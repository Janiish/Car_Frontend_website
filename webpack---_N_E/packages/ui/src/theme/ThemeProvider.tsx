import type { ChakraProviderProps as BaseChakraProviderProps } from "@chakra-ui/react";
import { ChakraProvider as BaseChakraProvider } from "@chakra-ui/react";

export type ChakraProviderProps = BaseChakraProviderProps;

export const ThemeProvider = ({ children, theme, ...restProps }: Readonly<ChakraProviderProps>) => {
    return (
        <BaseChakraProvider theme={theme} {...restProps}>
            {children}
        </BaseChakraProvider>
    );
};
