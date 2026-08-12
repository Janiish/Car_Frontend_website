import { gridTemplateColumns } from "@project/ui/src/theme/global-styles";
import { Description } from "./description";
import { Title } from "./title";
import type { BoxProps } from "@project/ui";
import { Grid, GridItem } from "@project/ui";
import type { ReactNode } from "react";

type ModuleHeaderProps = Omit<BoxProps, "title"> & {
    title: string | null | undefined;
    description: string | null | undefined;
    children?: ReactNode;
};

const ModuleHeader = ({ title, description, children, ...rest }: ModuleHeaderProps) => {
    return (
        <Grid mb={{ base: 6, l: 8 }} gridTemplateColumns={gridTemplateColumns} {...rest}>
            {title && (
                <GridItem
                    gridColumn={{
                        base: "1 / span 2",
                        l: "1 / span 5",
                    }}
                    gridColumnStart={1}
                >
                    {title && <Title>{title}</Title>}
                </GridItem>
            )}
            {description && (
                <GridItem
                    gridColumn={{
                        base: "1 / span 2",
                        l: "1 / span 5",
                    }}
                    gridColumnStart={1}
                >
                    {description && <Description>{description}</Description>}
                </GridItem>
            )}
            {children}
        </Grid>
    );
};

export { ModuleHeader };
