import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "@contentful/live-preview/style.css";
import "@/styles/scroll-fade.css";
import { useRouter } from "next/router";
import type { CorePageProps, NextPageWithLayout } from "@/types/page";
import { DefaultSeo } from "@/components/contentful/seo-metadata/default-seo";
import { MicrocopyProvider } from "@/lib/contentful/microcopy/microcopy-context";
import { PorscheDesignSystemProvider, theme, ThemeProvider } from "@project/ui";
import { AppStoreProvider } from "@/store/app-store";
import { GoogleTagManagerScript } from "@/lib/google-tag-manager/google-tag-manager-script";
import { UsercentricsProvider } from "@/components/user-centrics/usercentrics-provider";
import { PreviewMode } from "@/components/preview-mode";
import { usePAGMSHGeneralPageLoad } from "@/lib/google-tag-manager/use-pagmsh-general-pageload";

const ReactQueryDevtoolsProduction = lazy(() =>
    import("@tanstack/react-query-devtools/build/modern/production.js").then((d) => ({
        default: d.ReactQueryDevtools,
    }))
);

type AppPropsWithLayout = AppProps<CorePageProps> & {
    Component: NextPageWithLayout;
    pageProps: CorePageProps;
};

/**
 * This change should trigger a Lighthouse report, and a SonarQube report in the pull request.
 */

function PMHApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);
    const { locale, isPreview: preview } = useRouter();

    const [queryClient] = useState(() => new QueryClient());

    const [showDevtools, setShowDevtools] = useState(false);

    useEffect(() => {
        // @ts-expect-error - we are adding a function to the window object, not going to type that
        window.toggleDevtools = () => setShowDevtools((old) => !old);
    }, []);

    const localeForContentful = useMemo(() => {
        if (!locale) {
            return process.env.NEXT_PUBLIC_DEFAULT_LOCALE;
        }

        // ensure the locale is in the correct format for Contentful; uppercase the last two letters
        return locale.replace(/-[a-z]{2}$/, (match) => match.toUpperCase());
    }, [locale]);

    const {
        dehydratedState,
        microcopySets,
        footerId,
        mainNavigationId,
        partnerSetId,
        pageId,
        siteSettingsId,
        pagePresentation,
        pageType,
        hasLiveTicker,
        pageContentTags,
        dashboardId,
        isDashboardOpen,
        localeSlugMap,
    } = pageProps;

    usePAGMSHGeneralPageLoad({
        contentTags: pageContentTags ?? [],
        pageType,
    });

    return (
        <ContentfulLivePreviewProvider
            locale={localeForContentful}
            enableInspectorMode={preview}
            enableLiveUpdates={preview}
        >
            <Head>
                {/* viewport-fit=cover enables env(safe-area-inset-*) on notched devices */}
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, viewport-fit=cover"
                />
            </Head>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                {showDevtools && (
                    <Suspense fallback={null}>
                        <ReactQueryDevtoolsProduction />
                    </Suspense>
                )}

                <HydrationBoundary state={dehydratedState}>
                    <PorscheDesignSystemProvider>
                        <ThemeProvider theme={theme}>
                            <UsercentricsProvider siteSettingsId={siteSettingsId}>
                                <AppStoreProvider
                                    stateFromProps={{
                                        footerId,
                                        mainNavigationId,
                                        partnerSetId,
                                        pageId,
                                        siteSettingsId,
                                        pageType,
                                        pagePresentation,
                                        hasLiveTicker,
                                        dashboardId,
                                        isDashboardOpen,
                                        localeSlugMap,
                                    }}
                                >
                                    <MicrocopyProvider value={microcopySets}>
                                        {preview && <PreviewMode />}

                                        <DefaultSeo siteSettingsId={siteSettingsId} />

                                        {getLayout(<Component {...pageProps} />)}

                                        <GoogleTagManagerScript />
                                        <SpeedInsights />
                                    </MicrocopyProvider>
                                </AppStoreProvider>
                            </UsercentricsProvider>
                        </ThemeProvider>
                    </PorscheDesignSystemProvider>
                </HydrationBoundary>
            </QueryClientProvider>
        </ContentfulLivePreviewProvider>
    );
}

export default PMHApp;
