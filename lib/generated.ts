import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  telefon?: Maybe<TelefonData>;
};

export type TelefonData = {
  __typename?: 'TelefonData';
  brukerdefinert?: Maybe<Scalars['String']>;
  fraKRR?: Maybe<Scalars['String']>;
};

export type TelefonDataQueryVariables = Exact<{
  soknadId: Scalars['ID'];
}>;


export type TelefonDataQuery = { __typename?: 'Query', soknad?: { __typename?: 'Soknad', telefon?: { __typename?: 'TelefonData', fraKRR?: string | null, brukerdefinert?: string | null } | null } | null };

export type SettTelefonnummerMutationVariables = Exact<{
  soknadId: Scalars['ID'];
  tlfNr?: InputMaybe<Scalars['String']>;
}>;


export type SettTelefonnummerMutation = { __typename?: 'Mutation', setTelefonnummer: { __typename?: 'Soknad', telefon?: { __typename?: 'TelefonData', brukerdefinert?: string | null } | null } };


export const TelefonDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TelefonData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"soknadId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"soknad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"soknadId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"telefon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fraKRR"}},{"kind":"Field","name":{"kind":"Name","value":"brukerdefinert"}}]}}]}}]}}]} as unknown as DocumentNode<TelefonDataQuery, TelefonDataQueryVariables>;
export const SettTelefonnummerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SettTelefonnummer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"soknadId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tlfNr"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setTelefonnummer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"soknadId"}}},{"kind":"Argument","name":{"kind":"Name","value":"tlfnr"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tlfNr"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"telefon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brukerdefinert"}}]}}]}}]}}]} as unknown as DocumentNode<SettTelefonnummerMutation, SettTelefonnummerMutationVariables>;