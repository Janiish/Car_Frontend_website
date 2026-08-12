import { PButtonPure } from "@porsche-design-system/components-react/ssr";
import type { PButtonPureProps } from "@porsche-design-system/components-react/ssr";
import { chakra } from "@chakra-ui/react";
import type { HTMLChakraProps } from "@chakra-ui/react";
import { forwardRef } from "react";

type ButtonPureProps = PButtonPureProps & HTMLChakraProps<"button">;

const ChakraButtonPure = chakra<typeof PButtonPure, ButtonPureProps>(PButtonPure);

const ButtonPure = forwardRef<HTMLButtonElement, ButtonPureProps>(function ButtonPure(props, ref) {
    const { type = "button", ...rest } = props;
    return <ChakraButtonPure type={type} {...rest} ref={ref} />;
});

export { ButtonPure };
export type { ButtonPureProps };
