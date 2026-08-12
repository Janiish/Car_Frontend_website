type VideoSourceSet = {
    webm?: string;
    mp4: string;
    fsv?: string;
};

type VideoConfig = {
    type: "scrub" | "autoplay";
    desktop: VideoSourceSet;
    mobile: VideoSourceSet;
};

export type { VideoSourceSet, VideoConfig };

/**
 * Which encode tier the scrub videos load; autoplay videos are unaffected.
 * Variants are produced by `node scripts/encode-videos.mjs`:
 *
 * - ""         originals (4K / 60fps / CRF 20) — reference quality, ~4× larger
 * - "-1440p60" `--optimized` (1440p / 60fps / CRF 23) — same scrub smoothness
 *              at a fraction of the size; keeping 60fps matters because
 *              scrubbing quantizes to frames
 */
const SCRUB_VARIANT: "" | "-1440p60" = "-1440p60";

/**
 * Per-video suffix overrides, for A/B-testing a single re-encode without
 * moving every video off SCRUB_VARIANT. A string overrides both formats; an
 * object overrides per format (falling back to SCRUB_VARIANT for any format
 * left unset).
 *
 * Garage: the grainy source showed compression artifacts at CRF 23, so the
 * `.fsv` (the WebCodecs/WebGL good-browser path) loads the CRF 20 re-encode
 * ("-1440p60-hq", from `--desktop-max-height 1440 --crf 20 --suffix
 * -1440p60-hq --name garage`). The `.mp4` is only used by the native-<video>
 * fallback — already the degraded tier — where scrub smoothness beats pristine
 * grain, so it stays on the standard CRF 23 encode (~28% smaller, lighter to
 * decode/buffer). Remove entries once a winner ships under the standard suffix.
 */
type VariantOverride = string | { mp4?: string; fsv?: string };

const SCRUB_VARIANT_OVERRIDES: Partial<Record<keyof typeof HOMEPAGE_VIDEOS_RAW, VariantOverride>> =
    {
        garage: { fsv: "-1440p60-hq", mp4: SCRUB_VARIANT },
    };

const variantPath = (path: string, suffix: string) => path.replace(/\.(\w+)$/, `${suffix}.$1`);

const suffixForFormat = (override: VariantOverride, format: "mp4" | "fsv") =>
    typeof override === "string" ? override : (override[format] ?? SCRUB_VARIANT);

const variantSet = (set: VideoSourceSet, override: VariantOverride): VideoSourceSet => ({
    ...set,
    mp4: variantPath(set.mp4, suffixForFormat(override, "mp4")),
    ...(set.fsv ? { fsv: variantPath(set.fsv, suffixForFormat(override, "fsv")) } : {}),
});

const HOMEPAGE_VIDEOS_RAW = {
    garage: {
        type: "scrub",
        desktop: {
            mp4: "/homepage/garage/garage-desktop.mp4",
            fsv: "/homepage/garage/garage-desktop.fsv",
        },
        mobile: {
            mp4: "/homepage/garage/garage-mobile.mp4",
            fsv: "/homepage/garage/garage-mobile.fsv",
        },
    },
    car963: {
        type: "scrub",
        desktop: {
            mp4: "/homepage/963/963-desktop.mp4",
            fsv: "/homepage/963/963-desktop.fsv",
        },
        mobile: {
            mp4: "/homepage/963/963-mobile.mp4",
            fsv: "/homepage/963/963-mobile.fsv",
        },
    },
    car99xElectric: {
        type: "scrub",
        desktop: {
            mp4: "/homepage/99x-electric/99x-electric-desktop.mp4",
            fsv: "/homepage/99x-electric/99x-electric-desktop.fsv",
        },
        mobile: {
            mp4: "/homepage/99x-electric/99x-electric-mobile.mp4",
            fsv: "/homepage/99x-electric/99x-electric-mobile.fsv",
        },
    },
    car911Cup: {
        type: "scrub",
        desktop: {
            mp4: "/homepage/911-cup/911-cup-desktop.mp4",
            fsv: "/homepage/911-cup/911-cup-desktop.fsv",
        },
        mobile: {
            mp4: "/homepage/911-cup/911-cup-mobile.mp4",
            fsv: "/homepage/911-cup/911-cup-mobile.fsv",
        },
    },
    car911GT3R: {
        type: "scrub",
        desktop: {
            mp4: "/homepage/911-gt3-r/911-gt3-r-desktop.mp4",
            fsv: "/homepage/911-gt3-r/911-gt3-r-desktop.fsv",
        },
        mobile: {
            mp4: "/homepage/911-gt3-r/911-gt3-r-mobile.mp4",
            fsv: "/homepage/911-gt3-r/911-gt3-r-mobile.fsv",
        },
    },
    news: {
        type: "autoplay",
        desktop: {
            webm: "/homepage/news/news-desktop.webm",
            mp4: "/homepage/news/news-desktop.mp4",
        },
        mobile: {
            webm: "/homepage/news/news-mobile.webm",
            mp4: "/homepage/news/news-mobile.mp4",
        },
    },
} satisfies Record<string, VideoConfig>;

export const HOMEPAGE_VIDEOS: typeof HOMEPAGE_VIDEOS_RAW = Object.fromEntries(
    Object.entries(HOMEPAGE_VIDEOS_RAW).map(([key, config]) => {
        const suffix =
            SCRUB_VARIANT_OVERRIDES[key as keyof typeof HOMEPAGE_VIDEOS_RAW] ?? SCRUB_VARIANT;
        return [
            key,
            config.type === "scrub" && suffix
                ? {
                      ...config,
                      desktop: variantSet(config.desktop, suffix),
                      mobile: variantSet(config.mobile, suffix),
                  }
                : config,
        ];
    })
) as typeof HOMEPAGE_VIDEOS_RAW;
