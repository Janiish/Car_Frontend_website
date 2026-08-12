import type { ButtonPureProps } from "../../porsche-design-system/button-pure";
import { ButtonPure } from "../../porsche-design-system/button-pure";
import { Box } from "../../chakra-ui/box";

type CarouselNavigationButtonProps = ButtonPureProps & {
    direction: "prev" | "next";
    onClick: () => void;
};

const CarouselNavigationButton = ({
    direction,
    onClick,
    ...props
}: CarouselNavigationButtonProps) => {
    return (
        <Box transform={direction === "prev" ? "rotate(180deg)" : undefined}>
            <ButtonPure onClick={onClick} {...props} />
        </Box>
    );
};

export { CarouselNavigationButton };
export type { CarouselNavigationButtonProps };
