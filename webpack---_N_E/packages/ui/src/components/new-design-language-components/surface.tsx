import { useMemo } from "react";
import {
    chakra,
    forwardRef,
    omitThemingProps,
    useStyleConfig,
    type ThemingProps,
    type HTMLChakraProps,
} from "@chakra-ui/react";
import { cx } from "@chakra-ui/utils";

type NdlSurfaceProps = HTMLChakraProps<"div"> & ThemingProps<"NdlSurface">;

const NdlSurface = forwardRef<NdlSurfaceProps, "div">((props, ref) => {
    const styles = useStyleConfig("NdlSurface", props);

    const { className, as, children, ...rest } = omitThemingProps(props);

    const surfaceStyles = useMemo(() => {
        return {
            ...styles,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "space-between",
        };
    }, [styles]);

    return (
        <chakra.div
            ref={ref}
            as={as}
            __css={surfaceStyles}
            className={cx("ndl-surface", className)}
            {...rest}
        >
            {children}
        </chakra.div>
    );
});

NdlSurface.displayName = "NdlSurface";

export { NdlSurface };
export type { NdlSurfaceProps };
