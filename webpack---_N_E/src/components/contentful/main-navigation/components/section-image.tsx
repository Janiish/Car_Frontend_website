import type { CldImageProps } from "@project/ui";
import { CldImage, hasCloudinaryAsset, isCloudinaryImage } from "@project/ui";

type SectionImageProps = CldImageProps;

const SectionImage = ({ wrapperProps, ...props }: SectionImageProps) => {
    if (!hasCloudinaryAsset(props.cloudinaryAsset) || !isCloudinaryImage(props.cloudinaryAsset)) {
        return null;
    }

    return (
        <CldImage
            fill
            sizes={["25vw"]}
            wrapperProps={{
                isolation: "isolate", // Fixes Safari bug with rounded corners and scale transition
                ...wrapperProps,
            }}
            objectFit="contain"
            transitionProperty="common"
            transitionDuration="var(--transition-duration-moderate)"
            _groupHover={{
                transform: "scale(1.05)",
            }}
            {...props}
        />
    );
};

export { SectionImage };
