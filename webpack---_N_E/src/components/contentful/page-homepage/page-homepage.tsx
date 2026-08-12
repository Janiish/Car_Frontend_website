import { ModuleRenderer } from "@/lib/contentful/modules/ModuleRenderer";
import type { PageHomepageFieldsFragment } from "@/components/contentful/page-homepage/__generated/page-homepage.contentful.generated";
import { HeroMediaBg } from "@/components/hero-layouts/hero-media-bg";
import { IntroContent } from "@/components/intro-content";
import { DashboardContentWrapper } from "@/components/contentful/dashboard/dashboard-content-wrapper";

type PageHomepageProps = PageHomepageFieldsFragment;

export const PageHomepage = (props: PageHomepageProps) => {
    const { modulesCollection, ...restProps } = props;

    return (
        <section>
            <DashboardContentWrapper>
                <HeroMediaBg {...restProps} />
            </DashboardContentWrapper>
            <IntroContent {...restProps} />
            {modulesCollection?.items.map(
                (module, index) =>
                    module && (
                        <ModuleRenderer
                            componentProps={module}
                            key={module.sys.id + crypto.randomUUID()}
                            index={index}
                        />
                    )
            )}
        </section>
    );
};
