import {
    chakra,
    forwardRef,
    omitThemingProps,
    useStyleConfig,
    type ThemingProps,
    type HTMLChakraProps,
} from "@chakra-ui/react";
import { cx } from "@chakra-ui/utils";
import { useMemo } from "react";

type NdlButtonProps = HTMLChakraProps<"button"> & ThemingProps<"NdlButton">;

const NdlButton = forwardRef<NdlButtonProps, "button">((props, ref) => {
    const styles = useStyleConfig("NdlButton", props);

    const { className, as, children, ...rest } = omitThemingProps(props);

    const buttonStyles = useMemo(() => {
        return {
            display: "inline-flex",
            appearance: "none",
            alignItems: "center",
            justifyContent: "center",
            userSelect: "none",
            position: "relative",
            whiteSpace: "nowrap",
            verticalAlign: "middle",
            outline: "none",
            ...styles,
        };
    }, [styles]);

    return (
        <chakra.button
            ref={ref}
            as={as}
            __css={buttonStyles}
            className={cx("ndl-button", className)}
            {...rest}
        >
            {children}
        </chakra.button>
    );
});

NdlButton.displayName = "NdlButton";

export { NdlButton };
export type { NdlButtonProps };
