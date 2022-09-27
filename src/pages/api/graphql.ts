import {ApolloServer} from "apollo-server-micro";
import {resolvers} from "../../lib/apiShim/router";
import {
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import {readFileSync} from "fs";

// This code, which runs in a server-side Node environment, serves
// the GraphQL endpoint on /api/graphql.

const typeDefs = readFileSync("src/lib/schema.graphql", "utf8");

const plugins =
    process.env.NODE_ENV === "production"
        ? [ApolloServerPluginLandingPageProductionDefault({embed: true, graphRef: "myGraph@prod"})]
        : [ApolloServerPluginLandingPageLocalDefault({embed: true})];

const apolloServer = new ApolloServer({typeDefs, resolvers, plugins});
const startServer = apolloServer.start();

export const config = {
    api: {
        bodyParser: false,
    },
};

export const createHandler = async (req: any, res: any) => {
    await startServer;
    return apolloServer.createHandler({path: "/api/graphql"})(req, res);
};

export default createHandler;
