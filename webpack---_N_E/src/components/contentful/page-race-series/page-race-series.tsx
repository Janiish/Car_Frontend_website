import { ModuleRenderer } from "@/lib/contentful/modules/ModuleRenderer";
import type { PageRaceSeriesFieldsFragment } from "@/components/contentful/page-race-series/__generated/page-race-series.contentful.generated";
import { IntroContent } from "@/components/intro-content";
import { HeroMediaBg } from "@/components/hero-layouts/hero-media-bg";

type PageRaceSeriesProps = PageRaceSeriesFieldsFragment;

export const PageRaceSeries = (props: PageRaceSeriesProps) => {
    const { modulesCollection, slug, ...restProps } = props;

    return (
        <section>
            <HeroMediaBg {...restProps} />
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
