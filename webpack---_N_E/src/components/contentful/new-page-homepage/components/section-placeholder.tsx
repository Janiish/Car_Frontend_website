import { Box } from "@project/ui";

type SectionPlaceholderProps = {
    id: string;
    height: string;
    mt?: string;
};

export const SectionPlaceholder = ({ id, height, mt }: SectionPlaceholderProps) => (
    <Box id={id} position="relative" height={height} marginTop={mt} aria-hidden="true" />
);

SectionPlaceholder.displayName = "SectionPlaceholder";
