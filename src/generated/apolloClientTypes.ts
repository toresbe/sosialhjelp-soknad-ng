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
  brukerdefinert?: InputMaybe<InputVegadresse>;
  valg: AdresseValg;
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

export type AdresseSokResultat = {
  __typename?: 'AdresseSokResultat';
  treff: Array<Maybe<Vegadresse>>;
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
  nySoknad: SoknadMutationResult;
  soknad: SoknadMutations;
};


export type MutationSoknadArgs = {
  id: Scalars['ID'];
};

export enum MutationStatus {
  Error = 'ERROR',
  Success = 'SUCCESS'
}

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
  adresseSok: AdresseSokResultat;
  soknad?: Maybe<Soknad>;
};


export type QueryAdresseSokArgs = {
  query: Scalars['String'];
};


export type QuerySoknadArgs = {
  id: Scalars['ID'];
};

export type Soknad = {
  __typename?: 'Soknad';
  /** soknadId (tidl. kjent som behandlingsId) */
  id: Scalars['ID'];
  /** Informasjon om oppholdssted og nærmeste NAV-enhet */
  opphold: Opphold;
  /** Grunnleggende personalia */
  personalia: Personalia;
  /** Kontaktinformasjon telefon */
  telefon: TelefonData;
};

export type SoknadMutationResult = {
  __typename?: 'SoknadMutationResult';
  soknad?: Maybe<Soknad>;
  status: MutationStatus;
};

export type SoknadMutations = {
  __typename?: 'SoknadMutations';
  adresse: SoknadMutationResult;
  telefon: SoknadMutationResult;
};


export type SoknadMutationsAdresseArgs = {
  input: Adresse;
};


export type SoknadMutationsTelefonArgs = {
  input: Telefon;
};

export type Telefon = {
  brukerdefinert?: InputMaybe<Scalars['String']>;
};

export type TelefonData = {
  __typename?: 'TelefonData';
  brukerdefinert?: Maybe<Scalars['String']>;
  fraKrr?: Maybe<Scalars['String']>;
};

export type Vegadresse = {
  __typename?: 'Vegadresse';
  /** Navn på gate, veg, sti, plass eller område som er ført i matrikkelen (eksempel Sørumvegen). */
  adressenavn: Scalars['String'];
  /**
   * Adressebokstav, del av adressenummer (jfr Matrikkelforskrift § 2f).
   * Ved behov kan det i tillegg til tallet brukes en etterfølgende bokstav.
   *
   * Bokstav skal bare brukes for å unngå omnummerering i tidligere tildelte adresser.
   * Bokstav skal gis i alfabetisk rekkefølge. (matrikkelforskrift § 52 tredje ledd).
   *
   * Merknad: Høyst en bokstav
   */
  bokstav?: Maybe<Scalars['String']>;
  /**
   * Firesifret nummerering av kommunen i henhold til Statistisk sentralbyrå sin offisielle liste
   *
   * Merknad: Det presiseres at kommunenummer alltid skal ha 4 siffer, dvs. eventuelt med ledende null.
   */
  kommunenummer?: Maybe<Scalars['String']>;
  /**
   * Del av adressenummer som er definert slik i matrikkelforskrift:
   *
   * et nummer og en eventuell bokstav (husnummer) som entydig identifiserer eiendommer, anlegg,
   * bygninger eller innganger til bygninger innenfor en adresserbar gate, veg, sti, plass eller
   * område (Forskrift § 2f).
   */
  nummer: Scalars['String'];
  /**
   * Firesifret kode som identifiserer et postnummerområde
   *
   * Merknad: Det første sifferet angir postsone, de to første sifrene angir postregion,
   * de tre første sifrene angir postområde og alle fire sifrene angir postnummerområde/poststed.
   */
  postnummer: Scalars['String'];
  /** Navn på poststed i henhold til Postens egne lister */
  poststed?: Maybe<Scalars['String']>;
};

export type NySoknadMutationVariables = Exact<{ [key: string]: never; }>;


export type NySoknadMutation = { __typename?: 'Mutation', nySoknad: { __typename?: 'SoknadMutationResult', status: MutationStatus, soknad?: { __typename?: 'Soknad', id: string } | null } };

export type GetPersonaliaQueryVariables = Exact<{
  soknadId: Scalars['ID'];
}>;


export type GetPersonaliaQuery = { __typename?: 'Query', soknad?: { __typename?: 'Soknad', id: string, personalia: { __typename?: 'Personalia', fnr: string, statsborgerskap: string, navn: { __typename?: 'Navn', fornavn: string, mellomnavn?: string | null, etternavn: string } }, opphold: { __typename?: 'Opphold', valgtAdresse: AdresseValg, bostedsAdresse?: { __typename?: 'AdresseFraSystem', adresseTekst: string, postnummer: string, poststed: string } | null, oppholdsAdresse?: { __typename?: 'AdresseFraSystem', adresseTekst: string, postnummer: string, poststed: string } | null, soknadsAdresse?: { __typename?: 'AdresseFraSystem', adresseTekst: string, postnummer: string, poststed: string } | null, navEnhet?: { __typename?: 'NavEnhet', navn: string, kommune: string } | null }, telefon: { __typename?: 'TelefonData', brukerdefinert?: string | null, fraKrr?: string | null } } | null };

export type PageOneFragment = { __typename?: 'Soknad', id: string, personalia: { __typename?: 'Personalia', fnr: string, statsborgerskap: string, navn: { __typename?: 'Navn', fornavn: string, mellomnavn?: string | null, etternavn: string } }, opphold: { __typename?: 'Opphold', valgtAdresse: AdresseValg, bostedsAdresse?: { __typename?: 'AdresseFraSystem', adresseTekst: string, postnummer: string, poststed: string } | null, oppholdsAdresse?: { __typename?: 'AdresseFraSystem', adresseTekst: string, postnummer: string, poststed: string } | null, soknadsAdresse?: { __typename?: 'AdresseFraSystem', adresseTekst: string, postnummer: string, poststed: string } | null, navEnhet?: { __typename?: 'NavEnhet', navn: string, kommune: string } | null }, telefon: { __typename?: 'TelefonData', brukerdefinert?: string | null, fraKrr?: string | null } };

export type TelefonFragment = { __typename?: 'TelefonData', brukerdefinert?: string | null, fraKrr?: string | null };

export type BasisPersonaliaFragment = { __typename?: 'Personalia', fnr: string, statsborgerskap: string, navn: { __typename?: 'Navn', fornavn: string, mellomnavn?: string | null, etternavn: string } };

export type OppholdFragment = { __typename?: 'Opphold', valgtAdresse: AdresseValg, bostedsAdresse?: { __typename?: 'AdresseFraSystem', adresseTekst: string, postnummer: string, poststed: string } | null, oppholdsAdresse?: { __typename?: 'AdresseFraSystem', adresseTekst: string, postnummer: string, poststed: string } | null, soknadsAdresse?: { __typename?: 'AdresseFraSystem', adresseTekst: string, postnummer: string, poststed: string } | null, navEnhet?: { __typename?: 'NavEnhet', navn: string, kommune: string } | null };

export type SetTelefonnummerMutationVariables = Exact<{
  behandlingsId: Scalars['ID'];
  input: Telefon;
}>;


export type SetTelefonnummerMutation = { __typename?: 'Mutation', soknad: { __typename?: 'SoknadMutations', telefon: { __typename?: 'SoknadMutationResult', soknad?: { __typename?: 'Soknad', id: string, telefon: { __typename?: 'TelefonData', brukerdefinert?: string | null } } | null } } };

export type SetAdresseMutationVariables = Exact<{
  behandlingsId: Scalars['ID'];
  input: Adresse;
}>;


export type SetAdresseMutation = { __typename?: 'Mutation', soknad: { __typename?: 'SoknadMutations', adresse: { __typename?: 'SoknadMutationResult', soknad?: { __typename?: 'Soknad', id: string, opphold: { __typename?: 'Opphold', valgtAdresse: AdresseValg, bostedsAdresse?: { __typename?: 'AdresseFraSystem', adresseTekst: string, postnummer: string, poststed: string } | null, oppholdsAdresse?: { __typename?: 'AdresseFraSystem', adresseTekst: string, postnummer: string, poststed: string } | null, soknadsAdresse?: { __typename?: 'AdresseFraSystem', adresseTekst: string, postnummer: string, poststed: string } | null, navEnhet?: { __typename?: 'NavEnhet', navn: string, kommune: string } | null } } | null } } };

export const BasisPersonaliaFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasisPersonalia"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Personalia"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"navn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fornavn"}},{"kind":"Field","name":{"kind":"Name","value":"mellomnavn"}},{"kind":"Field","name":{"kind":"Name","value":"etternavn"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fnr"}},{"kind":"Field","name":{"kind":"Name","value":"statsborgerskap"}}]}}]} as unknown as DocumentNode<BasisPersonaliaFragment, unknown>;
export const OppholdFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Opphold"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Opphold"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"valgtAdresse"}},{"kind":"Field","name":{"kind":"Name","value":"bostedsAdresse"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adresseTekst"}},{"kind":"Field","name":{"kind":"Name","value":"postnummer"}},{"kind":"Field","name":{"kind":"Name","value":"poststed"}}]}},{"kind":"Field","name":{"kind":"Name","value":"oppholdsAdresse"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adresseTekst"}},{"kind":"Field","name":{"kind":"Name","value":"postnummer"}},{"kind":"Field","name":{"kind":"Name","value":"poststed"}}]}},{"kind":"Field","name":{"kind":"Name","value":"soknadsAdresse"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adresseTekst"}},{"kind":"Field","name":{"kind":"Name","value":"postnummer"}},{"kind":"Field","name":{"kind":"Name","value":"poststed"}}]}},{"kind":"Field","name":{"kind":"Name","value":"navEnhet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"navn"}},{"kind":"Field","name":{"kind":"Name","value":"kommune"}}]}}]}}]} as unknown as DocumentNode<OppholdFragment, unknown>;
export const TelefonFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Telefon"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TelefonData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brukerdefinert"}},{"kind":"Field","name":{"kind":"Name","value":"fraKrr"}}]}}]} as unknown as DocumentNode<TelefonFragment, unknown>;
export const PageOneFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageOne"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Soknad"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"personalia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasisPersonalia"}}]}},{"kind":"Field","name":{"kind":"Name","value":"opphold"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Opphold"}}]}},{"kind":"Field","name":{"kind":"Name","value":"telefon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Telefon"}}]}}]}},...BasisPersonaliaFragmentDoc.definitions,...OppholdFragmentDoc.definitions,...TelefonFragmentDoc.definitions]} as unknown as DocumentNode<PageOneFragment, unknown>;
export const NySoknadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"nySoknad"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nySoknad"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"soknad"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<NySoknadMutation, NySoknadMutationVariables>;
export const GetPersonaliaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPersonalia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"soknadId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"soknad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"soknadId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageOne"}}]}}]}},...PageOneFragmentDoc.definitions]} as unknown as DocumentNode<GetPersonaliaQuery, GetPersonaliaQueryVariables>;
export const SetTelefonnummerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetTelefonnummer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"behandlingsId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Telefon"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"soknad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"behandlingsId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"telefon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"soknad"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"telefon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brukerdefinert"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<SetTelefonnummerMutation, SetTelefonnummerMutationVariables>;
export const SetAdresseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetAdresse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"behandlingsId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Adresse"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"soknad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"behandlingsId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adresse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"soknad"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"opphold"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Opphold"}}]}}]}}]}}]}}]}},...OppholdFragmentDoc.definitions]} as unknown as DocumentNode<SetAdresseMutation, SetAdresseMutationVariables>;