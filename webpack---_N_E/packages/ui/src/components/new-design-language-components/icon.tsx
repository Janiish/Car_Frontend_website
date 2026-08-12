import {
    chakra,
    forwardRef,
    omitThemingProps,
    useStyleConfig,
    type ThemingProps,
    type HTMLChakraProps,
} from "@chakra-ui/react";
import { cx } from "@chakra-ui/utils";

type NdlIconProps = HTMLChakraProps<"svg"> &
    ThemingProps<"NdlIcon"> & {
        name: string;
        spriteSheetFilename?: string;
    };

const NdlIcon = forwardRef<NdlIconProps, "svg">((props, ref) => {
    const styles = useStyleConfig("NdlIcon", props);

    const {
        className,
        as,
        name,
        spriteSheetFilename = "/icons.sprite.inline.svg",
        ...rest
    } = omitThemingProps(props);

    return (
        <chakra.svg
            ref={ref}
            as={as}
            __css={styles}
            className={cx("ndl-icon", className)}
            aria-hidden="true"
            role="presentation"
            focusable="false"
            fill="currentColor"
            {...rest}
        >
            <use href={`${spriteSheetFilename}#pmh-${name}`} />
        </chakra.svg>
    );
});

NdlIcon.displayName = "NdlIcon";

export { NdlIcon };
export type { NdlIconProps };
