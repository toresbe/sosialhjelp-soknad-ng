import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { DeepPartial } from 'utility-types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  Adresse: ResolverTypeWrapper<DeepPartial<Adresse>>;
  AdresseData: ResolverTypeWrapper<DeepPartial<AdresseData>>;
  AdresseValg: ResolverTypeWrapper<DeepPartial<AdresseValg>>;
  Boolean: ResolverTypeWrapper<DeepPartial<Scalars['Boolean']>>;
  DateTime: ResolverTypeWrapper<DeepPartial<Scalars['DateTime']>>;
  ID: ResolverTypeWrapper<DeepPartial<Scalars['ID']>>;
  Matrikkeladresse: ResolverTypeWrapper<DeepPartial<Matrikkeladresse>>;
  Mutation: ResolverTypeWrapper<{}>;
  NavEnhet: ResolverTypeWrapper<DeepPartial<NavEnhet>>;
  NavEnhetStatus: ResolverTypeWrapper<DeepPartial<NavEnhetStatus>>;
  Navn: ResolverTypeWrapper<DeepPartial<Navn>>;
  NyVegadresse: ResolverTypeWrapper<DeepPartial<NyVegadresse>>;
  Personalia: ResolverTypeWrapper<DeepPartial<Personalia>>;
  Query: ResolverTypeWrapper<{}>;
  Soknad: ResolverTypeWrapper<DeepPartial<Soknad>>;
  String: ResolverTypeWrapper<DeepPartial<Scalars['String']>>;
  TelefonData: ResolverTypeWrapper<DeepPartial<TelefonData>>;
  Vegadresse: ResolverTypeWrapper<DeepPartial<Vegadresse>>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Adresse: DeepPartial<Adresse>;
  AdresseData: DeepPartial<AdresseData>;
  Boolean: DeepPartial<Scalars['Boolean']>;
  DateTime: DeepPartial<Scalars['DateTime']>;
  ID: DeepPartial<Scalars['ID']>;
  Matrikkeladresse: DeepPartial<Matrikkeladresse>;
  Mutation: {};
  NavEnhet: DeepPartial<NavEnhet>;
  Navn: DeepPartial<Navn>;
  NyVegadresse: DeepPartial<NyVegadresse>;
  Personalia: DeepPartial<Personalia>;
  Query: {};
  Soknad: DeepPartial<Soknad>;
  String: DeepPartial<Scalars['String']>;
  TelefonData: DeepPartial<TelefonData>;
  Vegadresse: DeepPartial<Vegadresse>;
}>;

export type AdresseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Adresse'] = ResolversParentTypes['Adresse']> = ResolversObject<{
  matrikkeladresse?: Resolver<Maybe<ResolversTypes['Matrikkeladresse']>, ParentType, ContextType>;
  vegadresse?: Resolver<Maybe<ResolversTypes['Vegadresse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AdresseDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['AdresseData'] = ResolversParentTypes['AdresseData']> = ResolversObject<{
  bostedsadresse?: Resolver<Maybe<ResolversTypes['Adresse']>, ParentType, ContextType>;
  oppholdsadresse?: Resolver<Maybe<ResolversTypes['Adresse']>, ParentType, ContextType>;
  soknadsadresse?: Resolver<Maybe<ResolversTypes['Vegadresse']>, ParentType, ContextType>;
  valgt?: Resolver<ResolversTypes['AdresseValg'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MatrikkeladresseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Matrikkeladresse'] = ResolversParentTypes['Matrikkeladresse']> = ResolversObject<{
  bruksenhetsnummer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  kommunenummer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postnummer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tilleggsnavn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  nySoknad?: Resolver<ResolversTypes['Soknad'], ParentType, ContextType>;
  setAdresse?: Resolver<ResolversTypes['Soknad'], ParentType, ContextType, RequireFields<MutationSetAdresseArgs, 'adresseValg' | 'soknadId'>>;
  setTelefonnummer?: Resolver<ResolversTypes['Soknad'], ParentType, ContextType, RequireFields<MutationSetTelefonnummerArgs, 'soknadId'>>;
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
  adresser?: Resolver<ResolversTypes['AdresseData'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  navEnhet?: Resolver<Maybe<ResolversTypes['NavEnhet']>, ParentType, ContextType>;
  personalia?: Resolver<ResolversTypes['Personalia'], ParentType, ContextType>;
  telefon?: Resolver<ResolversTypes['TelefonData'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TelefonDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['TelefonData'] = ResolversParentTypes['TelefonData']> = ResolversObject<{
  brukerdefinert?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fraKrr?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VegadresseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Vegadresse'] = ResolversParentTypes['Vegadresse']> = ResolversObject<{
  adressenavn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bruksenhetsnummer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bydelsnummer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  husbokstav?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  husnummer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  kommunenummer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postnummer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tilleggsnavn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Adresse?: AdresseResolvers<ContextType>;
  AdresseData?: AdresseDataResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Matrikkeladresse?: MatrikkeladresseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NavEnhet?: NavEnhetResolvers<ContextType>;
  Navn?: NavnResolvers<ContextType>;
  Personalia?: PersonaliaResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Soknad?: SoknadResolvers<ContextType>;
  TelefonData?: TelefonDataResolvers<ContextType>;
  Vegadresse?: VegadresseResolvers<ContextType>;
}>;

