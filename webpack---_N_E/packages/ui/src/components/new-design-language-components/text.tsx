import {
    chakra,
    forwardRef,
    omitThemingProps,
    useStyleConfig,
    type ThemingProps,
    type HTMLChakraProps,
} from "@chakra-ui/react";
import { cx } from "@chakra-ui/utils";

type NdlTextProps = HTMLChakraProps<"p"> & ThemingProps<"NdlText">;

const NdlText = forwardRef<NdlTextProps, "p">((props, ref) => {
    const styles = useStyleConfig("NdlText", props);

    const { className, as, children, ...rest } = omitThemingProps(props);

    return (
        <chakra.p ref={ref} as={as} __css={styles} className={cx("ndl-text", className)} {...rest}>
            {children}
        </chakra.p>
    );
});

NdlText.displayName = "NdlText";

export { NdlText };
export type { NdlTextProps };
