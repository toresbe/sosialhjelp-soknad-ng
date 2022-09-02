import {addMocksToSchema, createMockStore, IMocks, MockStore} from "@graphql-tools/mock";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {SchemaLink} from "@apollo/client/link/schema";
import {loader} from "graphql.macro";
import {makeExecutableSchema} from "graphql-tools";
import {IResolvers} from "@graphql-tools/utils";
const typeDefs = loader("../../lib/schema.graphql");

type GraphQLToolsResolvers =
    | IResolvers<any, any, Record<string, any>, any>
    | IResolvers<any, any, Record<string, any>, any>[];

type GraphQLToolsMocks = IMocks<IResolvers<any, any, Record<string, any>, any>>;

// For documentation of resolvers, see:
// https://www.graphql-tools.com/docs/mocking
export const apolloMockDecorator = (
    Story: any,
    args: {
        parameters: {
            apolloResolvers?: any;
            apolloDefaultValues?: GraphQLToolsMocks;
        };
    }
) => {
    const {apolloResolvers, apolloDefaultValues} = args.parameters;

    let schema = makeExecutableSchema({typeDefs});

    const store = createMockStore({schema, mocks: apolloDefaultValues});
    store.reset();
    schema = addMocksToSchema({schema, store, mocks: apolloDefaultValues, resolvers: apolloResolvers});

    const client = new ApolloClient({
        link: new SchemaLink({schema}),
        cache: new InMemoryCache({typePolicies: {TelefonData: {merge: true}}}),
    });

    return (
        <ApolloProvider client={client}>
            <Story />
        </ApolloProvider>
    );
};
