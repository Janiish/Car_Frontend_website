import dynamic from "next/dynamic";
import { WrapperContainer } from "@/components/wrapper-container";
import type { ModuleListenToTheEngineFieldsFragment } from "./__generated/module-listen-to-the-engine.contentful.generated";
import { AspectRatio, Box, Flex, Grid, GridItem, Heading, Text } from "@project/ui";
import { gridTemplateColumns } from "@project/ui/src/theme/global-styles";
import { useRouter } from "next/router";
import { useAppStore } from "@/store/app-store";
import { PAGMSHEvents, sendPagDataToGTM } from "@/lib/google-tag-manager/events";

const LazyVideoAndLottieWrapper = dynamic(
    () => import("./video-and-lottie-wrapper").then(async (mod) => mod.VideoAndLottieWrapper),
    {
        ssr: true,
        loading: () => <Heading size="headingXXLarge">Loading Component Code...</Heading>,
    }
);

type ModuleListenToTheEngineProps = ModuleListenToTheEngineFieldsFragment & {
    moduleIndex?: number | null;
};

export const ModuleListenToTheEngine = ({
    aiGenerated,
    description,
    landscapeVideo,
    pressAndHoldForSoundButtonLabel,
    lottieJson,
    loadingText,
    moduleIndex,
    __typename,
}: ModuleListenToTheEngineProps) => {
    const { locale } = useRouter();
    const {
        state: { pageId, pageContentTags, pageType },
    } = useAppStore();

    const handleButtonClick = (buttonType: "sound" | "play") => {
        sendPagDataToGTM({
            eventAction:
                buttonType === "sound"
                    ? PAGMSHEvents.listenToTheEngineSoundButton_Click
                    : PAGMSHEvents.listenToTheEngineTooglePlayButton_Click,
            locale: locale!,
            pageExperience: {
                pageCategory: pageType,
                contentTags: pageContentTags ?? [],
            },
            context: {
                moduleName: __typename,
                modulePosition: moduleIndex,
            },
            componentClick: {
                clickElementType: "interaction",
                clickElementId: pageId,
                clickElementName: `Listen to the engine ${buttonType === "sound" ? "sound" : "toggle play"} button`,
            },
        });
    };

    return (
        <AspectRatio
            ratio={["9:16", "9:16", "16:9"]}
            bgColor="porscheBlack"
            color="white"
            maxHeight="100svh"
            width="full"
            className="ModuleListenToTheEngine"
        >
            <Box>
                {/* content */}
                <WrapperContainer position="relative" zIndex={1} inset={0}>
                    <Grid py={{ base: 8, l: 10 }} templateColumns={gridTemplateColumns}>
                        <GridItem colStart={1} colEnd={{ base: 3, l: 5 }}>
                            <Text pt={{ base: 10, md: 0 }} size="medium">
                                {description}
                            </Text>
                        </GridItem>
                    </Grid>
                </WrapperContainer>

                {/* media & animations */}
                <Flex
                    as="figure"
                    alignItems="center"
                    justifyContent="center"
                    position="absolute"
                    zIndex={0}
                    inset={0}
                    width="100%"
                    height="100%"
                >
                    <LazyVideoAndLottieWrapper
                        aiGenerated={aiGenerated}
                        landscapeVideo={landscapeVideo}
                        lottieJson={lottieJson}
                        pressAndHoldForSoundButtonLabel={pressAndHoldForSoundButtonLabel}
                        loadingText={loadingText}
                        onClick={handleButtonClick}
                    />
                </Flex>
            </Box>
        </AspectRatio>
    );
};
