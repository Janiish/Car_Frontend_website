import type { ReactNode } from "react";
import { useMemo } from "react";
import type { HTMLChakraProps, ResponsiveValue } from "@chakra-ui/react";
import { forwardRef, chakra } from "@chakra-ui/react";
import { useTheme } from "../../hooks/chakra-ui/chakra-ui";
import { customGetToken } from "../../hooks/chakra-ui/use-token";

type StringOrNumber = string | number;

interface AspectRatioOptions {
    ratio: ResponsiveValue<StringOrNumber>;
}

export interface AspectRatioProps extends HTMLChakraProps<"div">, AspectRatioOptions {
    children?: ReactNode;
}

export const aspectRatioDefaultProps: AspectRatioProps = {
    ratio: "4:3",
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { ratio: _, ...chakraDefaultProps } = aspectRatioDefaultProps;

export const AspectRatio = forwardRef<AspectRatioProps, "div">((props, ref) => {
    const theme = useTheme();

    const ratio = useMemo(() => {
        if (props.ratio === null) {
            return aspectRatioDefaultProps.ratio;
        }

        if (Array.isArray(props.ratio)) {
            const fallbacks = props.ratio.map(() => aspectRatioDefaultProps.ratio);

            return customGetToken(
                "aspectRatios",
                props.ratio as StringOrNumber | StringOrNumber[],
                fallbacks as StringOrNumber | StringOrNumber[]
            )(theme);
        } else if (typeof props.ratio === "object") {
            const values = Object.values(props.ratio);

            const fallbacks = values.map(() => aspectRatioDefaultProps.ratio);

            return customGetToken(
                "aspectRatios",
                values as StringOrNumber | StringOrNumber[],
                fallbacks as StringOrNumber | StringOrNumber[]
            )(theme);
        }

        return customGetToken(
            "aspectRatios",
            props.ratio,
            aspectRatioDefaultProps.ratio as StringOrNumber
        )(theme);
    }, [props.ratio, theme]);

    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
    const { ratio: _, children, overflow, ...rest } = props;

    return (
        <chakra.div
            ref={ref}
            {...chakraDefaultProps}
            {...rest}
            __css={{
                position: "relative",
                aspectRatio: ratio,
                "& > *:not(style)": {
                    overflow: overflow ?? "hidden",
                    position: "relative",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                },
            }}
        >
            {children}
        </chakra.div>
    );
});
