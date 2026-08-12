import type { HTMLChakraProps } from "@chakra-ui/react";
import { chakra } from "@chakra-ui/react";

type RedDotProps = HTMLChakraProps<"span">;

const RedDot = (props: RedDotProps) => (
    <chakra.span
        __css={{
            w: 2.5,
            h: 2.5,
            bg: "motorsportsRed",
            borderRadius: "999px",
            display: "inline-flex",
        }}
        {...props}
    />
);

export { RedDot };
export type { RedDotProps };
