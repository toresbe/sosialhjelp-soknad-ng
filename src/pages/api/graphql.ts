// This code, which runs in a server-side Node environment, serves
// the GraphQL endpoint on /api/graphql.

import {apolloServer} from "../../lib/apiShim/apolloServer";

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
