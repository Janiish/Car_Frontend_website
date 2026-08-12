import type { StackProps } from "@project/ui";
import { ButtonPure, HStack } from "@project/ui";

type MobileTabCloseProps = StackProps & {
    onClick: () => void;
};

const MobileTabClose = ({ children, onClick, ...props }: MobileTabCloseProps) => (
    <HStack
        borderBottom="1px solid"
        borderColor="rgba(255,255,255,0.20)"
        py={5}
        px={6}
        display={{
            base: "flex",
            l: "none",
        }}
        {...props}
    >
        <ButtonPure theme="dark" icon="arrow-left" size="large" width="full" onClick={onClick}>
            {children}
        </ButtonPure>
    </HStack>
);

export { MobileTabClose };
