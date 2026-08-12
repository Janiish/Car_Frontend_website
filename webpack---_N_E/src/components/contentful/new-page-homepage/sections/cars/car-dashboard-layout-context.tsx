import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from "react";

const measureElementIds = {
    "m-left-card": "m-left-card",
    "m-right-top-card": "m-right-top-card",
    "m-right-bottom-left-card": "m-right-bottom-left-card",
    "m-right-bottom-right-card": "m-right-bottom-right-card",
    "widget-launcher": "car-widget-launcher",
} as const;

type LayoutItem = {
    width: number | null;
    height: number | null;
    x: number | null;
    y: number | null;
};

type LayoutState = Record<keyof typeof measureElementIds, LayoutItem>;

type CarDashboardLayoutState = {
    layout: LayoutState;
    layoutReady: boolean;
};

type CarDashboardViewState = {
    canAnimate: boolean;
    isInView: boolean;
};

type CarDashboardLayoutActions = {
    updateLayout: () => void;
    setCanAnimate: (canAnimate: boolean) => void;
    setIsDashboardOpen: (isDashboardOpen: boolean) => void;
    setIsInView: (isInView: boolean) => void;
};

type CarDashboardLayoutContextValue = CarDashboardLayoutState &
    CarDashboardViewState & { isDashboardOpen: boolean } & CarDashboardLayoutActions;

const initialLayout: LayoutState = {
    "m-left-card": { width: null, height: null, x: null, y: null },
    "m-right-top-card": { width: null, height: null, x: null, y: null },
    "m-right-bottom-left-card": { width: null, height: null, x: null, y: null },
    "m-right-bottom-right-card": { width: null, height: null, x: null, y: null },
    "widget-launcher": { width: null, height: null, x: null, y: null },
} as const;

const isLayoutEqual = (a: LayoutState, b: LayoutState): boolean => {
    for (const key of Object.keys(a) as (keyof LayoutState)[]) {
        const itemA = a[key];
        const itemB = b[key];
        if (
            itemA.width !== itemB.width ||
            itemA.height !== itemB.height ||
            itemA.x !== itemB.x ||
            itemA.y !== itemB.y
        ) {
            return false;
        }
    }
    return true;
};

const elementCache = new Map<string, HTMLElement>();

function getCachedElement(id: string): HTMLElement | null {
    let el = elementCache.get(id);
    if (el?.isConnected) return el;
    el = document.getElementById(id) ?? undefined;
    if (el) elementCache.set(id, el);
    return el ?? null;
}

const measureGridLayout = (): LayoutState => {
    const { "widget-launcher": widgetLauncherId, ...cardElementIds } = measureElementIds;
    const layout = { ...initialLayout };

    const widgetLauncherElement = getCachedElement(widgetLauncherId);

    if (!widgetLauncherElement) {
        if (process.env.NODE_ENV === "development") {
            window.console.error(
                "Car Dashboard Layout Context: Widget Launcher element not found, unable to measure layout."
            );
        }
        return layout;
    }

    const cardEntries = Object.entries(cardElementIds).map(([key, value]) => ({
        key,
        element: getCachedElement(value),
    }));

    // Batch all getBoundingClientRect reads before any processing to avoid layout thrashing.
    const widgetLauncherRect = widgetLauncherElement.getBoundingClientRect();
    const cardRects = cardEntries.map(({ key, element }) => ({
        key,
        rect: element ? element.getBoundingClientRect() : null,
    }));

    layout["widget-launcher"] = {
        width: Math.round(widgetLauncherRect.width ?? 0),
        height: Math.round(widgetLauncherRect.height ?? 0),
        x: Math.round(widgetLauncherRect.x ?? 0),
        y: Math.round(widgetLauncherRect.y ?? 0),
    };

    for (const { key, rect } of cardRects) {
        if (rect) {
            layout[key as keyof LayoutState] = {
                width: Math.round(rect.width),
                height: Math.round(rect.height),
                x: Math.round(rect.x),
                y: Math.round(rect.y),
            };
        }
    }

    return layout;
};

const CarDashboardLayoutStateContext = createContext<CarDashboardLayoutState | null>(null);
const CarDashboardViewStateContext = createContext<CarDashboardViewState | null>(null);
const CarDashboardLayoutActionsContext = createContext<CarDashboardLayoutActions | null>(null);
const CarDashboardOpenContext = createContext<boolean>(false);

const CarDashboardLayoutProvider = ({ children }: { children: ReactNode }) => {
    const [layout, setLayout] = useState<LayoutState>(initialLayout);
    const [layoutReady, setLayoutReady] = useState(false);
    const [canAnimate, setCanAnimate] = useState(false);
    const [isDashboardOpen, setIsDashboardOpen] = useState(false);
    const [isInView, setIsInView] = useState(false);

    const isDashboardOpenRef = useRef(isDashboardOpen);
    const isInViewRef = useRef(isInView);
    isDashboardOpenRef.current = isDashboardOpen;
    isInViewRef.current = isInView;

    const applyLayout = useCallback((newLayout: LayoutState) => {
        setLayout((prev) => (isLayoutEqual(prev, newLayout) ? prev : newLayout));
        setLayoutReady(true);
    }, []);

    const updateLayout = useCallback(() => {
        applyLayout(measureGridLayout());
    }, [applyLayout]);

    useEffect(() => {
        if (isInView || isDashboardOpen) {
            updateLayout();
        }
    }, [isInView, isDashboardOpen, updateLayout]);

    useEffect(() => {
        let timeoutId: number | undefined;
        let resizeObserver: ResizeObserver | undefined;

        const measureIfActive = () => {
            if (isDashboardOpenRef.current || isInViewRef.current) {
                requestAnimationFrame(() => applyLayout(measureGridLayout()));
            }
        };

        const debouncedUpdateLayout = () => {
            clearTimeout(timeoutId);
            timeoutId = window.setTimeout(measureIfActive, 0);
        };

        const connectResizeObserver = () => {
            if (resizeObserver) return;
            resizeObserver = new ResizeObserver(debouncedUpdateLayout);
            resizeObserver.observe(document.documentElement);
        };

        const disconnectResizeObserver = () => {
            resizeObserver?.disconnect();
            resizeObserver = undefined;
        };

        const cleanup = () => {
            disconnectResizeObserver();
            clearTimeout(timeoutId);
        };

        const carsSection = document.getElementById("cars");
        if (!carsSection) {
            connectResizeObserver();
            return cleanup;
        }

        const intersectionObserver = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    connectResizeObserver();
                } else {
                    disconnectResizeObserver();
                }
            },
            { rootMargin: "200px" }
        );
        intersectionObserver.observe(carsSection);

        return () => {
            intersectionObserver.disconnect();
            cleanup();
        };
    }, [applyLayout]);

    useEffect(() => {
        return () => {
            elementCache.clear();
        };
    }, []);

    const actionsValue = useMemo<CarDashboardLayoutActions>(
        () => ({
            updateLayout,
            setCanAnimate,
            setIsDashboardOpen,
            setIsInView,
        }),
        [updateLayout]
    );

    const stateValue = useMemo<CarDashboardLayoutState>(
        () => ({
            layout,
            layoutReady,
        }),
        [layout, layoutReady]
    );

    const viewStateValue = useMemo<CarDashboardViewState>(
        () => ({
            canAnimate,
            isInView,
        }),
        [canAnimate, isInView]
    );

    return (
        <CarDashboardLayoutActionsContext.Provider value={actionsValue}>
            <CarDashboardOpenContext.Provider value={isDashboardOpen}>
                <CarDashboardViewStateContext.Provider value={viewStateValue}>
                    <CarDashboardLayoutStateContext.Provider value={stateValue}>
                        {children}
                    </CarDashboardLayoutStateContext.Provider>
                </CarDashboardViewStateContext.Provider>
            </CarDashboardOpenContext.Provider>
        </CarDashboardLayoutActionsContext.Provider>
    );
};

CarDashboardLayoutProvider.displayName = "CarDashboardLayoutProvider";

type CombinedDashboardState = CarDashboardLayoutState &
    CarDashboardViewState & { isDashboardOpen: boolean };

const useCarDashboardLayoutState = (): CombinedDashboardState => {
    const layoutContext = useContext(CarDashboardLayoutStateContext);
    const viewContext = useContext(CarDashboardViewStateContext);
    const isDashboardOpen = useContext(CarDashboardOpenContext);

    if (!layoutContext || !viewContext) {
        throw new Error(
            "useCarDashboardLayoutState must be used within a CarDashboardLayoutProvider"
        );
    }

    return useMemo(
        () => ({ ...layoutContext, ...viewContext, isDashboardOpen }),
        [layoutContext, viewContext, isDashboardOpen]
    );
};

const useCarDashboardViewState = (): CarDashboardViewState => {
    const context = useContext(CarDashboardViewStateContext);

    if (!context) {
        throw new Error(
            "useCarDashboardViewState must be used within a CarDashboardLayoutProvider"
        );
    }

    return context;
};

const useLayoutReady = (): boolean => {
    const context = useContext(CarDashboardLayoutStateContext);

    if (!context) {
        throw new Error("useLayoutReady must be used within a CarDashboardLayoutProvider");
    }

    return context.layoutReady;
};

const useCarDashboardLayoutOnly = (): CarDashboardLayoutState => {
    const context = useContext(CarDashboardLayoutStateContext);

    if (!context) {
        throw new Error(
            "useCarDashboardLayoutOnly must be used within a CarDashboardLayoutProvider"
        );
    }

    return context;
};

const useCarDashboardLayoutActions = (): CarDashboardLayoutActions => {
    const context = useContext(CarDashboardLayoutActionsContext);

    if (!context) {
        throw new Error(
            "useCarDashboardLayoutActions must be used within a CarDashboardLayoutProvider"
        );
    }

    return context;
};

const useCarDashboardLayout = (): CarDashboardLayoutContextValue => {
    return { ...useCarDashboardLayoutState(), ...useCarDashboardLayoutActions() };
};

const useIsDashboardOpen = (): boolean => {
    return useContext(CarDashboardOpenContext);
};

export {
    CarDashboardLayoutProvider,
    useCarDashboardLayout,
    useCarDashboardLayoutState,
    useCarDashboardLayoutOnly,
    useCarDashboardViewState,
    useCarDashboardLayoutActions,
    useIsDashboardOpen,
    useLayoutReady,
    measureElementIds,
};
