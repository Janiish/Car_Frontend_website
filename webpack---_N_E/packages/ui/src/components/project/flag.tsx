import "country-flag-icons/3x2/flags.css";
import type { HTMLChakraProps, ThemingProps } from "@chakra-ui/react";
import { chakra, forwardRef, useStyleConfig } from "@chakra-ui/react";
import { useMemo } from "react";
import { useCountryData } from "../../hooks/project/useCountryData";

type FlagProps = HTMLChakraProps<"span"> &
    ThemingProps<"Flag"> & {
        countryCode: string;
    };

const Flag = forwardRef<FlagProps, "span">((props, ref) => {
    const { countryCode, className, size, ...rest } = props;

    const styles = useStyleConfig("Flag", { size });

    const { name } = useCountryData({ countryCode });

    const flagClassName = useMemo(() => {
        return [`flag:${countryCode}`, className].filter(Boolean).join(" ");
    }, [countryCode, className]);

    return (
        <chakra.span __css={styles} {...rest} className={flagClassName} title={name} ref={ref} />
    );
});

Flag.displayName = "Flag";

export type { FlagProps };
export { Flag };
