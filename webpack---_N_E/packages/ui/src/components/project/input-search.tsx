import { Input, InputGroup, InputRightElement, Box, Text } from "@chakra-ui/react";
import { forwardRef, useState, useId } from "react";
import type { ChangeEvent } from "react";
import type { InputProps } from "@chakra-ui/react";
import { getFocusStyle } from "@porsche-design-system/components-react/styles";
import { Icon } from "../porsche-design-system/icon";

export type InputSearchProps = Omit<InputProps, "type"> & {
    label?: string;
    clear?: boolean;
    indicator?: boolean;
    onClear?: () => void;
};

export const InputSearch = forwardRef<HTMLInputElement, InputSearchProps>(function InputSearch(
    { label, clear = true, indicator = true, onClear, value, onChange, placeholder, id, ...props },
    ref
) {
    const [internalValue, setInternalValue] = useState("");
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const labelId = label ? `${inputId}-label` : undefined;
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const hasValue = String(currentValue ?? "").length > 0;

    // Ensure input always has an accessible name
    const ariaLabel = label ?? placeholder ?? "Search";

    const ariaProps =
        label && labelId ? { "aria-labelledby": labelId } : { "aria-label": ariaLabel };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
            setInternalValue(e.target.value);
        }
        onChange?.(e);
    };

    const handleClear = () => {
        if (!isControlled) {
            setInternalValue("");
        }
        onClear?.();
        onChange?.({
            target: { value: "" },
            currentTarget: { value: "" },
        } as ChangeEvent<HTMLInputElement>);
    };

    return (
        <Box>
            {label && (
                <Text
                    as="label"
                    id={labelId}
                    display="block"
                    fontSize="sm"
                    fontWeight="medium"
                    mb={2}
                    htmlFor={inputId}
                >
                    {label}
                </Text>
            )}
            <InputGroup width="100%">
                <Input
                    ref={ref}
                    id={inputId}
                    type="search"
                    value={currentValue}
                    onChange={handleChange}
                    placeholder={placeholder}
                    {...ariaProps}
                    borderRadius="md"
                    borderColor="grey200"
                    css={{
                        paddingRight: "68px",
                        "&::-webkit-search-cancel-button": {
                            WebkitAppearance: "none",
                            appearance: "none",
                            display: "none",
                        },
                        "&::-ms-clear": {
                            display: "none",
                        },
                        "&:focus": {
                            outline: "none",
                            boxShadow: "none",
                        },
                    }}
                    _focusVisible={{
                        ...getFocusStyle(),
                    }}
                    _placeholder={{
                        color: "grey500",
                        opacity: 0.6,
                    }}
                    {...props}
                />
                {indicator && (
                    <InputRightElement
                        height="100%"
                        pr={clear && hasValue ? 10 : 3}
                        pointerEvents="none"
                        aria-hidden="true"
                    >
                        <Icon name="search" size="small" theme="dark" />
                    </InputRightElement>
                )}
                {clear && hasValue && (
                    <InputRightElement
                        height="100%"
                        pr={3}
                        cursor="pointer"
                        onClick={handleClear}
                        aria-label="Clear search"
                    >
                        <Icon name="close" size="small" theme="dark" aria-hidden="true" />
                    </InputRightElement>
                )}
            </InputGroup>
        </Box>
    );
});

InputSearch.displayName = "InputSearch";
