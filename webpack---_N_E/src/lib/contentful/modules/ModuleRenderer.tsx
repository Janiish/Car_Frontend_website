import { useMemo } from "react";
import type { ReactNode } from "react";
import { componentMap, componentMapGraphql } from "@/lib/contentful/modules/component-map";
import { useRouter } from "next/router";

type ComponentKey = keyof typeof componentMap;

interface ModuleRendererProps {
    componentProps: {
        sys: { id: string };
        __typename: string;
        isEmbedded?: boolean;
        isWidget?: boolean;
        [k: string]: unknown;
    };
    index?: number;
    [k: string]: unknown;

    forceGraphql?: boolean;
}

let previousComponent: string | null = null;

export const ModuleError = (props: { children: ReactNode }) => <div {...props} />;

const ModuleInvalid = ({
    type,
    previousType,
}: {
    type?: ComponentKey;
    previousType?: ComponentKey;
}) => {
    if (process.env.NODE_ENV === "production") {
        return null;
    }

    if (!type) {
        return (
            <ModuleError>
                <pre>
                    Missing Contentful Data for <strong>Unknown Contentful Module</strong>.
                </pre>
                <pre>
                    Previous module: <em>{previousType ?? "Unknown Contentful Module"}</em>.
                </pre>
            </ModuleError>
        );
    }

    return (
        <ModuleError>
            <pre>
                Missing Contentful Data for Contentful Module: <code>{type}</code> (missing sys.id
                and/or __typename)
            </pre>
        </ModuleError>
    );
};

const ModuleNotFound = ({ type }: { type: ComponentKey }) => {
    if (process.env.NODE_ENV === "production") {
        return null;
    }

    return (
        <ModuleError>
            <div>
                Missing React implementation of Contentful Module: <code>{type}</code>
            </div>
        </ModuleError>
    );
};

export const ModuleRenderer = ({ componentProps, forceGraphql, index }: ModuleRendererProps) => {
    const { isPreview: preview, locale } = useRouter();

    const __typeName = componentProps.__typename;

    const ComponentGraphQL = componentMapGraphql[__typeName];

    const shouldForceGraphql = useMemo(() => {
        if (forceGraphql) {
            return true;
        }

        if (!ComponentGraphQL) {
            return false;
        }

        return !(componentProps.__typename === undefined || componentProps.sys === undefined);
    }, [ComponentGraphQL, componentProps, forceGraphql]);

    const Component = !shouldForceGraphql && componentMap[componentProps.__typename];

    previousComponent = String(componentProps.__typename);

    if (!Component && !ComponentGraphQL) {
        return <ModuleNotFound type={__typeName} />;
    }

    if (componentProps.__typename === undefined || componentProps.sys === undefined) {
        return <ModuleInvalid type={__typeName} previousType={previousComponent} />;
    }

    return Component ? (
        <Component
            {...componentProps}
            data-contentful-module={componentProps.__typename}
            index={index}
        />
    ) : (
        <ComponentGraphQL
            {...componentProps}
            id={componentProps.sys.id}
            locale={locale!}
            preview={preview}
            index={index}
            data-contentful-module={componentProps.__typename}
        />
    );
};
