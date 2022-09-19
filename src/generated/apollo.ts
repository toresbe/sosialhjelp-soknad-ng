import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { graphql, ResponseResolver, GraphQLRequest, GraphQLContext } from 'msw'
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  opprettSoknad: Soknad;
  setTelefonnummer: Soknad;
};


export type MutationSetTelefonnummerArgs = {
  id: Scalars['ID'];
  tlfnr?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  soknad?: Maybe<Soknad>;
};


export type QuerySoknadArgs = {
  id: Scalars['ID'];
};

export type Soknad = {
  __typename?: 'Soknad';
  id: Scalars['ID'];
  telefon: TelefonData;
};

export type TelefonData = {
  __typename?: 'TelefonData';
  brukerdefinert?: Maybe<Scalars['String']>;
  fraKrr?: Maybe<Scalars['String']>;
};

export type OpprettSoknadMutationVariables = Exact<{ [key: string]: never; }>;


export type OpprettSoknadMutation = { __typename?: 'Mutation', opprettSoknad: { __typename?: 'Soknad', id: string } };

export type GetSoknadQueryVariables = Exact<{
  soknadId: Scalars['ID'];
}>;


export type GetSoknadQuery = { __typename?: 'Query', soknad?: { __typename?: 'Soknad', id: string, telefon: { __typename?: 'TelefonData', fraKrr?: string | null, brukerdefinert?: string | null } } | null };

export type SetTelefonnummerMutationVariables = Exact<{
  soknadId: Scalars['ID'];
  tlfNr?: InputMaybe<Scalars['String']>;
}>;


export type SetTelefonnummerMutation = { __typename?: 'Mutation', setTelefonnummer: { __typename?: 'Soknad', telefon: { __typename?: 'TelefonData', brukerdefinert?: string | null } } };


export const OpprettSoknadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OpprettSoknad"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"opprettSoknad"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<OpprettSoknadMutation, OpprettSoknadMutationVariables>;
export const GetSoknadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSoknad"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"soknadId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"soknad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"soknadId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"telefon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fraKrr"}},{"kind":"Field","name":{"kind":"Name","value":"brukerdefinert"}}]}}]}}]}}]} as unknown as DocumentNode<GetSoknadQuery, GetSoknadQueryVariables>;
export const SetTelefonnummerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetTelefonnummer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"soknadId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tlfNr"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setTelefonnummer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"soknadId"}}},{"kind":"Argument","name":{"kind":"Name","value":"tlfnr"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tlfNr"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"telefon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brukerdefinert"}}]}}]}}]}}]} as unknown as DocumentNode<SetTelefonnummerMutation, SetTelefonnummerMutationVariables>;

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockOpprettSoknadMutation((req, res, ctx) => {
 *   return res(
 *     ctx.data({ opprettSoknad })
 *   )
 * })
 */
export const mockOpprettSoknadMutation = (resolver: ResponseResolver<GraphQLRequest<OpprettSoknadMutationVariables>, GraphQLContext<OpprettSoknadMutation>, any>) =>
  graphql.mutation<OpprettSoknadMutation, OpprettSoknadMutationVariables>(
    'OpprettSoknad',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetSoknadQuery((req, res, ctx) => {
 *   const { soknadId } = req.variables;
 *   return res(
 *     ctx.data({ soknad })
 *   )
 * })
 */
export const mockGetSoknadQuery = (resolver: ResponseResolver<GraphQLRequest<GetSoknadQueryVariables>, GraphQLContext<GetSoknadQuery>, any>) =>
  graphql.query<GetSoknadQuery, GetSoknadQueryVariables>(
    'getSoknad',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSetTelefonnummerMutation((req, res, ctx) => {
 *   const { soknadId, tlfNr } = req.variables;
 *   return res(
 *     ctx.data({ setTelefonnummer })
 *   )
 * })
 */
export const mockSetTelefonnummerMutation = (resolver: ResponseResolver<GraphQLRequest<SetTelefonnummerMutationVariables>, GraphQLContext<SetTelefonnummerMutation>, any>) =>
  graphql.mutation<SetTelefonnummerMutation, SetTelefonnummerMutationVariables>(
    'SetTelefonnummer',
    resolver
  )
