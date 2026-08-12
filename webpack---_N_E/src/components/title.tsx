import type { ReactNode } from "react";
import { Heading, type HeadingProps } from "@project/ui";

type TitleProps = HeadingProps & {
    children: ReactNode;
};

export const Title = ({ children, ...rest }: TitleProps) => (
    <Heading
        as="h2"
        size="headingXLarge"
        fontWeight="400"
        sx={{
            textWrap: "balance",
        }}
        {...rest}
    >
        {children}
    </Heading>
);
