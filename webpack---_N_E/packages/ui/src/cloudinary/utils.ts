import { getCldImageUrl, getCldVideoUrl, getCldOgImageUrl } from "next-cloudinary";
import type { ContentfulCloudinaryAssetField } from "./cld-types";
import { constructCloudinaryUrl } from "@cloudinary-util/url-loader";

export const hasCloudinaryAsset = (cloudinaryAsset: ContentfulCloudinaryAssetField) => {
    if (Array.isArray(cloudinaryAsset)) {
        return cloudinaryAsset.length > 0;
    }

    return !!cloudinaryAsset;
};

export const isCloudinaryVideo = (cloudinaryAsset: ContentfulCloudinaryAssetField) => {
    return cloudinaryAsset && cloudinaryAsset[0]?.resource_type === "video";
};
export const hasYoutubeVideo = (youtubeUrl: string | null | undefined): youtubeUrl is string => {
    if (Array.isArray(youtubeUrl)) {
        return youtubeUrl.length > 0;
    }
    return !!youtubeUrl;
};

export const isCloudinaryImage = (cloudinaryAsset: ContentfulCloudinaryAssetField) => {
    return cloudinaryAsset && cloudinaryAsset[0]?.resource_type === "image";
};

export const getPosterUrl = (cloudinaryAsset: ContentfulCloudinaryAssetField) => {
    if (!hasCloudinaryAsset(cloudinaryAsset)) {
        return;
    }

    let srcWidth = Number(cloudinaryAsset![0].width);

    if (srcWidth > 999) {
        srcWidth = srcWidth / 2;
    }

    return constructCloudinaryUrl({
        options: {
            src: cloudinaryAsset![0].public_id!,
            crop: "fill",
            gravity: "auto",
            quality: "auto",
            format: "auto",
            assetType: "video",
            rawTransformations: "so_0.0",
            width: srcWidth,
        },
        config: {
            cloud: {
                cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            },
        },
    });
};

export { getCldImageUrl, getCldVideoUrl, getCldOgImageUrl };
