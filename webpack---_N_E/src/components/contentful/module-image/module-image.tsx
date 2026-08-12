import type { ModuleImageFieldsFragment } from "@/components/contentful/module-image/__generated/module-image.contentful.generated";
import { useContentfulInspectorMode } from "@contentful/live-preview/react";
import type { CldImageProps } from "@project/ui";
import { AspectRatio, CldImage, hasCloudinaryAsset, Text, Grid, GridItem } from "@project/ui";
import type { CoreEntryProps } from "@/types/page";
import { ModuleSpacer } from "@/components/module-spacer";
import { ModuleHeader } from "@/components/module-header";
import {
    gridTemplateColumns,
    gridGap,
    rteStartColWide,
    rteEndColWide,
} from "@project/ui/src/theme/global-styles";

export type ModuleImageProps = CoreEntryProps &
    ModuleImageFieldsFragment &
    Omit<CldImageProps, "cloudinaryAsset" | "title" | "alt"> & {
        isEmbedded?: boolean;
    };

export const ModuleImage = (props: ModuleImageProps) => {
    const {
        // we don't need to forward these props
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        __typename,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        description,
        //
        asset,
        sys: { id },
        index,
        sizes,
        priority,
        title,
        alt,
        caption,
        isEmbedded,
        ...nextImageProps
    } = props;

    const inspectorMode = useContentfulInspectorMode({ entryId: id });

    const sizesAttribute = Object.hasOwn(nextImageProps, "sizes") ? sizes : ["100vw"];

    const priorityAttribute = priority || Boolean(index && index <= 5);

    return hasCloudinaryAsset(asset) ? (
        <ModuleSpacer className="ModuleImage">
            <Grid templateColumns={gridTemplateColumns} gap={gridGap}>
                <GridItem
                    colStart={{ base: 1, l: isEmbedded ? rteStartColWide : 1 }}
                    colEnd={{
                        base: 3,
                        l: isEmbedded ? rteEndColWide : 13,
                    }}
                >
                    {(title || description) && (
                        <ModuleHeader title={title} description={description} />
                    )}
                    <AspectRatio ratio="16:9">
                        <CldImage
                            {...inspectorMode({ fieldId: "assetMobileViewport" })}
                            {...nextImageProps}
                            alt={alt ?? ""}
                            cloudinaryAsset={asset}
                            sizes={sizesAttribute}
                            priority={priorityAttribute}
                        />
                    </AspectRatio>
                    {caption && (
                        <Text mt={4} size="small">
                            {caption}
                        </Text>
                    )}
                </GridItem>
            </Grid>
        </ModuleSpacer>
    ) : null;
};
