import type { GridProps, GridItemProps } from "@project/ui";
import { Grid, GridItem, forwardRef } from "@project/ui";

type SectionGridItemProps = GridItemProps;

const SectionGridItem = forwardRef<SectionGridItemProps, "div">(
    ({ children, ...gridItemProps }, ref) => {
        return (
            <GridItem as="li" {...gridItemProps} ref={ref}>
                {children}
            </GridItem>
        );
    }
);

type SectionGridProps = GridProps;

const SectionGrid = forwardRef<SectionGridProps, "div">(({ children, ...gridProps }, ref) => {
    return (
        <Grid
            as="ul"
            templateColumns={{ base: "repeat(1, 1fr)", s: "repeat(2, 1fr)" }}
            templateRows="repeat(1fr)"
            listStyleType="none"
            p={0}
            m={0}
            columnGap={6}
            rowGap={3}
            {...gridProps}
            ref={ref}
        >
            {children}
        </Grid>
    );
});

export { SectionGrid, SectionGridItem };
