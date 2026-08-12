import type { RenderMark } from "@contentful/rich-text-react-renderer";
import { MARKS } from "@contentful/rich-text-types";

export const renderMark: RenderMark = {
    [MARKS.BOLD]: (text) => <strong>{text}</strong>,
    [MARKS.UNDERLINE]: (text) => <u>{text}</u>,
    [MARKS.ITALIC]: (text) => <i>{text}</i>,
    [MARKS.SUBSCRIPT]: (text) => <sub>{text}</sub>,
    [MARKS.SUPERSCRIPT]: (text) => <sup>{text}</sup>,
};
