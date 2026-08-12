import type { HTMLChakraProps } from "@chakra-ui/react";
import { chakra, forwardRef } from "@chakra-ui/react";
import { Warp } from "@paper-design/shaders-react";

type ShaderBackgroundProps = Omit<HTMLChakraProps<"div">, "color"> & {
    // Warp-specific params
    colors?: string[];
    proportion?: number;
    softness?: number;
    distortion?: number;
    swirl?: number;
    swirlIterations?: number;
    shape?: "checks" | "stripes" | "edge";
    shapeScale?: number;
    // Motion params
    speed?: number;
    frame?: number;
    // Sizing params
    scale?: number;
    rotation?: number;
    offsetX?: number;
    offsetY?: number;
    fit?: "contain" | "cover";
    worldWidth?: number;
    worldHeight?: number;
    originX?: number;
    originY?: number;
    // Shader component params
    minPixelRatio?: number;
    maxPixelCount?: number;
};

const ShaderBackground = forwardRef<ShaderBackgroundProps, "div">((props, ref) => {
    const {
        // Warp-specific params
        colors = ["#3c1515", "#944752", "#ffc085"],
        proportion = 0.5,
        softness = 1,
        distortion = 0.09,
        swirl = 0.9,
        swirlIterations = 6,
        shape = "checks",
        shapeScale = 0.25,
        // Motion params
        speed = 3,
        frame,
        // Sizing params
        scale = 2.5,
        rotation = 1.35,
        offsetX,
        offsetY,
        fit,
        worldWidth,
        worldHeight,
        originX,
        originY,
        // Shader component params
        minPixelRatio,
        maxPixelCount,
        // Chakra props
        ...rest
    } = props;

    return (
        <chakra.div ref={ref} position="relative" {...rest}>
            <Warp
                colors={colors}
                proportion={proportion}
                softness={softness}
                distortion={distortion}
                swirl={swirl}
                swirlIterations={swirlIterations}
                shape={shape}
                shapeScale={shapeScale}
                speed={speed}
                frame={frame}
                scale={scale}
                rotation={rotation}
                offsetX={offsetX}
                offsetY={offsetY}
                fit={fit}
                worldWidth={worldWidth}
                worldHeight={worldHeight}
                originX={originX}
                originY={originY}
                minPixelRatio={minPixelRatio}
                maxPixelCount={maxPixelCount}
                width="100%"
                height="100%"
            />
        </chakra.div>
    );
});

ShaderBackground.displayName = "ShaderBackground";

export type { ShaderBackgroundProps };
export { ShaderBackground };
