import {RESTRequest} from "../restClients";
import {NySoknadResponse, NySoknadResponseSchema} from "../legacyTypes/nySoknad";
import {Resolver} from "../../../generated/apolloServerTypes";
import {SoknadType} from "../SoknadType";
import {ApolloContextType} from "../apolloServer";

// Create a new application.
//
// POSTs an empty request to soknader/opprettSoknad, which returns
// a string identifying the form.
//
// TODO: Error handling.
export const mutateNySoknad: Resolver<SoknadType, any, ApolloContextType> = async (parent, args, {cookies}) => {
    const {brukerBehandlingId} = await RESTRequest<NySoknadResponse>({
        path: "soknader/opprettSoknad",
        method: "POST",
        schema: NySoknadResponseSchema,
        cookies,
    });

    return {id: brukerBehandlingId};
};
