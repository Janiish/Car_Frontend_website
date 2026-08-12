import { Box, forwardRef, VisuallyHidden, type HTMLChakraProps } from "@chakra-ui/react";
import { AiSparkIcon } from "./ai-spark-icon";
import { colors } from "../../../design-tokens";
import type { AiContentKind } from "./ai-spark-icon";

export type AiTagMode = "standard" | "image";
export type AiTagLength = "short" | "long";

export type AiTagProps = HTMLChakraProps<"span"> & {
    label: string;
    srLabel?: string;
    mode?: AiTagMode;
    length?: AiTagLength;
    filled?: boolean;
    kind?: AiContentKind;
};

const MODE_STYLES = {
    standard: {
        backgroundColor: colors.grey100,
        color: colors.porscheBlack,
    },
    image: {
        backgroundColor: colors.porscheBlackShaded,
        color: colors.allWhite,
        backdropFilter: "auto",
        backdropBlur: "frostedGlassBlur",
    },
} as const;

const LENGTH_STYLES = {
    short: {
        alignItems: "center",
        lineHeight: "ndlCaption",
        whiteSpace: "nowrap",
        maxWidth: "100%",
        overflow: "hidden",
    },
    long: {
        alignItems: "flex-start",
        lineHeight: 1.3,
        whiteSpace: "normal",
        wordBreak: "break-word",
    },
} as const;

/**
 * Presentational AI content disclosure chip (EU AI Act). Pure Chakra —
 * deliberately not PDS `PAiTag`, which bakes literal colours, exposes no
 * styling seam, and accepts no custom text.
 */
export const AiTag = forwardRef<AiTagProps, "span">((props, ref) => {
    const {
        label,
        srLabel,
        mode = "standard",
        length: lengthProp = "short",
        filled = true,
        kind,
        ...rest
    } = props;

    if (!label.trim()) return null;

    return (
        <Box
            as="span"
            ref={ref}
            display="flex"
            gap={1}
            pt={2}
            pr={2}
            pb={2}
            pl={2}
            borderRadius="small"
            fontFamily="body"
            fontWeight={400}
            fontSize="ndlDesktopCaption"
            letterSpacing="0.12px"
            {...LENGTH_STYLES[lengthProp]}
            {...MODE_STYLES[mode]}
            {...rest}
        >
            <AiSparkIcon filled={filled} kind={kind} />
            {srLabel ? (
                <>
                    <Box as="span" aria-hidden="true" flexShrink={0}>
                        {label}
                    </Box>
                    <VisuallyHidden>{srLabel}</VisuallyHidden>
                </>
            ) : (
                label
            )}
        </Box>
    );
});

AiTag.displayName = "AiTag";
