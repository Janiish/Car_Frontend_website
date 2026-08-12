import {
    Text,
    Box,
    hasCloudinaryAsset,
    CldImage,
    Heading,
    Link,
    mediaQueryMinWidth,
    Grid,
    GridItem,
} from "@project/ui";

import {
    type MicrocopyInputType,
    useMicrocopy,
} from "@/lib/contentful/microcopy/microcopy-context";
import type { ModuleCarTechSpecsFieldsFragment } from "@/components/contentful/module-car-tech-specs/__generated/module-car-tech-specs.contentful.generated";
import { ModuleSpacer } from "@/components/module-spacer";
import { Title } from "@/components/title";
import { LinkWrapper } from "@/components/link-wrapper";
import { PAGMSHEvents } from "@/lib/google-tag-manager/events";
import {
    gridTemplateColumns,
    gridGap,
    rteEndColDefault,
    rteStartColDefault,
} from "@project/ui/src/theme/global-styles";

type ModuleCarTechSpecsProps = ModuleCarTechSpecsFieldsFragment & {
    microcopySet: MicrocopyInputType;
    moduleIndex?: number | null;
    isEmbedded?: boolean;
};

export const ModuleCarTechSpecs = ({
    car,
    microcopySet,
    moduleIndex,
    __typename,
    isEmbedded = false,
}: ModuleCarTechSpecsProps) => {
    const { get: getMicrocopy, add: addMicrocopy } = useMicrocopy();
    addMicrocopy(microcopySet);

    const specs = [
        { name: getMicrocopy("moduleCarTechSpecs", "engine"), value: car?.engine },
        { name: getMicrocopy("moduleCarTechSpecs", "displacement"), value: car?.displacement },
        { name: getMicrocopy("moduleCarTechSpecs", "performance"), value: car?.power },
        { name: getMicrocopy("moduleCarTechSpecs", "gears"), value: car?.transmission },
        { name: getMicrocopy("moduleCarTechSpecs", "weight"), value: car?.weight },
        { name: getMicrocopy("moduleCarTechSpecs", "driveLine"), value: car?.driveline },
    ].filter(({ value }) => value);

    return (
        <ModuleSpacer className="ModuleCarTechSpecs">
            <Grid templateColumns={gridTemplateColumns} gap={gridGap}>
                <GridItem
                    colStart={{ base: 1, l: isEmbedded ? rteStartColDefault : 1 }}
                    colEnd={{
                        base: 4,
                        l: isEmbedded ? rteEndColDefault : 13,
                    }}
                >
                    <Box mb={{ base: 6, s: 14 }}>
                        <Box mb={{ base: 8, l: 10 }}>
                            <Text size="caption" color="grey300">
                                {car?.name}
                            </Text>
                            <Title>
                                {getMicrocopy("moduleCarTechSpecs", "performanceInNumbers")}
                            </Title>
                        </Box>
                        {hasCloudinaryAsset(car?.asset) && (
                            <Grid templateColumns={gridTemplateColumns} gap={gridGap}>
                                <GridItem colSpan={{ base: 4, s: 12 }}>
                                    <Box
                                        as="figure"
                                        w={{ base: "100%", s: "80%" }}
                                        mx="auto"
                                        h={{
                                            base: 200,
                                            md: 340,
                                            l: 450,
                                        }}
                                    >
                                        <CldImage
                                            cloudinaryAsset={car?.asset}
                                            sizes={["100vw"]}
                                            priority={true}
                                            _hover={{ transform: "scale(1.02)" }}
                                            transition="transform 0.30s ease"
                                            objectFit="contain"
                                            rawTransformations="c_fill,ar_16:9,e_trim:5"
                                            wrapperProps={{
                                                overflow: "visible",
                                            }}
                                        />
                                    </Box>
                                </GridItem>
                            </Grid>
                        )}
                        <Box mt={{ base: 0, s: -10 }}>
                            {specs.map(({ name, value }) => (
                                <Grid
                                    key={name}
                                    templateColumns={gridTemplateColumns}
                                    gap={gridGap}
                                    py={{ base: 4, s: 6 }}
                                    alignItems="start"
                                    borderBottomWidth={1}
                                    borderBottomColor={"grey200"}
                                >
                                    <GridItem colSpan={{ base: 12, s: 4 }}>
                                        <Heading size="medium" mb={0}>
                                            {name}
                                        </Heading>
                                    </GridItem>
                                    <GridItem colSpan={{ base: 12, s: 8 }}>
                                        <Text
                                            size="small"
                                            mb={0}
                                            textAlign={{ base: "left", s: "right" }}
                                        >
                                            {value}
                                        </Text>
                                    </GridItem>
                                </Grid>
                            ))}
                        </Box>
                    </Box>
                    {car?.factSheetPdf?.url ? (
                        <LinkWrapper
                            item={{
                                __typename: "ExternalLink",
                                sys: car.sys,
                                url: car.factSheetPdf.url,
                                label: getMicrocopy("moduleCarTechSpecs", "downloadFactSheet"),
                            }}
                            theme="light"
                            renderAs={Link}
                            renderExternalLinkAs={Link}
                            target="_blank"
                            icon="download"
                            sx={{
                                w: "var(--sizes-full)",
                                [mediaQueryMinWidth.md]: {
                                    w: "auto",
                                },
                            }}
                            moduleName={__typename}
                            modulePosition={moduleIndex}
                            eventAction={PAGMSHEvents.carTechSpecsDownloadPDF}
                        >
                            {getMicrocopy("moduleCarTechSpecs", "downloadFactSheet")}
                        </LinkWrapper>
                    ) : null}
                </GridItem>
            </Grid>
        </ModuleSpacer>
    );
};
