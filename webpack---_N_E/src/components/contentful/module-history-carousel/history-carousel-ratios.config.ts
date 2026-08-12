import { orientation, widthCondition, mediaQueryMaxHeight } from "@project/ui";
import aspectRatios from "@project/ui/src/design-tokens/11.aspect-ratios/aspect-ratios";

type AspectRatioToken = keyof typeof aspectRatios;

type RatioVariant = {
    id: string;
    /** Raw CSS media condition (no `@media` prefix) — usable in both `<source media>` and `sx`. */
    condition: string;
    ratio: AspectRatioToken;
};

/**
 * Raw CSS media conditions (no `@media` prefix) shared by every carousel
 * consumer, so screen-size/orientation behaviour is defined once.
 *
 * They are mutually exclusive (width < s vs >= s; landscape split at the l
 * breakpoint into tablet vs desktop; portrait by orientation; < s by height),
 * which keeps consumers consistent despite opposite precedence rules:
 * `<picture>` uses the first matching `<source>`, while CSS uses the last
 * matching declaration.
 */
const CAROUSEL_CONDITIONS = {
    desktop: `${widthCondition.minL} and ${orientation.landscape}`,
    tabletLandscape: `${widthCondition.minS} and ${widthCondition.maxL} and ${orientation.landscape}`,
    tabletPortrait: `${widthCondition.minS} and ${orientation.portrait}`,
    shortPhone: `${widthCondition.maxS} and ${mediaQueryMaxHeight.short}`,
} as const;

/**
 * Screen-size/orientation variants for the History carousel slide aspect ratio.
 *
 * `fallback` is the tall-phone default (< s width, portrait, height > 700px).
 */
const HISTORY_CAROUSEL_RATIOS = {
    fallback: "3:5" as AspectRatioToken,
    variants: [
        {
            id: "desktop",
            condition: CAROUSEL_CONDITIONS.desktop,
            ratio: "2:1",
        },
        {
            id: "tabletLandscape",
            condition: CAROUSEL_CONDITIONS.tabletLandscape,
            ratio: "16:9",
        },
        {
            id: "tabletPortrait",
            condition: CAROUSEL_CONDITIONS.tabletPortrait,
            ratio: "3:4",
        },
        {
            id: "shortPhone",
            condition: CAROUSEL_CONDITIONS.shortPhone,
            ratio: "10:16",
        },
    ] satisfies RatioVariant[],
} as const;

/** Container aspect-ratio as pure CSS: base value + one media override per variant. */
export const historyCarouselRatioSx = {
    aspectRatio: aspectRatios[HISTORY_CAROUSEL_RATIOS.fallback],
    ...Object.fromEntries(
        HISTORY_CAROUSEL_RATIOS.variants.map((variant) => [
            `@media ${variant.condition}`,
            { aspectRatio: aspectRatios[variant.ratio] },
        ])
    ),
} as const;

/** `CldPicture` per-variant crops — Cloudinary delivers the matching image variant. */
export const historyCarouselPictureSources = HISTORY_CAROUSEL_RATIOS.variants.map((variant) => ({
    media: variant.condition,
    crop: { aspectRatio: variant.ratio, type: "fill", gravity: "auto" },
}));

/** `CldPicture` fallback crop (tall phone). */
export const historyCarouselDefaultCrop = {
    aspectRatio: HISTORY_CAROUSEL_RATIOS.fallback,
    type: "fill",
    gravity: "auto",
};

/** Matches the carousel's slide item spacing — the base inset for the details card. */
const DETAILS_CARD_OFFSET_SLIDE_SPACING = "16px";
/** Larger inset for desktop and tablet-portrait so the card floats off the edges. */
const DETAILS_CARD_OFFSET_INSET = "32px";

/**
 * Tablet portrait while the card is still full width (below the `md`/1000px
 * breakpoint at which the details card becomes a fixed width and right-aligns).
 * Used to mirror the inset on the left so a full-width card stays symmetric.
 */
const DETAILS_CARD_FULL_WIDTH_TABLET_PORTRAIT = `${widthCondition.minS} and ${widthCondition.maxM} and ${orientation.portrait}`;

/**
 * Inset (pure CSS) for the details card inside a slide.
 * - mobile + tablet-landscape: 16px (falls through to the slide item spacing)
 * - tablet-portrait + desktop: 32px on the floating (bottom/right) edges
 * - `left` mirrors the inset only while the card is full width; once it becomes
 *   a fixed width at `md` it right-aligns (`left: auto`).
 */
export const historyDetailsCardOffsetSx = {
    left: DETAILS_CARD_OFFSET_SLIDE_SPACING,
    right: DETAILS_CARD_OFFSET_SLIDE_SPACING,
    bottom: DETAILS_CARD_OFFSET_SLIDE_SPACING,
    [`@media ${CAROUSEL_CONDITIONS.tabletPortrait}`]: {
        right: DETAILS_CARD_OFFSET_INSET,
        bottom: DETAILS_CARD_OFFSET_INSET,
    },
    [`@media ${CAROUSEL_CONDITIONS.desktop}`]: {
        right: DETAILS_CARD_OFFSET_INSET,
        bottom: DETAILS_CARD_OFFSET_INSET,
    },
    [`@media ${DETAILS_CARD_FULL_WIDTH_TABLET_PORTRAIT}`]: {
        left: DETAILS_CARD_OFFSET_INSET,
    },
    [`@media ${widthCondition.minM}`]: {
        left: "auto",
    },
} as const;
