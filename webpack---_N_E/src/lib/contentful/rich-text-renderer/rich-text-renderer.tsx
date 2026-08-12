import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { GenericRichText } from "@/lib/contentful/rich-text-renderer/options";
import { getOptions } from "@/lib/contentful/rich-text-renderer/options";

export const richTextRenderer = (
    data: GenericRichText,
    size: "small" | "xx-small" = "small",
    context?: { isInModule?: boolean }
) => {
    const options = getOptions(data, size, context);

    try {
        return documentToReactComponents(data.json, options);
    } catch (e) {
        return (
            <>
                <pre>There was an error rendering the Rich Text:</pre>
                <pre>{JSON.stringify(e, null, 2)}</pre>
            </>
        );
    }
};
