import {ApolloServer} from "apollo-server-micro";
import {
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import {readFileSync} from "fs";
import {mutateNySoknad} from "./resolvers/mutateNySoknad";
import {resolveTelefonnummer} from "./resolvers/resolveTelefonnummer";
import {resolveBasisPersonalia} from "./resolvers/resolveBasisPersonalia";
import {Resolvers} from "../../generated/apolloServerTypes";
import {resolveSoknad} from "./resolvers/resolveSoknad";
import {mutateTelefonnummer} from "./resolvers/mutateTelefonnummer";
import {mutateAdresse} from "./resolvers/mutateAdresse";
import {resolveOpphold} from "./resolvers/resolveOpphold";
import {resolveAdresseSok} from "./resolvers/resolveAdresseSok";

const resolvers: Resolvers = {
    Query: {
        soknad: resolveSoknad,
        adresseSok: resolveAdresseSok,
    },
    Mutation: {
        nySoknad: mutateNySoknad,
        soknad: async () => ({}),
    },
    SoknadMutations: {
        telefon: mutateTelefonnummer,
        adresse: mutateAdresse,
    },
    Soknad: {
        telefon: resolveTelefonnummer,
        personalia: resolveBasisPersonalia,
        opphold: resolveOpphold,
    },
};

const typeDefs = readFileSync("src/lib/schema.graphql", "utf8");

// If in dev mode, include GraphQL playground. If not, just give a nice friendly landing page.
const plugins =
    process.env.NODE_ENV === "production"
        ? [ApolloServerPluginLandingPageProductionDefault({footer: false})]
        : [ApolloServerPluginLandingPageLocalDefault({embed: true})];

export interface ApolloContextType {
    cookies: Record<string, string>;
}

export const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins,
    context: ({req: {cookies}}) => ({cookies}),
});
