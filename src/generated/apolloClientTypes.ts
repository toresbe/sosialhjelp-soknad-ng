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
  DateTime: any;
};

export type Adresse = {
  __typename?: 'Adresse';
  matrikkeladresse?: Maybe<Matrikkeladresse>;
  vegadresse?: Maybe<Vegadresse>;
};

export type AdresseData = {
  __typename?: 'AdresseData';
  bostedsadresse?: Maybe<Adresse>;
  oppholdsadresse?: Maybe<Adresse>;
  soknadsadresse?: Maybe<Vegadresse>;
  valgt: AdresseValg;
};

export enum AdresseValg {
  Bosted = 'BOSTED',
  Opphold = 'OPPHOLD',
  Soknad = 'SOKNAD'
}

export type Matrikkeladresse = {
  __typename?: 'Matrikkeladresse';
  bruksenhetsnummer?: Maybe<Scalars['String']>;
  kommunenummer?: Maybe<Scalars['String']>;
  postnummer?: Maybe<Scalars['String']>;
  tilleggsnavn?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  nySoknad: Soknad;
  setAdresse: Soknad;
  setTelefonnummer: Soknad;
};


export type MutationSetAdresseArgs = {
  adresseValg: AdresseValg;
  soknadId: Scalars['ID'];
  soknadsAdresse?: InputMaybe<NyVegadresse>;
};


export type MutationSetTelefonnummerArgs = {
  soknadId: Scalars['ID'];
  tlfnr?: InputMaybe<Scalars['String']>;
};

export type NavEnhet = {
  __typename?: 'NavEnhet';
  id: Scalars['ID'];
  kommune: Scalars['String'];
  navn: Scalars['String'];
  status: NavEnhetStatus;
};

export enum NavEnhetStatus {
  Aktiv = 'AKTIV',
  Deaktivert = 'DEAKTIVERT',
  MidlDeaktivert = 'MIDL_DEAKTIVERT'
}

export type Navn = {
  __typename?: 'Navn';
  etternavn: Scalars['String'];
  fornavn: Scalars['String'];
  mellomnavn?: Maybe<Scalars['String']>;
};

export type NyVegadresse = {
  adressenavn?: InputMaybe<Scalars['String']>;
  bruksenhetsnummer?: InputMaybe<Scalars['String']>;
  bydelsnummer?: InputMaybe<Scalars['String']>;
  husbokstav?: InputMaybe<Scalars['String']>;
  husnummer?: InputMaybe<Scalars['String']>;
  kommunenummer?: InputMaybe<Scalars['String']>;
  postnummer?: InputMaybe<Scalars['String']>;
  tilleggsnavn?: InputMaybe<Scalars['String']>;
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
  adresser: AdresseData;
  id: Scalars['ID'];
  navEnhet?: Maybe<NavEnhet>;
  personalia: Personalia;
  telefon: TelefonData;
};

export type TelefonData = {
  __typename?: 'TelefonData';
  brukerdefinert?: Maybe<Scalars['String']>;
  fraKrr?: Maybe<Scalars['String']>;
};

export type Vegadresse = {
  __typename?: 'Vegadresse';
  adressenavn?: Maybe<Scalars['String']>;
  bruksenhetsnummer?: Maybe<Scalars['String']>;
  bydelsnummer?: Maybe<Scalars['String']>;
  husbokstav?: Maybe<Scalars['String']>;
  husnummer?: Maybe<Scalars['String']>;
  kommunenummer?: Maybe<Scalars['String']>;
  postnummer?: Maybe<Scalars['String']>;
  tilleggsnavn?: Maybe<Scalars['String']>;
};

export type NySoknadMutationVariables = Exact<{ [key: string]: never; }>;


export type NySoknadMutation = { __typename?: 'Mutation', nySoknad: { __typename?: 'Soknad', id: string } };

export type GetTelefonQueryVariables = Exact<{
  soknadId: Scalars['ID'];
}>;


export type GetTelefonQuery = { __typename?: 'Query', soknad?: { __typename?: 'Soknad', id: string, telefon: { __typename?: 'TelefonData', fraKrr?: string | null, brukerdefinert?: string | null } } | null };

export type GetPersonaliaQueryVariables = Exact<{
  soknadId: Scalars['ID'];
}>;


export type GetPersonaliaQuery = { __typename?: 'Query', soknad?: { __typename?: 'Soknad', id: string, adresser: { __typename?: 'AdresseData', bostedsadresse?: { __typename?: 'Adresse', vegadresse?: { __typename?: 'Vegadresse', adressenavn?: string | null, husnummer?: string | null, husbokstav?: string | null, tilleggsnavn?: string | null, postnummer?: string | null, kommunenummer?: string | null, bruksenhetsnummer?: string | null, bydelsnummer?: string | null } | null, matrikkeladresse?: { __typename?: 'Matrikkeladresse', postnummer?: string | null, tilleggsnavn?: string | null, kommunenummer?: string | null, bruksenhetsnummer?: string | null } | null } | null, oppholdsadresse?: { __typename?: 'Adresse', vegadresse?: { __typename?: 'Vegadresse', adressenavn?: string | null, husnummer?: string | null, husbokstav?: string | null, tilleggsnavn?: string | null, postnummer?: string | null, kommunenummer?: string | null, bruksenhetsnummer?: string | null, bydelsnummer?: string | null } | null } | null, soknadsadresse?: { __typename?: 'Vegadresse', adressenavn?: string | null, husnummer?: string | null, husbokstav?: string | null, tilleggsnavn?: string | null, postnummer?: string | null, kommunenummer?: string | null, bruksenhetsnummer?: string | null, bydelsnummer?: string | null } | null }, personalia: { __typename?: 'Personalia', fnr: string, statsborgerskap: string, navn: { __typename?: 'Navn', fornavn: string, mellomnavn?: string | null, etternavn: string } } } | null };

export type BasisPersonaliaFragment = { __typename?: 'Soknad', personalia: { __typename?: 'Personalia', fnr: string, statsborgerskap: string, navn: { __typename?: 'Navn', fornavn: string, mellomnavn?: string | null, etternavn: string } } };

export type AdresserFragment = { __typename?: 'AdresseData', bostedsadresse?: { __typename?: 'Adresse', vegadresse?: { __typename?: 'Vegadresse', adressenavn?: string | null, husnummer?: string | null, husbokstav?: string | null, tilleggsnavn?: string | null, postnummer?: string | null, kommunenummer?: string | null, bruksenhetsnummer?: string | null, bydelsnummer?: string | null } | null, matrikkeladresse?: { __typename?: 'Matrikkeladresse', postnummer?: string | null, tilleggsnavn?: string | null, kommunenummer?: string | null, bruksenhetsnummer?: string | null } | null } | null, oppholdsadresse?: { __typename?: 'Adresse', vegadresse?: { __typename?: 'Vegadresse', adressenavn?: string | null, husnummer?: string | null, husbokstav?: string | null, tilleggsnavn?: string | null, postnummer?: string | null, kommunenummer?: string | null, bruksenhetsnummer?: string | null, bydelsnummer?: string | null } | null } | null, soknadsadresse?: { __typename?: 'Vegadresse', adressenavn?: string | null, husnummer?: string | null, husbokstav?: string | null, tilleggsnavn?: string | null, postnummer?: string | null, kommunenummer?: string | null, bruksenhetsnummer?: string | null, bydelsnummer?: string | null } | null };

export type VegadresseFragment = { __typename?: 'Vegadresse', adressenavn?: string | null, husnummer?: string | null, husbokstav?: string | null, tilleggsnavn?: string | null, postnummer?: string | null, kommunenummer?: string | null, bruksenhetsnummer?: string | null, bydelsnummer?: string | null };

export type MatrikkeladresseFragment = { __typename?: 'Matrikkeladresse', postnummer?: string | null, tilleggsnavn?: string | null, kommunenummer?: string | null, bruksenhetsnummer?: string | null };

export type SetTelefonnummerMutationVariables = Exact<{
  soknadId: Scalars['ID'];
  tlfNr?: InputMaybe<Scalars['String']>;
}>;


export type SetTelefonnummerMutation = { __typename?: 'Mutation', setTelefonnummer: { __typename?: 'Soknad', telefon: { __typename?: 'TelefonData', brukerdefinert?: string | null } } };

export type KokoMutationVariables = Exact<{
  soknadId: Scalars['ID'];
  adresseValg: AdresseValg;
  soknadsAdresse?: InputMaybe<NyVegadresse>;
}>;


export type KokoMutation = { __typename?: 'Mutation', setAdresse: { __typename?: 'Soknad', adresser: { __typename?: 'AdresseData', bostedsadresse?: { __typename?: 'Adresse', vegadresse?: { __typename?: 'Vegadresse', adressenavn?: string | null, husnummer?: string | null, husbokstav?: string | null, tilleggsnavn?: string | null, postnummer?: string | null, kommunenummer?: string | null, bruksenhetsnummer?: string | null, bydelsnummer?: string | null } | null, matrikkeladresse?: { __typename?: 'Matrikkeladresse', postnummer?: string | null, tilleggsnavn?: string | null, kommunenummer?: string | null, bruksenhetsnummer?: string | null } | null } | null, oppholdsadresse?: { __typename?: 'Adresse', vegadresse?: { __typename?: 'Vegadresse', adressenavn?: string | null, husnummer?: string | null, husbokstav?: string | null, tilleggsnavn?: string | null, postnummer?: string | null, kommunenummer?: string | null, bruksenhetsnummer?: string | null, bydelsnummer?: string | null } | null } | null, soknadsadresse?: { __typename?: 'Vegadresse', adressenavn?: string | null, husnummer?: string | null, husbokstav?: string | null, tilleggsnavn?: string | null, postnummer?: string | null, kommunenummer?: string | null, bruksenhetsnummer?: string | null, bydelsnummer?: string | null } | null } } };

export const BasisPersonaliaFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasisPersonalia"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Soknad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"personalia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"navn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fornavn"}},{"kind":"Field","name":{"kind":"Name","value":"mellomnavn"}},{"kind":"Field","name":{"kind":"Name","value":"etternavn"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fnr"}},{"kind":"Field","name":{"kind":"Name","value":"statsborgerskap"}}]}}]}}]} as unknown as DocumentNode<BasisPersonaliaFragment, unknown>;
export const VegadresseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"vegadresse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vegadresse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adressenavn"}},{"kind":"Field","name":{"kind":"Name","value":"husnummer"}},{"kind":"Field","name":{"kind":"Name","value":"husbokstav"}},{"kind":"Field","name":{"kind":"Name","value":"tilleggsnavn"}},{"kind":"Field","name":{"kind":"Name","value":"postnummer"}},{"kind":"Field","name":{"kind":"Name","value":"kommunenummer"}},{"kind":"Field","name":{"kind":"Name","value":"bruksenhetsnummer"}},{"kind":"Field","name":{"kind":"Name","value":"bydelsnummer"}}]}}]} as unknown as DocumentNode<VegadresseFragment, unknown>;
export const MatrikkeladresseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"matrikkeladresse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Matrikkeladresse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postnummer"}},{"kind":"Field","name":{"kind":"Name","value":"tilleggsnavn"}},{"kind":"Field","name":{"kind":"Name","value":"kommunenummer"}},{"kind":"Field","name":{"kind":"Name","value":"bruksenhetsnummer"}}]}}]} as unknown as DocumentNode<MatrikkeladresseFragment, unknown>;
export const AdresserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Adresser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdresseData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bostedsadresse"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vegadresse"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"vegadresse"}}]}},{"kind":"Field","name":{"kind":"Name","value":"matrikkeladresse"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"matrikkeladresse"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"oppholdsadresse"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vegadresse"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"vegadresse"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"soknadsadresse"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"vegadresse"}}]}}]}},...VegadresseFragmentDoc.definitions,...MatrikkeladresseFragmentDoc.definitions]} as unknown as DocumentNode<AdresserFragment, unknown>;
export const NySoknadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"nySoknad"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nySoknad"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<NySoknadMutation, NySoknadMutationVariables>;
export const GetTelefonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTelefon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"soknadId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"soknad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"soknadId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"telefon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fraKrr"}},{"kind":"Field","name":{"kind":"Name","value":"brukerdefinert"}}]}}]}}]}}]} as unknown as DocumentNode<GetTelefonQuery, GetTelefonQueryVariables>;
export const GetPersonaliaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPersonalia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"soknadId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"soknad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"soknadId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasisPersonalia"}},{"kind":"Field","name":{"kind":"Name","value":"adresser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Adresser"}}]}}]}}]}},...BasisPersonaliaFragmentDoc.definitions,...AdresserFragmentDoc.definitions]} as unknown as DocumentNode<GetPersonaliaQuery, GetPersonaliaQueryVariables>;
export const SetTelefonnummerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetTelefonnummer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"soknadId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tlfNr"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setTelefonnummer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"soknadId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"soknadId"}}},{"kind":"Argument","name":{"kind":"Name","value":"tlfnr"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tlfNr"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"telefon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brukerdefinert"}}]}}]}}]}}]} as unknown as DocumentNode<SetTelefonnummerMutation, SetTelefonnummerMutationVariables>;
export const KokoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Koko"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"soknadId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"adresseValg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdresseValg"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"soknadsAdresse"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NyVegadresse"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setAdresse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"soknadId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"soknadId"}}},{"kind":"Argument","name":{"kind":"Name","value":"adresseValg"},"value":{"kind":"Variable","name":{"kind":"Name","value":"adresseValg"}}},{"kind":"Argument","name":{"kind":"Name","value":"soknadsAdresse"},"value":{"kind":"Variable","name":{"kind":"Name","value":"soknadsAdresse"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adresser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Adresser"}}]}}]}}]}},...AdresserFragmentDoc.definitions]} as unknown as DocumentNode<KokoMutation, KokoMutationVariables>;