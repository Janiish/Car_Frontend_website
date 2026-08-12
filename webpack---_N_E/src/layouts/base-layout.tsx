import type { ReactNode } from "react";
import { useAppStore } from "@/store/app-store";
import { FooterGraphql } from "@/components/contentful/footer/footer.graphql";
import { useRouter } from "next/router";
import { MainNavigationGraphql } from "@/components/contentful/main-navigation/main-navigation.graphql";
import { PorscheVisitorBanner } from "@/components/porsche-visitor-banner";
import { PartnerSetGraphql } from "@/components/contentful/partner-set/partner-set.graphql";

type BaseLayoutProps = {
    children: ReactNode;
};

export const BaseLayout = ({ children }: BaseLayoutProps) => {
    const {
        state: { footerId, mainNavigationId, partnerSetId },
    } = useAppStore();
    const { locale, isPreview } = useRouter();

    return (
        <>
            {mainNavigationId && (
                <MainNavigationGraphql
                    id={mainNavigationId}
                    locale={locale!}
                    preview={Boolean(isPreview)}
                />
            )}
            <main>
                {children}
                <section>
                    <PorscheVisitorBanner />
                    {partnerSetId && (
                        <PartnerSetGraphql
                            id={partnerSetId}
                            locale={locale!}
                            preview={Boolean(isPreview)}
                        />
                    )}
                </section>
                {footerId && (
                    <FooterGraphql id={footerId} locale={locale!} preview={Boolean(isPreview)} />
                )}
            </main>
        </>
    );
};
