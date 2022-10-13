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
import {resolveNavEnhet} from "./resolvers/resolveNavEnhet";
import {mutateAdresse} from "./resolvers/mutateAdresse";
import {resolveAdresser} from "./resolvers/resolveAdresser";

const resolvers: Resolvers = {
    Query: {
        soknad: resolveSoknad,
    },
    Mutation: {
        nySoknad: mutateNySoknad,
        setTelefonnummer: mutateTelefonnummer,
        setAdresse: mutateAdresse,
    },
    Soknad: {
        telefon: resolveTelefonnummer,
        navEnhet: resolveNavEnhet,
        personalia: resolveBasisPersonalia,
        opphold: resolveAdresser,
    },
};

const typeDefs = readFileSync("src/lib/schema.graphql", "utf8");

// If in dev mode, include GraphQL playground. If not, just give a nice friendly landing page.
const plugins =
    process.env.NODE_ENV === "production"
        ? [ApolloServerPluginLandingPageProductionDefault({footer: false})]
        : [ApolloServerPluginLandingPageLocalDefault({embed: true})];

export const apolloServer = new ApolloServer({typeDefs, resolvers, plugins});
