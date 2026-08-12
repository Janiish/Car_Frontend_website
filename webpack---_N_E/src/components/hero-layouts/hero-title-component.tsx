import { Heading, VStack } from "@project/ui";
import { type ReactNode } from "react";

type HeroTitleComponentProps = {
    title?: string | null;
    isLight?: boolean;
    overTitleComponent?: ReactNode;
    underTitleComponent?: ReactNode;
};

export const HeroTitleComponent = (props: HeroTitleComponentProps) => {
    const { title, overTitleComponent, underTitleComponent, isLight = true } = props;

    const textColor = isLight ? "porscheBlack" : "allWhite";

    return (
        <VStack align="start" spacing={2} color={textColor}>
            {overTitleComponent}
            <Heading
                as="h1"
                size="displaySmall"
                sx={{
                    textWrap: "balance",
                }}
            >
                {title}
            </Heading>
            {underTitleComponent}
        </VStack>
    );
};
