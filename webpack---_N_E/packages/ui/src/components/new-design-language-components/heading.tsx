import {
    chakra,
    forwardRef,
    omitThemingProps,
    useStyleConfig,
    type ThemingProps,
    type HTMLChakraProps,
} from "@chakra-ui/react";
import { cx } from "@chakra-ui/utils";

type NdlHeadingProps = HTMLChakraProps<"h2"> & ThemingProps<"NdlHeading">;

const NdlHeading = forwardRef<NdlHeadingProps, "h2">((props, ref) => {
    const styles = useStyleConfig("NdlHeading", props);

    const { className, as = "h2", children, ...rest } = omitThemingProps(props);

    return (
        <chakra.h2
            ref={ref}
            as={as}
            __css={styles}
            className={cx("ndl-heading", className)}
            {...rest}
        >
            {children}
        </chakra.h2>
    );
});

NdlHeading.displayName = "NdlHeading";

export { NdlHeading };
export type { NdlHeadingProps };
