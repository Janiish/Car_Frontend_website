import {
    chakra,
    forwardRef,
    omitThemingProps,
    useMultiStyleConfig,
    type ThemingProps,
    type HTMLChakraProps,
    type SystemStyleObject,
} from "@chakra-ui/react";
import { cx } from "@chakra-ui/utils";
import {
    createContext,
    useCallback,
    useContext,
    useRef,
    useEffect,
    Children,
    isValidElement,
    cloneElement,
} from "react";
import type { KeyboardEvent, ReactNode, ReactElement } from "react";
import { colors } from "../../design-tokens";

// ---------------------------------------------------------------------------
// Pure helpers
// ---------------------------------------------------------------------------

const getIndicatorStyle = (el: HTMLElement): { transform: string; width: string } => ({
    transform: `translate3d(${Math.max(el.offsetLeft, 0)}px, 0, 0)`,
    width: `${el.offsetWidth}px`,
});

const prefersReducedMotion = (): boolean =>
    typeof globalThis.matchMedia === "function" &&
    globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;

function assignRef<T>(ref: React.ForwardedRef<T>, node: T | null) {
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
}

function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
    return (node: T | null) => {
        refs.forEach((r) => r != null && assignRef(r as React.ForwardedRef<T>, node));
    };
}

function resolveNextIndex(key: string, currentIndex: number, count: number): number | null {
    switch (key) {
        case "ArrowRight":
            return (currentIndex + 1) % count;
        case "ArrowLeft":
            return (currentIndex - 1 + count) % count;
        case "Home":
            return 0;
        case "End":
            return count - 1;
        default:
            return null;
    }
}

function scrollActiveButtonIntoView(
    viewport: HTMLDivElement | null,
    activeButton: HTMLElement,
    animated: boolean
) {
    if (!viewport || viewport.scrollWidth <= viewport.clientWidth) return;

    const center = activeButton.offsetLeft + activeButton.offsetWidth / 2;
    const scrollTarget = center - viewport.clientWidth / 2;
    const smooth = animated && !prefersReducedMotion();

    viewport.scrollTo({ left: scrollTarget, behavior: smooth ? "smooth" : "auto" });
}

function applyIndicatorStyle(
    indicator: HTMLElement,
    activeButton: HTMLElement,
    highlightColor: string,
    skipTransition: boolean
) {
    const style = { ...getIndicatorStyle(activeButton), backgroundColor: highlightColor };

    if (!skipTransition) {
        Object.assign(indicator.style, style);
        return;
    }

    indicator.style.transition = "none";
    Object.assign(indicator.style, style);
    indicator.getBoundingClientRect();
    indicator.style.transition = "";
}

// ---------------------------------------------------------------------------
// Indicator positioning hook
// ---------------------------------------------------------------------------

function useIndicatorPosition(
    activeIndex: number,
    highlightColor: string,
    indicatorRef: React.RefObject<HTMLSpanElement>,
    buttonRefs: React.RefObject<(HTMLElement | null)[]>,
    viewportRef: React.RefObject<HTMLDivElement | null>
) {
    const hasInitialized = useRef(false);
    const fontsReady = useRef(false);

    useEffect(() => {
        const indicator = indicatorRef.current;
        const activeButton = buttonRefs.current?.[activeIndex];
        if (!indicator || !activeButton) return;

        const needsInitJump = !hasInitialized.current;
        applyIndicatorStyle(indicator, activeButton, highlightColor, needsInitJump);
        if (needsInitJump) hasInitialized.current = true;

        scrollActiveButtonIntoView(viewportRef.current, activeButton, hasInitialized.current);
    }, [activeIndex, highlightColor, indicatorRef, buttonRefs, viewportRef]);

    useEffect(() => {
        const recalculate = () => {
            const indicator = indicatorRef.current;
            const activeButton = buttonRefs.current?.[activeIndex];
            if (!indicator || !activeButton) return;
            applyIndicatorStyle(indicator, activeButton, highlightColor, true);
        };

        globalThis.addEventListener("resize", recalculate);

        if (!fontsReady.current) {
            let cancelled = false;
            document.fonts.ready.then(() => {
                fontsReady.current = true;
                if (!cancelled) recalculate();
            });
            return () => {
                cancelled = true;
                globalThis.removeEventListener("resize", recalculate);
            };
        }

        return () => globalThis.removeEventListener("resize", recalculate);
    }, [activeIndex, highlightColor, indicatorRef, buttonRefs]);
}

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

const DEFAULT_HIGHLIGHT = colors.ndlMotorsportsRed;
const DEFAULT_HIGHLIGHT_TEXT = colors.allWhite;

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

type NdlToolbarContextValue = {
    activeIndex: number;
    onActiveIndexChange: (index: number) => void;
    highlightColor: string;
    highlightTextColor: string;
    buttonRefs: React.MutableRefObject<(HTMLElement | null)[]>;
    indicatorRef: React.RefObject<HTMLSpanElement>;
    viewportRef: React.MutableRefObject<HTMLDivElement | null>;
    buttonCount: React.MutableRefObject<number>;
    styles: Record<string, SystemStyleObject>;
};

const NdlToolbarContext = createContext<NdlToolbarContextValue | null>(null);

function useNdlToolbarContext() {
    const ctx = useContext(NdlToolbarContext);
    if (!ctx) {
        throw new Error(
            "NdlToolbar compound components must be rendered inside <NdlToolbar.Root>."
        );
    }
    return ctx;
}

// ---------------------------------------------------------------------------
// Root — context provider + scrollable viewport
// ---------------------------------------------------------------------------

type NdlToolbarRootProps = {
    activeIndex: number;
    onActiveIndexChange: (index: number) => void;
    highlightColor?: string;
    highlightTextColor?: string;
    children: ReactNode;
} & HTMLChakraProps<"div"> &
    ThemingProps<"NdlToolbar">;

const Root = forwardRef<NdlToolbarRootProps, "div">((props, ref) => {
    const styles = useMultiStyleConfig("NdlToolbar", props);

    const {
        activeIndex,
        onActiveIndexChange,
        highlightColor = DEFAULT_HIGHLIGHT,
        highlightTextColor = DEFAULT_HIGHLIGHT_TEXT,
        children,
        className,
        ...rest
    } = omitThemingProps(props);

    const viewportRef = useRef<HTMLDivElement | null>(null);
    const buttonRefs = useRef<(HTMLElement | null)[]>([]);
    const indicatorRef = useRef<HTMLSpanElement>(null);
    const buttonCount = useRef(0);

    const setViewportRef = useCallback(
        (node: HTMLDivElement | null) => {
            viewportRef.current = node;
            assignRef(ref, node);
        },
        [ref]
    );

    useIndicatorPosition(activeIndex, highlightColor, indicatorRef, buttonRefs, viewportRef);

    return (
        <NdlToolbarContext.Provider
            value={{
                activeIndex,
                onActiveIndexChange,
                highlightColor,
                highlightTextColor,
                buttonRefs,
                indicatorRef,
                viewportRef,
                buttonCount,
                styles,
            }}
        >
            <chakra.div
                ref={setViewportRef}
                __css={styles.viewport}
                className={cx("ndl-toolbar", className)}
                {...rest}
            >
                {children}
            </chakra.div>
        </NdlToolbarContext.Provider>
    );
});

Root.displayName = "NdlToolbar.Root";

// ---------------------------------------------------------------------------
// Button — individual toolbar control (defined before ButtonGroup for index injection)
// ---------------------------------------------------------------------------

type NdlToolbarButtonProps = {
    /**
     * Zero-based position of this button within the toolbar.
     * Automatically assigned when used inside NdlToolbar.ButtonGroup.
     */
    index?: number;
    /**
     * When true, merges props onto the child element instead of rendering a button.
     * Use for links or custom elements: <NdlToolbar.Button asChild><Link href="...">Tab</Link></NdlToolbar.Button>
     */
    asChild?: boolean;
    children: ReactNode;
} & HTMLChakraProps<"button">;

const Button = forwardRef<NdlToolbarButtonProps, "button">((props, ref) => {
    const {
        index: indexProp,
        asChild,
        children,
        className,
        onClick,
        onKeyDown,
        type: _type,
        ...rest
    } = props;
    const ctx = useNdlToolbarContext();
    const { activeIndex, onActiveIndexChange, highlightTextColor, buttonRefs, styles } = ctx;

    const index = indexProp ?? 0;
    const isActive = index === activeIndex;

    const setRef = useCallback(
        (node: HTMLElement | null) => {
            buttonRefs.current[index] = node;
            assignRef(ref, node);
        },
        [ref, buttonRefs, index]
    );

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            onActiveIndexChange(index);
            onClick?.(e as React.MouseEvent<HTMLButtonElement>);
        },
        [onActiveIndexChange, index, onClick]
    );

    const handleKeyDown = useCallback(
        (e: KeyboardEvent<HTMLElement>) => {
            const count = buttonRefs.current.filter(Boolean).length;
            const nextIndex = resolveNextIndex(e.key, activeIndex, count);
            if (nextIndex == null) return;

            e.preventDefault();
            onActiveIndexChange(nextIndex);
            buttonRefs.current[nextIndex]?.focus({ preventScroll: true });
            onKeyDown?.(e as KeyboardEvent<HTMLButtonElement>);
        },
        [activeIndex, onActiveIndexChange, buttonRefs, onKeyDown]
    );

    const sharedProps = {
        ref: setRef,
        "aria-pressed": isActive,
        tabIndex: isActive ? 0 : -1,
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        className: cx("ndl-toolbar__button", className),
        role: "button" as const,
    };

    if (asChild) {
        const child = Children.only(children);
        if (!isValidElement(child)) {
            throw new Error("NdlToolbar.Button asChild expects a single valid React element.");
        }
        const childElement = child as ReactElement<{ className?: string }>;
        const childRef = (childElement as ReactElement & { ref?: React.Ref<HTMLElement> }).ref;
        const childClassName =
            "className" in childElement.props ? childElement.props.className : undefined;
        return cloneElement(childElement, {
            ...childElement.props,
            ref: mergeRefs(setRef, childRef),
            "aria-pressed": isActive,
            tabIndex: isActive ? 0 : -1,
            role: "button",
            onClick: handleClick,
            onKeyDown: handleKeyDown,
            className: cx("ndl-toolbar__button", className, childClassName),
        } as Record<string, unknown>);
    }

    return (
        <chakra.button
            {...sharedProps}
            type="button"
            __css={styles.button}
            color={isActive ? highlightTextColor : undefined}
            {...(rest as HTMLChakraProps<"button">)}
        >
            {children}
        </chakra.button>
    );
});

Button.displayName = "NdlToolbar.Button";

// ---------------------------------------------------------------------------
// ButtonGroup — frosted-glass pill with role="toolbar"
// ---------------------------------------------------------------------------

type NdlToolbarButtonGroupProps = {
    children: ReactNode;
    "aria-label": string;
} & Omit<HTMLChakraProps<"div">, "aria-label">;

const ButtonGroup = forwardRef<NdlToolbarButtonGroupProps, "div">((props, ref) => {
    const { children, className, ...rest } = props;
    const { styles } = useNdlToolbarContext();

    let buttonIndex = 0;
    const processedChildren = Children.map(children, (child) => {
        if (isValidElement(child) && child.type === Button) {
            return cloneElement(child, { ...child.props, index: buttonIndex++ });
        }
        return child;
    });

    return (
        <chakra.div
            ref={ref}
            role="toolbar"
            aria-orientation="horizontal"
            __css={styles.buttonGroup}
            className={cx("ndl-toolbar__button-group", className)}
            {...rest}
        >
            {processedChildren}
        </chakra.div>
    );
});

ButtonGroup.displayName = "NdlToolbar.ButtonGroup";

// ---------------------------------------------------------------------------
// Indicator — sliding highlight
// ---------------------------------------------------------------------------

type NdlToolbarIndicatorProps = HTMLChakraProps<"span">;

const Indicator = forwardRef<NdlToolbarIndicatorProps, "span">((props, ref) => {
    const { className, ...rest } = props;
    const { indicatorRef, styles } = useNdlToolbarContext();

    const setRef = useCallback(
        (node: HTMLSpanElement | null) => {
            (indicatorRef as React.MutableRefObject<HTMLSpanElement | null>).current = node;
            assignRef(ref, node);
        },
        [ref, indicatorRef]
    );

    return (
        <chakra.span
            ref={setRef}
            aria-hidden="true"
            __css={styles.indicator}
            className={cx("ndl-toolbar__indicator", className)}
            {...rest}
        />
    );
});

Indicator.displayName = "NdlToolbar.Indicator";

// ---------------------------------------------------------------------------
// Compound namespace export
// ---------------------------------------------------------------------------

const NdlToolbar = { Root, ButtonGroup, Indicator, Button };

export { NdlToolbar };
export type {
    NdlToolbarRootProps,
    NdlToolbarButtonGroupProps,
    NdlToolbarIndicatorProps,
    NdlToolbarButtonProps,
};
