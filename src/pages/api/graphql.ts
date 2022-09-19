import {ApolloServer} from "apollo-server-micro";
import {resolvers} from "../../lib/apiShimServer/resolvers";
import {
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import {readFileSync} from "fs";

const typeDefs = readFileSync("src/lib/schema.graphql", "utf8");

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

export const createHandler = async (req: any, res: any) => {
    await apolloServer.start();
    return apolloServer.createHandler({path: "/api/graphql"})(req, res);
};

export default createHandler;
