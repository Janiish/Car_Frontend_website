import type { CoreGraphqlEntryProps } from "@/types/page";
import { useFooterQuery } from "@/components/contentful/footer/__generated/footer.contentful.generated";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { Footer } from "@/components/contentful/footer/footer";

export type FooterGraphqlProps = CoreGraphqlEntryProps;

export const FooterGraphql = ({ id, locale, preview }: FooterGraphqlProps) => {
    const { data, isLoading } = useFooterQuery(
        {
            id,
            locale,
            preview,
        },
        {
            ...(!preview && { staleTime: Infinity }),
            refetchOnWindowFocus: false,
        }
    );

    const footer = useContentfulLiveUpdates(data?.footer, { locale });

    if (isLoading || !footer) {
        return null;
    }

    return <Footer {...footer} />;
};
