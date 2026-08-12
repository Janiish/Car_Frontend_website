import { useContentfulInspectorMode } from "@contentful/live-preview/react";
import { Box } from "@project/ui";
import { useMemo } from "react";
// eslint-disable-next-line no-restricted-imports
import type { ResponsiveValue } from "@chakra-ui/react";
import type { ModuleSpacerFieldsFragment } from "@/lib/contentful/__generated/graphql.types";

export type ModuleSpacerProps = ModuleSpacerFieldsFragment;

const sizeToDesignTokenMap: Record<"small" | "large", ResponsiveValue<string>> = {
    small: { base: "10", md: "20" },
    large: { base: "20", md: "40" },
} as const;

export const ModuleSpacer = (props: ModuleSpacerProps) => {
    const {
        sys: { id },
        size,
        theme,
    } = props;

    const inspectorMode = useContentfulInspectorMode({ entryId: id });

    const height = useMemo(
        () => sizeToDesignTokenMap[(size ?? "small") as keyof typeof sizeToDesignTokenMap],
        [size]
    );

    return (
        <Box
            {...inspectorMode({ fieldId: "size" })}
            className="ModuleSpacer"
            h={height}
            backgroundColor={theme === "Dark" ? "porscheBlack" : "allWhite"}
        />
    );
};
