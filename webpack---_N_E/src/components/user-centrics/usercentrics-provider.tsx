import type { ReactNode, RefObject } from "react";
import {
    useCallback,
    useMemo,
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import type { ProcessorValue } from "@/components/user-centrics/known-processor-names";
import { useRouter } from "next/router";
import { useSiteSettingsQuery } from "@/lib/contentful/site-settings/__generated/site-settings.contentful.generated";
import { getUcPrivacyShield, getUsercentrics } from "@/components/user-centrics/utils";

const escapeValue = (value: string) => JSON.stringify(value);

function removeStaleUcElements(): void {
    document.querySelectorAll("uc-layer2, uc-layer4").forEach((el) => el.remove());
}

function removeExistingConsentScripts(): void {
    document
        .querySelectorAll<HTMLScriptElement>(
            'script[src*="udg-uc-sdk"], script[src*="cookie.porsche.com"]'
        )
        .forEach((s) => s.remove());
}

/** Injects the ITP Bridge script from cookie.porsche.com. The bridge sets first-party
 *  cookies on .porsche.com to persist consent per settingsId across subdomains.
 *  data-custom-sdk="true" tells it not to load the default CMPv2 — we load the SDK
 *  ourselves after the bridge fires itp_consent_status. */
function injectBridgeScript(cookieSettingsId: string): void {
    const script = document.createElement("script");
    script.src = `https://cookie.porsche.com/?settingsId=${cookieSettingsId}`;
    script.dataset.customSdk = "true";
    script.async = true;
    document.body.appendChild(script);
}

function injectSdkScript(
    cookieSettingsId: string,
    language: string,
    { itp = false, preview = false }: { itp?: boolean; preview?: boolean } = {}
): void {
    const script = document.createElement("script");
    script.id = cookieSettingsId;
    script.src = "https://www.porsche.com/all/usercentrics/udg-uc-sdk.min.js";
    script.dataset.language = language;
    if (itp) script.dataset.itp = "true";
    if (preview) script.dataset.preview = "true";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
}

/** Builds the ucPrivacyShield config object from Contentful siteSettings, falling
 *  back to static defaults for any missing fields. This configures the embedded
 *  content overlay (YouTube/Twitch) — NOT the cookie consent notice. */
function buildUcPrivacyShield(
    siteSettings: {
        privacyShieldBackgroundImage?: { url?: string | null } | null;
        privacyShieldConsentUnavailableText?: string | null;
        privacyShieldHeadline?: string | null;
        privacyShieldBodyText?: string | null;
        privacyShieldConsentButtonLabel?: string | null;
        privacyShieldPrivacyInfoButtonLabel?: string | null;
        privacyShieldPrivacyInfoButtonUrl?: string | null;
    },
    fallback: typeof privacyShieldStaticFallback
) {
    return {
        bgimage: siteSettings.privacyShieldBackgroundImage?.url ?? fallback.bgimage,
        consentunavailable: {
            text: siteSettings.privacyShieldConsentUnavailableText ?? fallback.consentunavailable,
        },
        consentservice: {
            headline: siteSettings.privacyShieldHeadline ?? fallback.consentservice.headline,
            text: siteSettings.privacyShieldBodyText ?? fallback.consentservice.text,
            buttons: {
                consent: {
                    label:
                        siteSettings.privacyShieldConsentButtonLabel ??
                        fallback.consentservice.buttons.consent.label,
                },
                privacy: {
                    label:
                        siteSettings.privacyShieldPrivacyInfoButtonLabel ??
                        fallback.consentservice.buttons.privacy.label,
                    link:
                        siteSettings.privacyShieldPrivacyInfoButtonUrl ??
                        fallback.consentservice.buttons.privacy.link,
                },
            },
        },
    };
}

/** Disconnects a MutationObserver after a short delay, then clears the ref if it
 *  still points to the same observer. The delay lets the outgoing SDK make one
 *  last attempt to recreate its elements before we stop guarding. */
function disconnectObserverAfterDelay(
    observer: MutationObserver,
    observerRef: { current: MutationObserver | null }
): void {
    setTimeout(() => {
        observer.disconnect();
        if (observerRef.current === observer) {
            observerRef.current = null;
        }
    }, 300);
}

/** Creates a MutationObserver that removes any uc-layer2/uc-layer4 elements
 *  whose id does not match the expected settingsId. Used to suppress elements
 *  recreated by the outgoing SDK instance while the new SDK initialises. */
function createStaleElementObserver(cookieSettingsId: string): MutationObserver {
    const observer = new MutationObserver(() => {
        document.querySelectorAll<Element>("uc-layer2, uc-layer4").forEach((el) => {
            if (el.id && el.id !== cookieSettingsId) {
                el.remove();
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return observer;
}

/** Tears down the outgoing SDK's DOM elements and global state so a fresh SDK
 *  can initialise cleanly when the locale (and thus cookieSettingsId) changes. */
function teardownOutgoingSdk(cookieSettingsId: string): MutationObserver {
    removeStaleUcElements();
    window.usercentrics = undefined as unknown;
    return createStaleElementObserver(cookieSettingsId);
}

/** Injects the SDK (with or without the ITP Bridge) and wires up observer cleanup.
 *  On production the bridge is loaded first; outside production the SDK is loaded
 *  directly with data-preview. */
function injectConsentScripts(
    cookieSettingsId: string,
    language: string,
    refs: {
        pendingBridgeReadyRef: { current: (() => void) | null };
        pendingInjectionReadyRef: { current: (() => void) | null };
        staleElementObserverRef: { current: MutationObserver | null };
    },
    localObserver: MutationObserver | null
): void {
    const registerObserverCleanup = () => {
        if (!localObserver) return;
        const handleThisInjectionReady = () => {
            refs.pendingInjectionReadyRef.current = null;
            window.removeEventListener("ucReady", handleThisInjectionReady);
            disconnectObserverAfterDelay(localObserver, refs.staleElementObserverRef);
        };
        refs.pendingInjectionReadyRef.current = handleThisInjectionReady;
        window.addEventListener("ucReady", handleThisInjectionReady);
    };

    const isProd = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

    if (isProd) {
        injectBridgeScript(cookieSettingsId);

        const handleBridgeReady = () => {
            refs.pendingBridgeReadyRef.current = null;
            injectSdkScript(cookieSettingsId, language, { itp: true });
            registerObserverCleanup();
        };

        refs.pendingBridgeReadyRef.current = handleBridgeReady;
        window.addEventListener("itp_consent_status", handleBridgeReady, { once: true });
    } else {
        injectSdkScript(cookieSettingsId, language, { preview: true });
        registerObserverCleanup();
    }
}

/** in the case of missing content from Contentful, the following fallback object is used - we MUST be able to show this privacy shield for legal reasons */
const privacyShieldStaticFallback = {
    bgimage:
        "https://images.ctfassets.net/r1mi7scjbdxh/3ZrpWjGiBvpJufCM0Y85qC/268a8c91cf1343f1e5e4e1efc23a9b76/uc-privacy-shield-background.png",
    consentunavailable:
        "The content required to display this page could not be loaded. If you are using an AdBlocker, please check its settings.",
    consentservice: {
        headline: "Note on data processing",
        text: "We provide content from ###SERVICE### on our website. To view this content, you must agree to data processing by ###SERVICE###.",
        buttons: {
            consent: {
                label: "Agree",
            },
            privacy: {
                label: "Notes on data protection",
                link: "https://www.porsche.com/international/privacy/",
            },
        },
    },
};

type ConsentGivenReference = {
    dataProcessor: string;
    consentStatus: boolean;
    elements: Array<HTMLElement>;
};

type State = {
    isLoaded: boolean;

    consentGiven: Map<ProcessorValue, ConsentGivenReference>;

    checkConsent: (params: {
        mapContainer: Array<RefObject<HTMLElement>>;
        processor: ProcessorValue;
        successCallback: () => void;
    }) => void;

    toggleConsentDialogLayer2: (showDialog: boolean) => void;
    toggleConsentDialogLayer4: (showDialog: boolean) => void;
};

const UsercentricsContext = createContext<State | undefined>(undefined);

type UsercentricsProviderProps = {
    children: ReactNode;
    siteSettingsId: string;
};

const UsercentricsProvider = ({ children, siteSettingsId }: UsercentricsProviderProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [consentGiven, setConsentGiven] = useState<State["consentGiven"]>(new Map());

    const { locale, isPreview } = useRouter();

    const firstPartOfLocale = locale?.split("-")[0];
    const prevCookieSettingsIdRef = useRef<string | null>(null);
    // Watches for stale uc-layer2/uc-layer4 elements recreated by the outgoing SDK
    // (which keeps running in JS memory) and removes them until the new SDK is ready.
    const staleElementObserverRef = useRef<MutationObserver | null>(null);
    // Holds the pending itp_consent_status handler so the useEffect cleanup can remove
    // it if the locale switches again before the bridge fires.
    const pendingBridgeReadyRef = useRef<(() => void) | null>(null);
    // Holds the per-injection ucReady handler so the useEffect cleanup can remove it
    // before the next injection runs, preventing stale handlers from firing.
    const pendingInjectionReadyRef = useRef<(() => void) | null>(null);

    const { error, data } = useSiteSettingsQuery(
        {
            preview: isPreview,
            locale: locale!,
            id: siteSettingsId,
        },
        {
            staleTime: Infinity,
            refetchOnWindowFocus: false,
        }
    );

    useEffect(() => {
        // This persistent listener sets isLoaded on every ucReady, including on locale
        // switches. Observer cleanup is handled by per-injection handlers registered in
        // the main useEffect so that only the correct observer is disconnected.
        const handleUcReady = () => {
            setIsLoaded(true);
        };

        window.addEventListener("ucReady", handleUcReady);

        const handleUsercentricsEvents = (e: CustomEvent) => {
            if (!e.detail?.data) return;

            const { event, name, status } = e.detail.data;

            if (event === "consent_changed") {
                setConsentGiven((prevState) => {
                    const newState = new Map(prevState);

                    const elements = prevState.get(name)?.elements ?? [];

                    newState.set(name, {
                        dataProcessor: name,
                        consentStatus: status,
                        elements,
                    });

                    return newState;
                });
            }
        };

        window.addEventListener("usercentrics-events", handleUsercentricsEvents as EventListener);

        return () => {
            window.removeEventListener("ucReady", handleUcReady);
            window.removeEventListener(
                "usercentrics-events",
                handleUsercentricsEvents as EventListener
            );
        };
    }, []);

    useEffect(() => {
        const cookieSettingsId = data?.siteSettings?.cookieSettingsId;
        if (!cookieSettingsId || !data?.siteSettings) return;

        // Always keep the global config in sync with the current locale
        window.GlobalConsent = window.GlobalConsent || {};
        window.GlobalConsent.Language = [firstPartOfLocale];
        window.GlobalConsent.widgetFallback =
            data.siteSettings.privacyShieldConsentUnavailableText ??
            privacyShieldStaticFallback.consentunavailable;
        // The ucPrivacyShield object configures the embedded content privacy shield —
        // the overlay shown when a user tries to view a YouTube/Twitch embed without
        // having consented to that third-party. It does NOT affect the cookie consent
        // notice; that text is configured in the Usercentrics admin portal per settingsId.
        window.ucPrivacyShield = buildUcPrivacyShield(
            data.siteSettings,
            privacyShieldStaticFallback
        );

        // cookieSettingsId unchanged — nothing to do
        if (prevCookieSettingsIdRef.current === cookieSettingsId) return;

        if (prevCookieSettingsIdRef.current !== null) {
            staleElementObserverRef.current = teardownOutgoingSdk(cookieSettingsId);
        }

        prevCookieSettingsIdRef.current = cookieSettingsId;
        setIsLoaded(false);

        removeExistingConsentScripts();

        injectConsentScripts(
            cookieSettingsId,
            firstPartOfLocale ?? "",
            { pendingBridgeReadyRef, pendingInjectionReadyRef, staleElementObserverRef },
            staleElementObserverRef.current
        );

        return () => {
            if (pendingBridgeReadyRef.current) {
                window.removeEventListener("itp_consent_status", pendingBridgeReadyRef.current);
                pendingBridgeReadyRef.current = null;
            }
            if (pendingInjectionReadyRef.current) {
                window.removeEventListener("ucReady", pendingInjectionReadyRef.current);
                pendingInjectionReadyRef.current = null;
            }
            staleElementObserverRef.current?.disconnect();
            staleElementObserverRef.current = null;
        };
    }, [data?.siteSettings?.cookieSettingsId, firstPartOfLocale, data?.siteSettings]);

    const checkConsent = useCallback(
        ({ mapContainer, processor, successCallback }: Parameters<State["checkConsent"]>[0]) => {
            if (!isLoaded) {
                if (process.env.NODE_ENV === "development") {
                    window.console.error(
                        "`ucPrivacyShield` is not available on the window object yet"
                    );
                }
                return;
            }

            if (!mapContainer && process.env.NODE_ENV === "development") {
                window.console.error("mapContainer is required");
            }

            const ucPrivacyShield = getUcPrivacyShield();

            const _mapContainer = mapContainer
                .map((ref) => ref.current)
                .filter(Boolean) as Array<HTMLElement>;

            if (!ucPrivacyShield?.checkConsent) {
                if (process.env.NODE_ENV === "development") {
                    window.console.error(
                        "`ucPrivacyShield.checkConsent` is not available on the window object"
                    );
                }
                return;
            }

            ucPrivacyShield.checkConsent({
                mapContainer: _mapContainer,
                processorId: processor,
                timeoutVar: {},
                callbacks: {
                    success: () => {
                        setConsentGiven((prevState) => {
                            const newState = new Map(prevState);

                            newState.set(processor, {
                                dataProcessor: processor,
                                consentStatus: true,
                                elements: [
                                    ...(prevState.get(processor)?.elements ?? []),
                                    ..._mapContainer,
                                ],
                            });

                            return newState;
                        });
                        successCallback();
                    },
                    p: undefined,
                },
            });
        },
        [isLoaded]
    );

    const toggleConsentDialogLayer2 = useCallback(
        (showDialog: boolean) => {
            const usercentrics = getUsercentrics();

            if (!isLoaded || !usercentrics) {
                if (process.env.NODE_ENV === "development") {
                    window.console.error(
                        "`usercentrics` is not available on the window object, or the SDK is not loaded"
                    );
                }
                return;
            }

            usercentrics.toggleCenteredModalIsVisible(showDialog);
        },
        [isLoaded]
    );

    const toggleConsentDialogLayer4 = useCallback(
        (showDialog: boolean) => {
            const usercentrics = getUsercentrics();

            if (!isLoaded || !usercentrics) {
                if (process.env.NODE_ENV === "development") {
                    window.console.error(
                        "`usercentrics` is not available on the window object, or the SDK is not loaded"
                    );
                }
                return;
            }

            usercentrics.toggleConsentInfoModalIsVisible(showDialog);
        },
        [isLoaded]
    );

    const value = useMemo<State>(
        () => ({
            isLoaded,
            consentGiven,
            checkConsent,
            toggleConsentDialogLayer2,
            toggleConsentDialogLayer4,
        }),
        [isLoaded, consentGiven, checkConsent, toggleConsentDialogLayer2, toggleConsentDialogLayer4]
    );

    if (error || !data?.siteSettings) {
        return null;
    }

    // Inline script that runs before the Usercentrics SDK loads.
    // Configures GlobalConsent (locale) and ucPrivacyShield (embedded content overlay).
    // The cookie consent notice text is NOT set here — it is fetched by the SDK
    // from the Usercentrics admin portal based on the cookieSettingsId.
    const configScript = `
    var GlobalConsent = GlobalConsent || {};
  	GlobalConsent.Language = ["${firstPartOfLocale}"];

    GlobalConsent.widgetFallback = ${escapeValue(data.siteSettings.privacyShieldConsentUnavailableText ?? privacyShieldStaticFallback.consentunavailable)};

    window.ucPrivacyShield = {
        bgimage: ${escapeValue(data.siteSettings.privacyShieldBackgroundImage?.url ?? privacyShieldStaticFallback.bgimage)},
        consentunavailable: {
            text: ${escapeValue(data.siteSettings.privacyShieldConsentUnavailableText ?? privacyShieldStaticFallback.consentunavailable)}
        },
        consentservice: {
            headline: ${escapeValue(data.siteSettings.privacyShieldHeadline ?? privacyShieldStaticFallback.consentservice.headline)},
            text: ${escapeValue(data.siteSettings.privacyShieldBodyText ?? privacyShieldStaticFallback.consentservice.text)},
            buttons: {
                consent: { label: ${escapeValue(data.siteSettings.privacyShieldConsentButtonLabel ?? privacyShieldStaticFallback.consentservice.buttons.consent.label)} },
                privacy: {
                    label: ${escapeValue(data.siteSettings.privacyShieldPrivacyInfoButtonLabel ?? privacyShieldStaticFallback.consentservice.buttons.privacy.label)},
                    link: ${escapeValue(data.siteSettings.privacyShieldPrivacyInfoButtonUrl ?? privacyShieldStaticFallback.consentservice.buttons.privacy.link)}
                }
            }
        }
    };
  `;

    return (
        <UsercentricsContext.Provider value={value}>
            <script dangerouslySetInnerHTML={{ __html: configScript }} />
            {/* SDK script is injected exclusively by the useEffect above.
                Using a <Script> component here caused a race condition: on locale
                switch React re-rendered with the new cookieSettingsId and added a
                new <Script> element, then our useEffect also tried to add one.
                The <Script> component internally re-inserted the old element when
                ours was removed, causing the en-GB SDK to overwrite the nl SDK and
                show English text regardless of locale. */}
            {children}
        </UsercentricsContext.Provider>
    );
};

const useUsercentrics = () => {
    const context = useContext(UsercentricsContext);
    if (context === undefined) {
        throw new Error("useUsercentrics must be used within a UsercentricsProvider");
    }
    return context;
};

export { UsercentricsProvider, useUsercentrics };
