import type { Dispatch, ReactNode } from "react";
import { useEffect, useContext, createContext, useReducer } from "react";

type State = {
    siteSettingsId: string;
    footerId: string | undefined | null;
    mainNavigationId: string | undefined | null;
    partnerSetId: string | undefined | null;
    pageId: string;
    pageType: string;
    pagePresentation: string | null;
    hasLiveTicker: boolean;
    pageContentTags?: string[];
    dashboardId?: string | null;
    isDashboardOpen?: boolean;
    localeSlugMap?: Record<string, string>;
};

type Action =
    | { type: "SET_LIVE_TICKER"; payload: boolean }
    | { type: "SET_IS_DASHBOARD_OPEN"; payload: boolean }
    | { type: "UPDATE_FROM_PROPS"; payload: State };

const initialState: State = {
    siteSettingsId: "",
    footerId: null,
    mainNavigationId: null,
    partnerSetId: null,
    pageId: "",
    pageType: "",
    pagePresentation: null,
    hasLiveTicker: false,
    pageContentTags: [],
    dashboardId: null,
    isDashboardOpen: false,
};

const AppStoreContext = createContext<
    { state: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

const { Provider: AppStoreProvider } = AppStoreContext;

const appStoreReducer = (state: State, action: Action): State => {
    // eslint-disable-next-line sonarjs/no-small-switch
    switch (action.type) {
        case "SET_LIVE_TICKER":
            return {
                ...state,
                hasLiveTicker: action.payload,
            };
        case "SET_IS_DASHBOARD_OPEN":
            return {
                ...state,
                isDashboardOpen: action.payload,
            };
        case "UPDATE_FROM_PROPS":
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

const AppStoreProviderWrapper = ({
    stateFromProps,
    children,
}: {
    stateFromProps: State;
    children: ReactNode;
}) => {
    const [state, dispatch] = useReducer(appStoreReducer, { ...initialState, ...stateFromProps });

    useEffect(() => {
        updateFromProps(dispatch, stateFromProps);
    }, [stateFromProps]);

    return <AppStoreProvider value={{ state, dispatch }}>{children}</AppStoreProvider>;
};

const useAppStore = () => {
    const context = useContext(AppStoreContext);

    if (context === undefined) {
        throw new Error("useAppStore must be used within an AppStoreProvider");
    }

    return context;
};

const useIsDashboardOpen = () => useAppStore().state.isDashboardOpen;

const setLiveTicker = (dispatch: Dispatch<Action>, value: boolean) => {
    dispatch({ type: "SET_LIVE_TICKER", payload: value });
};

const setIsDashboardOpen = (dispatch: Dispatch<Action>, value: boolean) => {
    dispatch({ type: "SET_IS_DASHBOARD_OPEN", payload: value });
};

const updateFromProps = (dispatch: Dispatch<Action>, value: State) => {
    dispatch({ type: "UPDATE_FROM_PROPS", payload: value });
};

export {
    AppStoreProviderWrapper as AppStoreProvider,
    useAppStore,
    useIsDashboardOpen,
    setLiveTicker,
    setIsDashboardOpen,
};
