import { useSwiper } from "swiper/react";
import type { SwiperClass } from "swiper/react";
import { useMemo } from "react";
import { MotionBox, Flex, Box, type FlexProps } from "@project/ui";
import type { MotionStyle } from "framer-motion";
import type { MouseEvent } from "react";
import {
    motionDurationModerate,
    motionEasingBase,
} from "@porsche-design-system/components-react/styles";
import { CarouselNavigationButton } from "./CarouselNavigationButton";

const ACTIVE_WIDTH = 18;
const DOT_SIZE = 6;
const DOT_GAP = 8;
const SLOT_SIZE = DOT_SIZE + DOT_GAP;
const DOT_TRANSITION = `width ${motionDurationModerate} ${motionEasingBase}, background-color ${motionDurationModerate} ${motionEasingBase}, opacity ${motionDurationModerate} ${motionEasingBase}, transform ${motionDurationModerate} ${motionEasingBase}`;
const TRACK_TRANSITION = `transform ${motionDurationModerate} ${motionEasingBase}`;
const REDUCED_MOTION_QUERY = "@media (prefers-reduced-motion: reduce)";

type NdlCarouselPaginationProps = FlexProps & {
    activeSlideIndex: number;
    swiper?: SwiperClass | null;
    slideCount?: number;
    theme?: "light" | "dark";
    /** Applied to the root; use for scale, opacity, filter (e.g. blur) entrance animation */
    motionStyle?: MotionStyle;
    /** Visual variant: "bare" (default) = no bg, "contained" = ndlBlack pill bg */
    variant?: "bare" | "contained";
    /** Max visible dots before windowing kicks in */
    maxVisible?: number;
    /** Whether to show prev/next arrow buttons (default: true) */
    showArrows?: boolean;
    /** Whether the active dot is filling (autoplay mode) */
    filling?: boolean;
    /** Duration of the fill animation in ms */
    fillDuration?: number;
    /**
     * Fired alongside the internal prev/next/dot swiper handlers. Presentation-only:
     * the component performs no tracking itself — the parent decides what to do
     * (e.g. dispatch analytics). `index` is the target dot index for "pagination".
     */
    onNavigate?: (type: "prev" | "next" | "pagination", index?: number) => void;
};

function computeDotWindow(count: number, active: number, maxVisible: number | undefined) {
    if (maxVisible == null || count <= maxVisible) {
        return { transformValue: "none", containerWidth: undefined };
    }

    const half = Math.floor(maxVisible / 2);
    const windowStart = Math.max(0, Math.min(active - half, count - maxVisible));
    const offset = windowStart * SLOT_SIZE;
    const transformValue = `translateX(-${offset}px)`;

    const containerWidth = (maxVisible - 1) * DOT_SIZE + ACTIVE_WIDTH + (maxVisible - 1) * DOT_GAP;

    return { transformValue, containerWidth };
}

const NdlCarouselPagination = ({
    activeSlideIndex,
    onClick,
    swiper: swiperProp,
    slideCount: slideCountProp,
    motionStyle,
    theme = "light",
    variant = "bare",
    maxVisible,
    showArrows = true,
    filling,
    fillDuration,
    onNavigate,
    ...rest
}: NdlCarouselPaginationProps) => {
    const contextSwiper = useSwiper();
    const swiper = swiperProp ?? contextSwiper;
    const segmentCount =
        swiper?.snapGrid?.length ?? (slideCountProp && slideCountProp >= 2 ? slideCountProp : 0);

    const { transformValue, containerWidth } = useMemo(
        () => computeDotWindow(segmentCount, activeSlideIndex, maxVisible),
        [segmentCount, activeSlideIndex, maxVisible]
    );

    if (segmentCount < 2) return null;

    const activeDotColor = theme === "dark" ? "allWhite" : "porscheBlack";
    const isContained = variant === "contained";
    const isAtStart = activeSlideIndex === 0;
    const isAtEnd = activeSlideIndex >= segmentCount - 1;

    return (
        <MotionBox style={motionStyle} flexShrink={0}>
            <Flex
                alignItems="center"
                justifyContent="center"
                gap={4}
                {...(isContained && {
                    bgColor: "ndlBlack",
                    backdropFilter: "auto",
                    backdropBlur: "ndlFrostedGlassLow",
                    borderRadius: "ndlRadiusSmall",
                    px: 2,
                    py: 1,
                })}
                {...rest}
            >
                {showArrows && (
                    <CarouselNavigationButton
                        direction="prev"
                        onClick={() => {
                            swiper?.slidePrev();
                            onNavigate?.("prev");
                        }}
                        hideLabel
                        disabled={isAtStart}
                        aria={{ "aria-label": "Previous slide" }}
                        theme={theme}
                    />
                )}

                <Flex
                    alignItems="center"
                    overflow="hidden"
                    {...(containerWidth != null && { width: `${containerWidth}px` })}
                >
                    <Flex
                        alignItems="center"
                        gap={2}
                        sx={{
                            transition: TRACK_TRANSITION,
                            transform: transformValue,
                            [REDUCED_MOTION_QUERY]: {
                                transition: "none",
                            },
                        }}
                    >
                        {Array.from({ length: segmentCount }, (_, index) => {
                            const isActive = activeSlideIndex === index;
                            const isFilling = isActive && filling && fillDuration != null;
                            return (
                                <Box
                                    as="button"
                                    type="button"
                                    key={index}
                                    width={isActive ? `${ACTIVE_WIDTH}px` : `${DOT_SIZE}px`}
                                    height={`${DOT_SIZE}px`}
                                    borderRadius="full"
                                    border="none"
                                    padding={0}
                                    cursor="pointer"
                                    flexShrink={0}
                                    bgColor={isActive ? activeDotColor : "grey300"}
                                    position="relative"
                                    overflow="hidden"
                                    sx={{
                                        transition: DOT_TRANSITION,
                                        transformOrigin: "center center",
                                        "&:focus-visible": {
                                            outline: "none",
                                            boxShadow: "0 0 0 2px #1A44EA",
                                        },
                                        "&::after": {
                                            content: '""',
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            bottom: 0,
                                            width: isFilling ? "100%" : "0%",
                                            borderRadius: "inherit",
                                            bg: "rgba(255, 255, 255, 0.45)",
                                            pointerEvents: "none",
                                            transition: isFilling
                                                ? `width ${fillDuration}ms linear`
                                                : "none",
                                        },
                                        [REDUCED_MOTION_QUERY]: {
                                            transition: "none",
                                            "&::after": {
                                                transition: "none",
                                            },
                                        },
                                    }}
                                    onClick={(e: MouseEvent<HTMLDivElement>) => {
                                        const perGroup = swiper?.params?.slidesPerGroup ?? 1;
                                        swiper?.slideTo(index * perGroup);
                                        onClick?.(e);
                                        onNavigate?.("pagination", index);
                                    }}
                                    aria-label={
                                        isActive
                                            ? `Current slide, slide ${index + 1} of ${segmentCount}`
                                            : `Go to slide ${index + 1}`
                                    }
                                    aria-current={isActive ? "true" : undefined}
                                />
                            );
                        })}
                    </Flex>
                </Flex>

                {showArrows && (
                    <CarouselNavigationButton
                        direction="next"
                        onClick={() => {
                            swiper?.slideNext();
                            onNavigate?.("next");
                        }}
                        hideLabel
                        disabled={isAtEnd}
                        aria={{ "aria-label": "Next slide" }}
                        theme={theme}
                    />
                )}
            </Flex>
        </MotionBox>
    );
};

export { NdlCarouselPagination };
export type { NdlCarouselPaginationProps };
