import {ApolloServer} from "apollo-server-micro";
import {resolvers} from "../../lib/apiShimServer/resolvers";
import {
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import {readFileSync} from "fs";

const typeDefs = readFileSync("lib/schema.graphql", "utf8");

const plugins =
    process.env.NODE_ENV === "production"
        ? [ApolloServerPluginLandingPageProductionDefault({embed: true, graphRef: "myGraph@prod"})]
        : [ApolloServerPluginLandingPageLocalDefault({embed: true})];

const apolloServer = new ApolloServer({typeDefs, resolvers, plugins});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default apolloServer.createHandler({path: "/api/graphql"});
