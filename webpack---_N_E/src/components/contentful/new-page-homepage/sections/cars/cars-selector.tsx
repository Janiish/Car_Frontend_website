import { memo } from "react";
import type { DashboardCar3dFieldsFragment } from "@/components/contentful/new-page-homepage/__generated/page-homepage.contentful.generated";
import { Flex, NdlToolbar } from "@project/ui";

type CarsSelectorProps = {
    cars: Array<DashboardCar3dFieldsFragment | null | undefined>;
    activeCarIndex: number;
    onCarChange: (index: number) => void;
    onPrefetchCar?: (index: number) => void;
    highlightColor: string;
    highlightTextColor: string;
};

const CarsSelector = memo(function CarsSelector({
    cars,
    activeCarIndex,
    onCarChange,
    onPrefetchCar,
    highlightColor,
    highlightTextColor,
}: CarsSelectorProps) {
    // Mobile: left-aligned within the 20px frame; desktop: centered.
    // Scrollable if the toolbar is wider than the viewport.
    return (
        <Flex justifyContent={{ base: "flex-start", l: "center" }} width="full">
            <NdlToolbar.Root
                activeIndex={activeCarIndex}
                onActiveIndexChange={onCarChange}
                highlightColor={highlightColor}
                highlightTextColor={highlightTextColor}
                className="scroll-fade-x"
                data-lenis-prevent-horizontal
            >
                <NdlToolbar.ButtonGroup aria-label="Cars selection">
                    <NdlToolbar.Indicator />
                    {cars
                        .filter((c): c is DashboardCar3dFieldsFragment => Boolean(c))
                        .map((car3d, index) => (
                            <NdlToolbar.Button
                                key={car3d.sys?.id}
                                onMouseEnter={() => onPrefetchCar?.(index)}
                                onFocus={() => onPrefetchCar?.(index)}
                            >
                                {car3d.displayName ??
                                    (car3d.car?.__typename === "Car" ? car3d.car.name : undefined)}
                            </NdlToolbar.Button>
                        ))}
                </NdlToolbar.ButtonGroup>
            </NdlToolbar.Root>
        </Flex>
    );
});

CarsSelector.displayName = "CarsSelector";

export { CarsSelector };
