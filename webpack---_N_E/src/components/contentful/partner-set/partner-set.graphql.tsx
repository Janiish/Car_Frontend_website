import type { CoreGraphqlEntryProps } from "@/types/page";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { usePartnerSetQuery } from "@/components/contentful/partner-set/__generated/partner-set.contentful.generated";
import { PartnerSet } from "@/components/contentful/partner-set/partner-set";

export type PartnerSetGraphqlGraphqlProps = CoreGraphqlEntryProps;

export const PartnerSetGraphql = ({ id, locale, preview }: PartnerSetGraphqlGraphqlProps) => {
    const { data, isLoading } = usePartnerSetQuery(
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

    const partnerSet = useContentfulLiveUpdates(data?.partnerSet, { locale });

    if (isLoading || !partnerSet) {
        return null;
    }

    return <PartnerSet {...partnerSet} />;
};
