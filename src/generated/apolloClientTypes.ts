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

/** Adresse, kokt ned til streng av backend */
export type AdresseFraSystem = {
  __typename?: 'AdresseFraSystem';
  /**
   *  Adresser formattert for visning i frontend. Eksempel: "Storgata 2B" eller "123/4-2"
   *
   * Der det i tillegg er adressetilleggsnavn: "Haugen, Storgata 2B" eller "Midtgard, 123/4-2"
   */
  adresseTekst: Scalars['String'];
  /**
   *  Firesifret kode som identifiserer et postnummerområde
   *
   * Merknad: Det første sifferet angir postsone, de to første sifrene angir postregion,
   * de tre første sifrene angir postområde og alle fire sifrene angir postnummerområde/poststed.
   */
  postnummer: Scalars['String'];
  /** Navn på poststed i henhold til Postens egne lister */
  poststed: Scalars['String'];
};

export enum AdresseValg {
  Bosted = 'BOSTED',
  Opphold = 'OPPHOLD',
  Soknad = 'SOKNAD'
}

export type InputVegadresse = {
  /** Navn på gate, veg, sti, plass eller område som er ført i matrikkelen (eksempel Sørumvegen). */
  adressenavn: Scalars['String'];
  /**
   *  Adressebokstav, del av adressenummer (jfr Matrikkelforskrift § 2f).
   * Ved behov kan det i tillegg til tallet brukes en etterfølgende bokstav.
   *
   * Bokstav skal bare brukes for å unngå omnummerering i tidligere tildelte adresser.
   * Bokstav skal gis i alfabetisk rekkefølge. (matrikkelforskrift § 52 tredje ledd).
   *
   * Merknad: Høyst en bokstav
   */
  bokstav?: InputMaybe<Scalars['String']>;
  /**
   *  Firesifret nummerering av kommunen i henhold til Statistisk sentralbyrå sin offisielle liste
   *
   * Merknad: Det presiseres at kommunenummer alltid skal ha 4 siffer, dvs. eventuelt med ledende null.
   */
  kommunenummer?: InputMaybe<Scalars['String']>;
  /**
   *  Del av adressenummer som er definert slik i matrikkelforskrift:
   *
   * et nummer og en eventuell bokstav (husnummer) som entydig identifiserer eiendommer, anlegg,
   * bygninger eller innganger til bygninger innenfor en adresserbar gate, veg, sti, plass eller
   * område (Forskrift § 2f).
   */
  nummer: Scalars['String'];
  /**
   *  Firesifret kode som identifiserer et postnummerområde
   *
   * Merknad: Det første sifferet angir postsone, de to første sifrene angir postregion,
   * de tre første sifrene angir postområde og alle fire sifrene angir postnummerområde/poststed.
   */
  postnummer: Scalars['String'];
  /** Navn på poststed i henhold til Postens egne lister */
  poststed?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  nySoknad: Soknad;
  setAdresse: SoknadMutation;
  setTelefonnummer: SoknadMutation;
};


export type MutationSetAdresseArgs = {
  input: SetAdresseInput;
};


export type MutationSetTelefonnummerArgs = {
  input: SetTelefonnummerInput;
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

export type Opphold = {
  __typename?: 'Opphold';
  /** Bostedsadresse hentet fra PDL */
  bostedsAdresse?: Maybe<AdresseFraSystem>;
  /** navEnhet for brukerens oppholdssted */
  navEnhet?: Maybe<NavEnhet>;
  /** Oppholdsadresse hentet fra PDL */
  oppholdsAdresse?: Maybe<AdresseFraSystem>;
  /** Adresse definert av søker */
  soknadsAdresse?: Maybe<AdresseFraSystem>;
  /** Adresse valgt av bruker. */
  valgtAdresse: AdresseValg;
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

export type SetAdresseInput = {
  adresseValg: AdresseValg;
  soknadId: Scalars['ID'];
  soknadsAdresse?: InputMaybe<InputVegadresse>;
};

export type SetTelefonnummerInput = {
  soknadId: Scalars['ID'];
  tlfnr?: InputMaybe<Scalars['String']>;
};

export type Soknad = {
  __typename?: 'Soknad';
  /** soknadId (tidl. kjent som behandlingsId) */
  id: Scalars['ID'];
  /** Informasjon om oppholdssted (og nærmeste NAV-enhet) */
  opphold?: Maybe<Opphold>;
  /** Grunnleggende personalia */
  personalia: Personalia;
  /** Kontaktinformasjon telefon */
  telefon: TelefonData;
};

export type SoknadMutation = {
  __typename?: 'SoknadMutation';
  soknad?: Maybe<Soknad>;
};

export type TelefonData = {
  __typename?: 'TelefonData';
  brukerdefinert?: Maybe<Scalars['String']>;
  fraKrr?: Maybe<Scalars['String']>;
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


export type GetPersonaliaQuery = { __typename?: 'Query', soknad?: { __typename?: 'Soknad', id: string, opphold?: { __typename?: 'Opphold', bostedsAdresse?: { __typename?: 'AdresseFraSystem', adresseTekst: string, postnummer: string, poststed: string } | null, oppholdsAdresse?: { __typename?: 'AdresseFraSystem', adresseTekst: string, postnummer: string, poststed: string } | null, soknadsAdresse?: { __typename?: 'AdresseFraSystem', adresseTekst: string, postnummer: string, poststed: string } | null } | null, personalia: { __typename?: 'Personalia', fnr: string, statsborgerskap: string, navn: { __typename?: 'Navn', fornavn: string, mellomnavn?: string | null, etternavn: string } } } | null };

export type BasisPersonaliaFragment = { __typename?: 'Soknad', personalia: { __typename?: 'Personalia', fnr: string, statsborgerskap: string, navn: { __typename?: 'Navn', fornavn: string, mellomnavn?: string | null, etternavn: string } } };

export type AdresserFragment = { __typename?: 'Opphold', bostedsAdresse?: { __typename?: 'AdresseFraSystem', adresseTekst: string, postnummer: string, poststed: string } | null, oppholdsAdresse?: { __typename?: 'AdresseFraSystem', adresseTekst: string, postnummer: string, poststed: string } | null, soknadsAdresse?: { __typename?: 'AdresseFraSystem', adresseTekst: string, postnummer: string, poststed: string } | null };

export type SetTelefonnummerMutationVariables = Exact<{
  input: SetTelefonnummerInput;
}>;


export type SetTelefonnummerMutation = { __typename?: 'Mutation', setTelefonnummer: { __typename?: 'SoknadMutation', soknad?: { __typename?: 'Soknad', id: string, telefon: { __typename?: 'TelefonData', brukerdefinert?: string | null } } | null } };

export type SetAdresseMutationVariables = Exact<{
  input: SetAdresseInput;
}>;


export type SetAdresseMutation = { __typename?: 'Mutation', setAdresse: { __typename?: 'SoknadMutation', soknad?: { __typename?: 'Soknad', id: string, opphold?: { __typename?: 'Opphold', bostedsAdresse?: { __typename?: 'AdresseFraSystem', adresseTekst: string, postnummer: string, poststed: string } | null, oppholdsAdresse?: { __typename?: 'AdresseFraSystem', adresseTekst: string, postnummer: string, poststed: string } | null, soknadsAdresse?: { __typename?: 'AdresseFraSystem', adresseTekst: string, postnummer: string, poststed: string } | null } | null } | null } };

export const BasisPersonaliaFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasisPersonalia"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Soknad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"personalia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"navn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fornavn"}},{"kind":"Field","name":{"kind":"Name","value":"mellomnavn"}},{"kind":"Field","name":{"kind":"Name","value":"etternavn"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fnr"}},{"kind":"Field","name":{"kind":"Name","value":"statsborgerskap"}}]}}]}}]} as unknown as DocumentNode<BasisPersonaliaFragment, unknown>;
export const AdresserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Adresser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Opphold"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bostedsAdresse"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adresseTekst"}},{"kind":"Field","name":{"kind":"Name","value":"postnummer"}},{"kind":"Field","name":{"kind":"Name","value":"poststed"}}]}},{"kind":"Field","name":{"kind":"Name","value":"oppholdsAdresse"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adresseTekst"}},{"kind":"Field","name":{"kind":"Name","value":"postnummer"}},{"kind":"Field","name":{"kind":"Name","value":"poststed"}}]}},{"kind":"Field","name":{"kind":"Name","value":"soknadsAdresse"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adresseTekst"}},{"kind":"Field","name":{"kind":"Name","value":"postnummer"}},{"kind":"Field","name":{"kind":"Name","value":"poststed"}}]}}]}}]} as unknown as DocumentNode<AdresserFragment, unknown>;
export const NySoknadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"nySoknad"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nySoknad"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<NySoknadMutation, NySoknadMutationVariables>;
export const GetTelefonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTelefon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"soknadId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"soknad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"soknadId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"telefon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fraKrr"}},{"kind":"Field","name":{"kind":"Name","value":"brukerdefinert"}}]}}]}}]}}]} as unknown as DocumentNode<GetTelefonQuery, GetTelefonQueryVariables>;
export const GetPersonaliaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPersonalia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"soknadId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"soknad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"soknadId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasisPersonalia"}},{"kind":"Field","name":{"kind":"Name","value":"opphold"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Adresser"}}]}}]}}]}},...BasisPersonaliaFragmentDoc.definitions,...AdresserFragmentDoc.definitions]} as unknown as DocumentNode<GetPersonaliaQuery, GetPersonaliaQueryVariables>;
export const SetTelefonnummerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetTelefonnummer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SetTelefonnummerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setTelefonnummer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"soknad"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"telefon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brukerdefinert"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SetTelefonnummerMutation, SetTelefonnummerMutationVariables>;
export const SetAdresseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetAdresse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SetAdresseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setAdresse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"soknad"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"opphold"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Adresser"}}]}}]}}]}}]}},...AdresserFragmentDoc.definitions]} as unknown as DocumentNode<SetAdresseMutation, SetAdresseMutationVariables>;