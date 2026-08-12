export const getUcPrivacyShield = () => {
    if (typeof window !== "undefined" && window.ucPrivacyShield) {
        return window.ucPrivacyShield as {
            checkConsent: (params: {
                mapContainer: HTMLElement | HTMLElement[];
                processorId: string;
                timeoutVar: unknown;
                callbacks: {
                    success: () => void;
                    p: undefined;
                };
            }) => void;
        };
    }
    return null;
};

export const getUsercentrics = () => {
    if (typeof window !== "undefined" && window.usercentrics) {
        return window.usercentrics as {
            toggleCenteredModalIsVisible: (show: boolean) => void;
            toggleConsentInfoModalIsVisible: (show: boolean) => void;
        };
    }
    return null;
};
