import { chakra, useMediaQuery } from "@project/ui";
import { getFocusStyle } from "@porsche-design-system/components-react/styles";

const StyledButton = chakra("button");

const EASE_STANDARD = "cubic-bezier(0.8, 0, 0.2, 1)";
const MORPH_DURATION = "0.3s";

type BurgerMenuButtonProps = {
    isOpen: boolean;
    onClick: () => void;
    ariaLabel: string;
    ariaControlsId?: string;
};

const BurgerMenuButton = ({
    isOpen,
    onClick,
    ariaLabel,
    ariaControlsId,
}: BurgerMenuButtonProps) => {
    const [prefersReducedMotion] = useMediaQuery("(prefers-reduced-motion: reduce)", {
        ssr: true,
        fallback: false,
    });

    const dur = prefersReducedMotion ? "0s" : MORPH_DURATION;
    const transition = `transform ${dur} ${EASE_STANDARD}, opacity ${dur} ${EASE_STANDARD}`;

    return (
        <StyledButton
            type="button"
            aria-controls={ariaControlsId}
            aria-expanded={isOpen}
            aria-label={ariaLabel}
            onClick={onClick}
            width={9}
            height={9}
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="none"
            outline="none"
            cursor="pointer"
            borderRadius="medium"
            backgroundColor="transparent"
            _focusVisible={getFocusStyle()}
            _hover={{ opacity: 0.9 }}
        >
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <rect
                    x="6"
                    y="6"
                    width="12"
                    height="1"
                    fill="white"
                    style={{
                        transition,
                        transformOrigin: "12px 6.5px",
                        transform: isOpen
                            ? "translateY(5.5px) rotate(45deg) scaleX(1.4142)"
                            : "none",
                    }}
                />
                <rect
                    x="6"
                    y="11"
                    width="12"
                    height="1"
                    fill="white"
                    style={{
                        transition,
                        opacity: isOpen ? 0 : 1,
                    }}
                />
                <rect
                    x="6"
                    y="16"
                    width="12"
                    height="1"
                    fill="white"
                    style={{
                        transition,
                        transformOrigin: "12px 16.5px",
                        transform: isOpen
                            ? "translateY(-4.5px) rotate(-45deg) scaleX(1.4142)"
                            : "none",
                    }}
                />
            </svg>
        </StyledButton>
    );
};

export { BurgerMenuButton };
