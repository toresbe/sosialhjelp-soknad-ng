import { GraphQLResolveInfo } from 'graphql';
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
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']>>;
  ID: ResolverTypeWrapper<Partial<Scalars['ID']>>;
  Mutation: ResolverTypeWrapper<{}>;
  Navn: ResolverTypeWrapper<Partial<Navn>>;
  Personalia: ResolverTypeWrapper<Partial<Personalia>>;
  Query: ResolverTypeWrapper<{}>;
  Soknad: ResolverTypeWrapper<Partial<Soknad>>;
  String: ResolverTypeWrapper<Partial<Scalars['String']>>;
  TelefonData: ResolverTypeWrapper<Partial<TelefonData>>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Partial<Scalars['Boolean']>;
  ID: Partial<Scalars['ID']>;
  Mutation: {};
  Navn: Partial<Navn>;
  Personalia: Partial<Personalia>;
  Query: {};
  Soknad: Partial<Soknad>;
  String: Partial<Scalars['String']>;
  TelefonData: Partial<TelefonData>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  opprettSoknad?: Resolver<ResolversTypes['Soknad'], ParentType, ContextType>;
  setTelefonnummer?: Resolver<ResolversTypes['Soknad'], ParentType, ContextType, RequireFields<MutationSetTelefonnummerArgs, 'id'>>;
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
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  personalia?: Resolver<ResolversTypes['Personalia'], ParentType, ContextType>;
  telefon?: Resolver<ResolversTypes['TelefonData'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TelefonDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['TelefonData'] = ResolversParentTypes['TelefonData']> = ResolversObject<{
  brukerdefinert?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fraKrr?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Mutation?: MutationResolvers<ContextType>;
  Navn?: NavnResolvers<ContextType>;
  Personalia?: PersonaliaResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Soknad?: SoknadResolvers<ContextType>;
  TelefonData?: TelefonDataResolvers<ContextType>;
}>;

