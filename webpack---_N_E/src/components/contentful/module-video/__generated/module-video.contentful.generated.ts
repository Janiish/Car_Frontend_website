import * as Types from '../../../../lib/contentful/__generated/graphql.types';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { customFetcher } from '@/lib/contentful/fetch-config';
export type ModuleVideoFieldsFragment = { __typename: 'ModuleVideo', title?: string | null, description?: string | null, mediaAsset?: any | null, youtubeUrl?: string | null, autoplay?: boolean | null, sys: { __typename?: 'Sys', id: string } };

export type ModuleVideoQueryVariables = Types.Exact<{
  locale: Types.Scalars['String']['input'];
  preview: Types.Scalars['Boolean']['input'];
  id: Types.Scalars['String']['input'];
}>;


export type ModuleVideoQuery = { __typename?: 'Query', moduleVideo?: (
    { __typename?: 'ModuleVideo' }
    & ModuleVideoFieldsFragment
  ) | null };


export const ModuleVideoFieldsFragmentDoc = `
    fragment ModuleVideoFields on ModuleVideo {
  __typename
  sys {
    id
  }
  title
  description
  mediaAsset
  youtubeUrl
  autoplay
}
    `;
export const ModuleVideoDocument = `
    query ModuleVideo($locale: String!, $preview: Boolean!, $id: String!) {
  moduleVideo(id: $id, locale: $locale, preview: $preview) {
    ...ModuleVideoFields
  }
}
    ${ModuleVideoFieldsFragmentDoc}`;

export const useModuleVideoQuery = <
      TData = ModuleVideoQuery,
      TError = unknown
    >(
      variables: ModuleVideoQueryVariables,
      options?: Omit<UseQueryOptions<ModuleVideoQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ModuleVideoQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ModuleVideoQuery, TError, TData>(
      {
    queryKey: ['ModuleVideo', variables],
    queryFn: customFetcher<ModuleVideoQuery, ModuleVideoQueryVariables>(ModuleVideoDocument, variables),
    ...options
  }
    )};

useModuleVideoQuery.getKey = (variables: ModuleVideoQueryVariables) => ['ModuleVideo', variables];


useModuleVideoQuery.fetcher = (variables: ModuleVideoQueryVariables, options?: RequestInit['headers']) => customFetcher<ModuleVideoQuery, ModuleVideoQueryVariables>(ModuleVideoDocument, variables, options);
