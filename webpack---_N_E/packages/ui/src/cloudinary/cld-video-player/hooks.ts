import { getCldVideoUrl } from "next-cloudinary";
import { useEffect, useMemo, useState, useCallback } from "react";
import type { ContentfulCloudinaryAssetField } from "../cld-types";
import { useTheme } from "@chakra-ui/react";

export const useSecondsAsTime = (timeInSeconds: number) => {
    return useMemo(() => {
        if (timeInSeconds < 0 || isNaN(timeInSeconds)) {
            return "00:00";
        }

        const dateObj = new Date(timeInSeconds * 1000);
        const hours = dateObj.getUTCHours();
        const minutes = dateObj.getUTCMinutes();
        const seconds = dateObj.getSeconds();

        return [
            // only include hours if > 1
            ...(hours > 0 ? [hours.toString().padStart(2, "0")] : []),
            minutes.toString().padStart(2, "0"),
            seconds.toString().padStart(2, "0"),
        ].join(":");
    }, [timeInSeconds]);
};

const cloudinarySizes: { [key: string]: number } = {
    base: 480,
    xs: 768,
    s: 1024,
    md: 1440,
    l: 1920,
    xl: 2560,
    xxl: 3840,
};

const MAX_ALLOWED_CLOUDINARY_SIZE = 5000;

export const useCldVideoUrl = ({
    cloudinaryAsset,
}: {
    cloudinaryAsset: ContentfulCloudinaryAssetField;
}) => {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    const { breakpoints }: { breakpoints: Record<string, string> } = useTheme();

    const getInitialBreakpoint = useCallback(() => {
        if (typeof window !== "undefined") {
            const width = window.innerWidth;
            if (width >= parseInt(breakpoints.xxl)) return "xxl";
            if (width >= parseInt(breakpoints.xl)) return "xl";
            if (width >= parseInt(breakpoints.l)) return "l";
            if (width >= parseInt(breakpoints.md)) return "md";
            if (width >= parseInt(breakpoints.s)) return "s";
            if (width >= parseInt(breakpoints.xs)) return "xs";
        }
        return "base";
    }, [
        breakpoints.l,
        breakpoints.md,
        breakpoints.s,
        breakpoints.xl,
        breakpoints.xs,
        breakpoints.xxl,
    ]);

    const getCloudinarySize = useCallback(() => {
        const breakpoint = getInitialBreakpoint();
        let size = cloudinarySizes[breakpoint];

        if (typeof window !== "undefined") {
            const pixelRatio = window.devicePixelRatio;
            size *= pixelRatio;
        }

        const assetWidth = cloudinaryAsset?.[0]?.width ?? 0;
        const assetHeight = cloudinaryAsset?.[0]?.height ?? 0;
        const aspectRatio = assetWidth / assetHeight;

        // If the original width or height is below the candidate size, use the original size
        if (assetWidth <= size || assetHeight <= size / aspectRatio) {
            return assetWidth;
        }

        // Find the closest cloudinary size that is greater than or equal to the calculated size
        const keys = Object.keys(cloudinarySizes).sort(
            (a, b) => cloudinarySizes[a] - cloudinarySizes[b]
        );

        for (const key of keys) {
            const candidateSize = cloudinarySizes[key];
            const candidateHeight = candidateSize / aspectRatio;

            if (
                candidateSize <= MAX_ALLOWED_CLOUDINARY_SIZE &&
                candidateHeight <= MAX_ALLOWED_CLOUDINARY_SIZE
            ) {
                size = candidateSize;
            } else {
                break;
            }
        }

        return size;
    }, [cloudinaryAsset, getInitialBreakpoint]);

    useEffect(() => {
        const src = cloudinaryAsset?.[0].public_id;

        if (!src) {
            return;
        }

        const width = getCloudinarySize();

        const url = getCldVideoUrl({
            src: src,
            width: width,
            crop: "fill",
            gravity: "auto",
            quality: "auto",
            format: "auto:video",
        });

        setVideoUrl(url);
    }, [cloudinaryAsset, getCloudinarySize]);

    return videoUrl;
};
