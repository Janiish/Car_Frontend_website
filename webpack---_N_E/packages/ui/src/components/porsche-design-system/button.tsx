import { PButton } from "@porsche-design-system/components-react/ssr";
import type { PButtonProps } from "@porsche-design-system/components-react/ssr";
import { chakra } from "@chakra-ui/react";
import { forwardRef } from "react";
import type { HTMLChakraProps } from "@chakra-ui/react";

type ButtonProps = PButtonProps & HTMLChakraProps<"button">;

const ChakraButton = chakra(PButton);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
    const { type = "button", ...rest } = props;
    return <ChakraButton type={type} {...rest} ref={ref} />;
});

export { Button };
export type { ButtonProps };
