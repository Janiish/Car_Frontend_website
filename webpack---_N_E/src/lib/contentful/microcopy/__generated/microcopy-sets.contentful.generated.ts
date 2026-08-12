import * as Types from '../../__generated/graphql.types';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { customFetcher } from '@/lib/contentful/fetch-config';
export type MicrocopyFieldsFragment = { __typename: 'Microcopy', key?: string | null, valueZero?: string | null, valueOne?: string | null, valueTwo?: string | null, valueFew?: string | null, valueMany?: string | null, valueOther?: string | null, sys: { __typename?: 'Sys', id: string } };

export type MicrocopySetFieldsFragment = { __typename: 'MicrocopySet', key?: string | null, sys: { __typename?: 'Sys', id: string }, microcopyCollection?: { __typename?: 'MicrocopySetMicrocopyCollection', items: Array<(
      { __typename?: 'Microcopy' }
      & MicrocopyFieldsFragment
    ) | null> } | null };

export type MicrocopySetsWithKeysQueryVariables = Types.Exact<{
  keys: Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input'];
  locale: Types.Scalars['String']['input'];
  preview: Types.Scalars['Boolean']['input'];
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type MicrocopySetsWithKeysQuery = { __typename?: 'Query', microcopySetCollection?: { __typename?: 'MicrocopySetCollection', items: Array<(
      { __typename?: 'MicrocopySet' }
      & MicrocopySetFieldsFragment
    ) | null> } | null };


export const MicrocopyFieldsFragmentDoc = `
    fragment MicrocopyFields on Microcopy {
  sys {
    id
  }
  __typename
  key
  valueZero
  valueOne
  valueTwo
  valueFew
  valueMany
  valueOther
}
    `;
export const MicrocopySetFieldsFragmentDoc = `
    fragment MicrocopySetFields on MicrocopySet {
  sys {
    id
  }
  __typename
  key
  microcopyCollection(limit: 50) {
    items {
      ...MicrocopyFields
    }
  }
}
    `;
export const MicrocopySetsWithKeysDocument = `
    query MicrocopySetsWithKeys($keys: [String!]!, $locale: String!, $preview: Boolean!, $limit: Int = 10) {
  microcopySetCollection(
    where: {key_in: $keys}
    locale: $locale
    preview: $preview
    limit: $limit
  ) {
    items {
      ...MicrocopySetFields
    }
  }
}
    ${MicrocopySetFieldsFragmentDoc}
${MicrocopyFieldsFragmentDoc}`;

export const useMicrocopySetsWithKeysQuery = <
      TData = MicrocopySetsWithKeysQuery,
      TError = unknown
    >(
      variables: MicrocopySetsWithKeysQueryVariables,
      options?: Omit<UseQueryOptions<MicrocopySetsWithKeysQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<MicrocopySetsWithKeysQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<MicrocopySetsWithKeysQuery, TError, TData>(
      {
    queryKey: ['MicrocopySetsWithKeys', variables],
    queryFn: customFetcher<MicrocopySetsWithKeysQuery, MicrocopySetsWithKeysQueryVariables>(MicrocopySetsWithKeysDocument, variables),
    ...options
  }
    )};

useMicrocopySetsWithKeysQuery.getKey = (variables: MicrocopySetsWithKeysQueryVariables) => ['MicrocopySetsWithKeys', variables];


useMicrocopySetsWithKeysQuery.fetcher = (variables: MicrocopySetsWithKeysQueryVariables, options?: RequestInit['headers']) => customFetcher<MicrocopySetsWithKeysQuery, MicrocopySetsWithKeysQueryVariables>(MicrocopySetsWithKeysDocument, variables, options);
