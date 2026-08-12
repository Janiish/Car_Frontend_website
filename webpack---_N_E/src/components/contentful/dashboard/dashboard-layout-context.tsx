import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

const measureElementIds = {
    "m-left-top-left-card": "m-left-top-left-card",
    "m-left-top-right-card": "m-left-top-right-card",
    "m-left-bottom-card": "m-left-bottom-card",
    "m-center-card": "m-center-card",
    "m-right-top-left-card": "m-right-top-left-card",
    "m-right-top-right-card": "m-right-top-right-card",
    "m-right-bottom-card": "m-right-bottom-card",
    "widget-launcher": "widget-launcher",
} as const;

type LayoutItem = {
    width: number | null;
    height: number | null;
    x: number | null;
    y: number | null;
};

type LayoutState = Record<keyof typeof measureElementIds, LayoutItem>;

type DashboardLayoutContextValue = {
    layout: LayoutState;
    layoutReady: boolean;
    canAnimate: boolean;
    updateLayout: () => void;
    setCanAnimate: (canAnimate: boolean) => void;
};

const initialLayout: LayoutState = {
    "m-left-top-left-card": { width: null, height: null, x: null, y: null },
    "m-left-top-right-card": { width: null, height: null, x: null, y: null },
    "m-left-bottom-card": { width: null, height: null, x: null, y: null },
    "m-center-card": { width: null, height: null, x: null, y: null },
    "m-right-top-left-card": { width: null, height: null, x: null, y: null },
    "m-right-top-right-card": { width: null, height: null, x: null, y: null },
    "m-right-bottom-card": { width: null, height: null, x: null, y: null },
    "widget-launcher": { width: null, height: null, x: null, y: null },
} as const;
const measureGridLayout = (): LayoutState => {
    const { "widget-launcher": widgetLauncherId, ...cardElementIds } = measureElementIds;
    const layout = { ...initialLayout };

    const widgetLauncherElement = document.getElementById(widgetLauncherId);

    if (!widgetLauncherElement) {
        if (process.env.NODE_ENV === "development") {
            window.console.error(
                "Dashboard Layout Context: Widget Launcher element not found, unable to measure layout."
            );
        }
        return layout;
    }

    // Get the widget launcher's position in viewport coordinates
    const widgetLauncherRect = widgetLauncherElement?.getBoundingClientRect();
    const widgetLauncherX = widgetLauncherRect?.x ?? 0;
    const widgetLauncherY = widgetLauncherRect?.y ?? 0;

    layout["widget-launcher"] = {
        width: Math.round(widgetLauncherRect?.width ?? 0),
        height: Math.round(widgetLauncherRect?.height ?? 0),
        x: Math.round(widgetLauncherX),
        y: Math.round(widgetLauncherY),
    };

    // Measure each grid cell and store both viewport position and widget-launcher relative position
    Object.entries(cardElementIds).forEach(([key, value]) => {
        const element = document.getElementById(value);

        if (element) {
            const rect = element.getBoundingClientRect();

            // Grid cell dimensions and viewport position
            const gridWidth = Math.round(rect.width);
            const gridHeight = Math.round(rect.height);
            const gridX = Math.round(rect.x);
            const gridY = Math.round(rect.y);

            layout[key as keyof LayoutState] = {
                width: gridWidth,
                height: gridHeight,
                x: gridX, // Grid cell X in viewport (for fixed positioning)
                y: gridY, // Grid cell Y in viewport (for fixed positioning)
                // Store widget-launcher relative position in a way we can access it
                // We'll use the layout to calculate: widgetLauncherX = gridX + relativeX
            };
        }
    });

    return layout;
};

const DashboardLayoutContext = createContext<DashboardLayoutContextValue>({
    layout: initialLayout,
    updateLayout: () => {
        // No-op default
    },
    layoutReady: false,
    canAnimate: false,
    setCanAnimate: () => {
        // No-op default
    },
});

const DashboardLayoutProvider = ({ children }: { children: ReactNode }) => {
    const [layout, setLayout] = useState<LayoutState>(initialLayout);
    const [layoutReady, setLayoutReady] = useState(false);
    const [canAnimate, setCanAnimate] = useState(false);

    const updateLayout = useCallback(() => {
        const newLayout = measureGridLayout();

        setLayout(newLayout);
        setLayoutReady(true);
    }, []);

    useEffect(() => {
        if (!canAnimate) return;

        const debounce = (func: () => void, delay: number) => {
            let timeoutId: number;
            return () => {
                clearTimeout(timeoutId);
                timeoutId = window.setTimeout(func, delay);
            };
        };

        const debouncedUpdateLayout = debounce(() => {
            const newLayout = measureGridLayout();

            setLayout(newLayout);
            setLayoutReady(true);
        }, 0);

        const resizeObserver = new ResizeObserver(debouncedUpdateLayout);
        resizeObserver.observe(document.documentElement);

        window.addEventListener("scroll", debouncedUpdateLayout, { passive: true });

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("scroll", debouncedUpdateLayout);
        };
    }, [canAnimate]);

    const contextValue = useMemo(
        () => ({
            layout,
            updateLayout,
            layoutReady,
            canAnimate,
            setCanAnimate,
        }),
        [layout, updateLayout, layoutReady, canAnimate, setCanAnimate]
    );

    return (
        <DashboardLayoutContext.Provider value={contextValue}>
            {children}
        </DashboardLayoutContext.Provider>
    );
};

DashboardLayoutProvider.displayName = "DashboardLayoutProvider";

const useDashboardLayout = () => {
    const context = useContext(DashboardLayoutContext);

    if (!context) {
        throw new Error("useDashboardLayout must be used within a DashboardLayoutProvider");
    }

    return context;
};

export { DashboardLayoutProvider, useDashboardLayout, measureElementIds };
