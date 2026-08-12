import { memo } from "react";
import {
    CldImage,
    CldVideoLite,
    hasCloudinaryAsset,
    isCloudinaryVideo,
    MotionBox,
    NdlSurface,
} from "@project/ui";
import type { DashboardCar3dFieldsFragment } from "../../__generated/page-homepage.contentful.generated";
import { useIsDashboardOpen } from "./car-dashboard-layout-context";

type CarDashboardMediaCardProps = {
    car3d?: DashboardCar3dFieldsFragment | null;
};

const CarDashboardMediaCard = memo(function CarDashboardMediaCard({
    car3d,
}: CarDashboardMediaCardProps) {
    const isDashboardOpen = useIsDashboardOpen();

    return (
        <NdlSurface size="card" colorScheme="black" width="full" height="full" p={0}>
            {hasCloudinaryAsset(car3d?.dashboardAsset) &&
                (isCloudinaryVideo(car3d?.dashboardAsset) ? (
                    <CldVideoLite
                        cloudinaryAsset={car3d?.dashboardAsset}
                        wrapperProps={{ position: "absolute" }}
                        loop
                        // Keep the element mounted (avoids decode restart /
                        // flash on reopen) but stop it from decoding while
                        // the frosted-glass overlay fully hides it.
                        // CldVideoLite drives play/pause imperatively off
                        // this prop via its internal shouldPlay effect, so
                        // toggling it live pauses/resumes the existing
                        // video rather than only affecting initial mount.
                        autoPlay={isDashboardOpen}
                    />
                ) : (
                    <CldImage fill cloudinaryAsset={car3d?.dashboardAsset} />
                ))}
            <MotionBox
                position="absolute"
                inset={0}
                zIndex={1}
                pointerEvents="none"
                sx={{
                    backdropFilter: "blur(var(--blur-ndlFrostedGlassLow))",
                }}
                initial={{ opacity: isDashboardOpen ? 0 : 1 }}
                animate={{ opacity: isDashboardOpen ? 0 : 1 }}
                transition={{
                    duration: 1.33 / 2,
                    delay: isDashboardOpen ? 1.33 / 2 : 0,
                }}
            />
        </NdlSurface>
    );
});

CarDashboardMediaCard.displayName = "CarDashboardMediaCard";

export { CarDashboardMediaCard };
