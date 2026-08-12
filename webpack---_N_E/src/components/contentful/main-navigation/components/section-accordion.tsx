import type { ReactNode } from "react";
import type {
    AccordionProps,
    AccordionButtonProps,
    AccordionItemProps,
    AccordionPanelProps,
} from "@project/ui";
import {
    Heading,
    Icon,
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    forwardRef,
} from "@project/ui";
import { getFocusStyle } from "@porsche-design-system/components-react/styles";

type SectionAccordionButtonsProps = AccordionButtonProps & {
    isExpanded: boolean;
    children: ReactNode;
};

const SectionAccordionButton = ({
    isExpanded,
    children,
    ...buttonProps
}: SectionAccordionButtonsProps) => {
    return (
        <AccordionButton
            data-group
            width="full"
            display="flex"
            justifyContent="space-between"
            pb={2}
            textAlign="left"
            borderBottom="1px solid"
            transitionDuration="var(--transition-duration-moderate)"
            transitionProperty="var(--transition-property-common)"
            borderColor={isExpanded ? "rgba(255,255,255,0)" : "rgba(255,255,255,0.15)"}
            _hover={{
                borderColor: isExpanded ? "rgba(255,255,255,0)" : "rgba(255,255,255,0.35)",
            }}
            {...buttonProps}
            _focusVisible={{ ...getFocusStyle() }}
        >
            <Heading
                as="span"
                size="headingMedium"
                fontWeight={400}
                transitionDuration="var(--transition-duration-moderate)"
                transitionProperty="var(--transition-property-common)"
                _groupHover={{
                    transform: isExpanded ? "translateX(0)" : "translateX(.25rem)",
                }}
            >
                {children}
            </Heading>
            <Icon name={isExpanded ? "subtract" : "add"} theme="dark" />
        </AccordionButton>
    );
};

type SectionAccordionItemProps = AccordionItemProps;

const SectionAccordionItem = forwardRef<SectionAccordionItemProps, "div">(
    ({ children, ...accordionItemProps }, ref) => {
        return (
            <AccordionItem mb={4} {...accordionItemProps} ref={ref}>
                {children}
            </AccordionItem>
        );
    }
);

type SectionAccordionPanelProps = AccordionPanelProps & {
    children: ReactNode;
};

const SectionAccordionPanel = ({
    children,
    ...accordionPanelProps
}: SectionAccordionPanelProps) => {
    return (
        <AccordionPanel mb={2} {...accordionPanelProps}>
            {children}
        </AccordionPanel>
    );
};

type SectionAccordionProps = AccordionProps & {
    children: ReactNode;
};

const SectionAccordion = ({ children, ...accordionProps }: SectionAccordionProps) => {
    return (
        <Accordion allowMultiple={false} allowToggle {...accordionProps}>
            {children}
        </Accordion>
    );
};

export { SectionAccordion, SectionAccordionItem, SectionAccordionPanel, SectionAccordionButton };
