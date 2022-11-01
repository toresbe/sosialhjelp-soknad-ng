import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { DeepPartial } from 'utility-types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AdresseFraSystem: ResolverTypeWrapper<DeepPartial<AdresseFraSystem>>;
  AdresseValg: ResolverTypeWrapper<DeepPartial<AdresseValg>>;
  Boolean: ResolverTypeWrapper<DeepPartial<Scalars['Boolean']>>;
  DateTime: ResolverTypeWrapper<DeepPartial<Scalars['DateTime']>>;
  ID: ResolverTypeWrapper<DeepPartial<Scalars['ID']>>;
  InputVegadresse: ResolverTypeWrapper<DeepPartial<InputVegadresse>>;
  Mutation: ResolverTypeWrapper<{}>;
  NavEnhet: ResolverTypeWrapper<DeepPartial<NavEnhet>>;
  NavEnhetStatus: ResolverTypeWrapper<DeepPartial<NavEnhetStatus>>;
  Navn: ResolverTypeWrapper<DeepPartial<Navn>>;
  Opphold: ResolverTypeWrapper<DeepPartial<Opphold>>;
  Personalia: ResolverTypeWrapper<DeepPartial<Personalia>>;
  Query: ResolverTypeWrapper<{}>;
  SetAdresseInput: ResolverTypeWrapper<DeepPartial<SetAdresseInput>>;
  SetTelefonnummerInput: ResolverTypeWrapper<DeepPartial<SetTelefonnummerInput>>;
  Soknad: ResolverTypeWrapper<DeepPartial<Soknad> & Pick<Soknad, "id">>;
  SoknadMutation: ResolverTypeWrapper<DeepPartial<Omit<SoknadMutation, 'soknad'> & { soknad?: Maybe<ResolversTypes['Soknad']> }>>;
  String: ResolverTypeWrapper<DeepPartial<Scalars['String']>>;
  TelefonData: ResolverTypeWrapper<DeepPartial<TelefonData>>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AdresseFraSystem: DeepPartial<AdresseFraSystem>;
  Boolean: DeepPartial<Scalars['Boolean']>;
  DateTime: DeepPartial<Scalars['DateTime']>;
  ID: DeepPartial<Scalars['ID']>;
  InputVegadresse: DeepPartial<InputVegadresse>;
  Mutation: {};
  NavEnhet: DeepPartial<NavEnhet>;
  Navn: DeepPartial<Navn>;
  Opphold: DeepPartial<Opphold>;
  Personalia: DeepPartial<Personalia>;
  Query: {};
  SetAdresseInput: DeepPartial<SetAdresseInput>;
  SetTelefonnummerInput: DeepPartial<SetTelefonnummerInput>;
  Soknad: DeepPartial<Soknad> & Pick<Soknad, "id">;
  SoknadMutation: DeepPartial<Omit<SoknadMutation, 'soknad'> & { soknad?: Maybe<ResolversParentTypes['Soknad']> }>;
  String: DeepPartial<Scalars['String']>;
  TelefonData: DeepPartial<TelefonData>;
}>;

export type AdresseFraSystemResolvers<ContextType = any, ParentType extends ResolversParentTypes['AdresseFraSystem'] = ResolversParentTypes['AdresseFraSystem']> = ResolversObject<{
  adresseTekst?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postnummer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  poststed?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  nySoknad?: Resolver<ResolversTypes['Soknad'], ParentType, ContextType>;
  setAdresse?: Resolver<ResolversTypes['SoknadMutation'], ParentType, ContextType, RequireFields<MutationSetAdresseArgs, 'input'>>;
  setTelefonnummer?: Resolver<ResolversTypes['SoknadMutation'], ParentType, ContextType, RequireFields<MutationSetTelefonnummerArgs, 'input'>>;
}>;

export type NavEnhetResolvers<ContextType = any, ParentType extends ResolversParentTypes['NavEnhet'] = ResolversParentTypes['NavEnhet']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  kommune?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  navn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['NavEnhetStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NavnResolvers<ContextType = any, ParentType extends ResolversParentTypes['Navn'] = ResolversParentTypes['Navn']> = ResolversObject<{
  etternavn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fornavn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mellomnavn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OppholdResolvers<ContextType = any, ParentType extends ResolversParentTypes['Opphold'] = ResolversParentTypes['Opphold']> = ResolversObject<{
  bostedsAdresse?: Resolver<Maybe<ResolversTypes['AdresseFraSystem']>, ParentType, ContextType>;
  navEnhet?: Resolver<Maybe<ResolversTypes['NavEnhet']>, ParentType, ContextType>;
  oppholdsAdresse?: Resolver<Maybe<ResolversTypes['AdresseFraSystem']>, ParentType, ContextType>;
  soknadsAdresse?: Resolver<Maybe<ResolversTypes['AdresseFraSystem']>, ParentType, ContextType>;
  valgtAdresse?: Resolver<ResolversTypes['AdresseValg'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PersonaliaResolvers<ContextType = any, ParentType extends ResolversParentTypes['Personalia'] = ResolversParentTypes['Personalia']> = ResolversObject<{
  fnr?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  navn?: Resolver<ResolversTypes['Navn'], ParentType, ContextType>;
  statsborgerskap?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  soknad?: Resolver<Maybe<ResolversTypes['Soknad']>, ParentType, ContextType, RequireFields<QuerySoknadArgs, 'id'>>;
}>;

export type SoknadResolvers<ContextType = any, ParentType extends ResolversParentTypes['Soknad'] = ResolversParentTypes['Soknad']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  opphold?: Resolver<Maybe<ResolversTypes['Opphold']>, ParentType, ContextType>;
  personalia?: Resolver<ResolversTypes['Personalia'], ParentType, ContextType>;
  telefon?: Resolver<ResolversTypes['TelefonData'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SoknadMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['SoknadMutation'] = ResolversParentTypes['SoknadMutation']> = ResolversObject<{
  soknad?: Resolver<Maybe<ResolversTypes['Soknad']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TelefonDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['TelefonData'] = ResolversParentTypes['TelefonData']> = ResolversObject<{
  brukerdefinert?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fraKrr?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  AdresseFraSystem?: AdresseFraSystemResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  NavEnhet?: NavEnhetResolvers<ContextType>;
  Navn?: NavnResolvers<ContextType>;
  Opphold?: OppholdResolvers<ContextType>;
  Personalia?: PersonaliaResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Soknad?: SoknadResolvers<ContextType>;
  SoknadMutation?: SoknadMutationResolvers<ContextType>;
  TelefonData?: TelefonDataResolvers<ContextType>;
}>;

