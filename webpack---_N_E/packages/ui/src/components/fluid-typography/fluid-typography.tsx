/**
 * Fluid typography component matching Porsche Design System usage.
 * Single component with size prop, aligned with NdlHeading / NdlText pattern.
 */
import {
    chakra,
    forwardRef,
    omitThemingProps,
    useStyleConfig,
    type ThemingProps,
    type HTMLChakraProps,
} from "@chakra-ui/react";
import { cx } from "@chakra-ui/utils";

export type FluidTypographyProps = HTMLChakraProps<"h2"> & ThemingProps<"FluidTypography">;

const FluidTypography = forwardRef<FluidTypographyProps, "h2">((props, ref) => {
    const styles = useStyleConfig("FluidTypography", props);

    const { className, as = "h2", children, ...rest } = omitThemingProps(props);

    return (
        <chakra.h2
            ref={ref}
            as={as}
            __css={styles}
            className={cx("fluid-typography", className)}
            {...rest}
        >
            {children}
        </chakra.h2>
    );
});

FluidTypography.displayName = "FluidTypography";

export { FluidTypography };
