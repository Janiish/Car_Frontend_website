import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { FetchMicrocopySetsResults } from "@/lib/contentful/microcopy/fetch-microcopy-sets";
import { get, getAsPluralised } from "@/lib/contentful/microcopy/microcopy";
import { useRouter } from "next/router";
import { type MicrocopySetFieldsFragment } from "../__generated/graphql.types";
import { AiTagCopyProvider } from "@project/ui";
import { resolveAiTagCopy } from "@/components/ai-tag/ai-microcopy";

export type MicrocopyInputType =
    | null
    | ({
          __typename?: "MicrocopySet";
      } & MicrocopySetFieldsFragment);

export type MicrocopyContextState = FetchMicrocopySetsResults;

export interface MicrocopyContextAPI {
    add: (microcopySet: MicrocopyInputType) => void;
    get: (microcopySetKey: string, microcopyKey: string) => string;
    getAsPluralised: (
        microcopySetKey: string,
        microcopyKey: string,
        count: number,
        locale?: string,
        options?: Intl.PluralRulesOptions
    ) => string;
}

const MicrocopyContext = createContext<MicrocopyContextState | undefined>(undefined);

type MicrocopyProviderProps = {
    value: MicrocopyContextState;
    children: ReactNode;
};

const MicrocopyProvider = ({ value, children }: MicrocopyProviderProps) => {
    const aiTagCopy = useMemo(() => resolveAiTagCopy(value), [value]);

    return (
        <MicrocopyContext.Provider value={value}>
            <AiTagCopyProvider overrides={aiTagCopy}>{children}</AiTagCopyProvider>
        </MicrocopyContext.Provider>
    );
};

const useMicrocopy = (): MicrocopyContextAPI => {
    const context = useContext(MicrocopyContext);
    const { locale: routerLocale } = useRouter();

    if (context === undefined) {
        throw new Error("useMicrocopy must be used within MicrocopyProvider");
    }

    return {
        add: (microcopySet: MicrocopyInputType) => {
            if (!microcopySet?.key) return;
            context[microcopySet.key] = microcopySet.microcopyCollection?.items;
        },
        get: (microcopySetKey, microcopyKey) => get(context, microcopySetKey, microcopyKey),
        getAsPluralised: (microcopySetKey, microcopyKey, count, locale, options) =>
            getAsPluralised(
                context,
                microcopySetKey,
                microcopyKey,
                locale ?? routerLocale!,
                count,
                options
            ),
    };
};

export { MicrocopyContext, MicrocopyProvider, useMicrocopy };
