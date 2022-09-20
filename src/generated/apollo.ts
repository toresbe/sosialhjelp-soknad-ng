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

export type Navn = {
  __typename?: 'Navn';
  etternavn: Scalars['String'];
  fornavn: Scalars['String'];
  mellomnavn?: Maybe<Scalars['String']>;
};

export type Personalia = {
  __typename?: 'Personalia';
  fnr: Scalars['String'];
  navn: Navn;
  statsborgerskap: Scalars['String'];
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
  personalia: Personalia;
  telefon: TelefonData;
};

export type TelefonData = {
  __typename?: 'TelefonData';
  brukerdefinert?: Maybe<Scalars['String']>;
  fraKrr?: Maybe<Scalars['String']>;
};

export type GetTelefonQueryVariables = Exact<{
  soknadId: Scalars['ID'];
}>;


export type GetTelefonQuery = { __typename?: 'Query', soknad?: { __typename?: 'Soknad', id: string, telefon: { __typename?: 'TelefonData', fraKrr?: string | null, brukerdefinert?: string | null } } | null };

export type GetPersonaliaQueryVariables = Exact<{
  soknadId: Scalars['ID'];
}>;


export type GetPersonaliaQuery = { __typename?: 'Query', soknad?: { __typename?: 'Soknad', id: string, personalia: { __typename?: 'Personalia', fnr: string, statsborgerskap: string, navn: { __typename?: 'Navn', fornavn: string, mellomnavn?: string | null, etternavn: string } } } | null };

export type SetTelefonnummerMutationVariables = Exact<{
  soknadId: Scalars['ID'];
  tlfNr?: InputMaybe<Scalars['String']>;
}>;


export type SetTelefonnummerMutation = { __typename?: 'Mutation', setTelefonnummer: { __typename?: 'Soknad', telefon: { __typename?: 'TelefonData', brukerdefinert?: string | null } } };


export const GetTelefonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTelefon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"soknadId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"soknad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"soknadId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"telefon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fraKrr"}},{"kind":"Field","name":{"kind":"Name","value":"brukerdefinert"}}]}}]}}]}}]} as unknown as DocumentNode<GetTelefonQuery, GetTelefonQueryVariables>;
export const GetPersonaliaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPersonalia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"soknadId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"soknad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"soknadId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"personalia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"navn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fornavn"}},{"kind":"Field","name":{"kind":"Name","value":"mellomnavn"}},{"kind":"Field","name":{"kind":"Name","value":"etternavn"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fnr"}},{"kind":"Field","name":{"kind":"Name","value":"statsborgerskap"}}]}}]}}]}}]} as unknown as DocumentNode<GetPersonaliaQuery, GetPersonaliaQueryVariables>;
export const SetTelefonnummerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetTelefonnummer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"soknadId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tlfNr"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setTelefonnummer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"soknadId"}}},{"kind":"Argument","name":{"kind":"Name","value":"tlfnr"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tlfNr"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"telefon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brukerdefinert"}}]}}]}}]}}]} as unknown as DocumentNode<SetTelefonnummerMutation, SetTelefonnummerMutationVariables>;

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetTelefonQuery((req, res, ctx) => {
 *   const { soknadId } = req.variables;
 *   return res(
 *     ctx.data({ soknad })
 *   )
 * })
 */
export const mockGetTelefonQuery = (resolver: ResponseResolver<GraphQLRequest<GetTelefonQueryVariables>, GraphQLContext<GetTelefonQuery>, any>) =>
  graphql.query<GetTelefonQuery, GetTelefonQueryVariables>(
    'getTelefon',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetPersonaliaQuery((req, res, ctx) => {
 *   const { soknadId } = req.variables;
 *   return res(
 *     ctx.data({ soknad })
 *   )
 * })
 */
export const mockGetPersonaliaQuery = (resolver: ResponseResolver<GraphQLRequest<GetPersonaliaQueryVariables>, GraphQLContext<GetPersonaliaQuery>, any>) =>
  graphql.query<GetPersonaliaQuery, GetPersonaliaQueryVariables>(
    'getPersonalia',
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
