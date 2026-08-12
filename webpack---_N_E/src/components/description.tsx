import type { TextProps } from "@project/ui";
import type { ReactNode } from "react";
import { Text } from "@project/ui";

type DescriptionProps = TextProps & {
    children: ReactNode;
};

export const Description = ({ children, ...rest }: DescriptionProps) => (
    <Text
        size="textMedium"
        fontWeight="400"
        mt={2}
        sx={{
            textWrap: "balance",
        }}
        {...rest}
    >
        {children}
    </Text>
);
