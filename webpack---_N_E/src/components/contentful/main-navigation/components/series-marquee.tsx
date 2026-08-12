import { keyframes } from "@emotion/react";
import type { PartMainNavigationItemFragment } from "@/components/contentful/main-navigation/__generated/main-navigation.contentful.generated";
import { Box, Heading, useMediaQuery } from "@project/ui";

type SeriesMarqueeProps = {
    children: string;
    theme: PartMainNavigationItemFragment["theme"];
};

const marquee = keyframes({
    "0%": {
        transform: "translate3d(var(--move-initial), 0, 0)",
    },
    "100%": {
        transform: "translate3d(var(--move-final), 0, 0)",
    },
});

const MarqueeTextItem = ({ children }: { children: string }) => (
    <Box as="span" pr={14} transform="translate3d(0,0,0)">
        {children}
    </Box>
);

const themeMap = {
    Red: {
        color: "rgba(0, 0, 0, 0.3)",
        backgroundColor: "motorsportsRed",
    },
    White: {
        color: "motorsportsRed",
        backgroundColor: "allWhite",
    },
    Black: {
        color: "motorsportsRed",
        backgroundColor: "#000000",
    },
    FormulaE: {
        color: "rgba(0, 0, 0, 0.3)",
        backgroundColor: "formulaE",
    },
};

const SeriesMarquee = ({ children, theme = "Red" }: SeriesMarqueeProps) => {
    const themeProps = themeMap[theme as keyof typeof themeMap];

    const [prefersReducedMotion] = useMediaQuery("(prefers-reduced-motion)", {
        ssr: true,
        fallback: false,
    });
    const [canHover] = useMediaQuery("(hover:hover)", {
        ssr: true,
        fallback: false,
    });

    return (
        <Box
            {...themeProps}
            position="relative"
            overflow="hidden"
            rounded="medium"
            sx={{
                "--offset": "0rem",
                "--move-initial": "calc(-25% + var(--offset))",
                "--move-final": "calc(-50% + var(--offset))",
            }}
        >
            <Heading
                aria-hidden={true}
                as="h4"
                fontSize="110cqh"
                lineHeight="100cqh"
                fontWeight={700}
                fontStyle="italic"
                position="relative"
                width="fit-content"
                whiteSpace="nowrap"
                userSelect="none"
                cursor="pointer"
                transform="translate3d(var(--move-initial), 0, 0)"
                _groupHover={{
                    ...(!prefersReducedMotion &&
                        canHover && {
                            animation: `${marquee} clamp(1s, calc(var(--char-count) * 0.25s), 2s) linear infinite`,
                        }),
                }}
                sx={{
                    "--char-count": children.length.toString(),
                }}
            >
                <MarqueeTextItem>{children}</MarqueeTextItem>
                <MarqueeTextItem>{children}</MarqueeTextItem>
                <MarqueeTextItem>{children}</MarqueeTextItem>
                <MarqueeTextItem>{children}</MarqueeTextItem>
            </Heading>
        </Box>
    );
};

export { SeriesMarquee };
