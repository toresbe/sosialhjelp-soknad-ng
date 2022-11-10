import {RESTRequest} from "../restClients";
import {NySoknadResponse, NySoknadResponseSchema} from "../../legacyTypes/nySoknad";
import {MutationStatus, Resolver, SoknadMutationResult} from "../../../generated/apolloServerTypes";
import {ApolloContextType} from "../apolloServer";
import {DeepPartial} from "utility-types";

// Create a new application.
//
// POSTs an empty request to soknader/opprettSoknad, which returns
// a string identifying the form.
//
// TODO: Error handling.
export const mutateNySoknad: Resolver<DeepPartial<SoknadMutationResult>, any, ApolloContextType> = async (
    parent,
    args,
    {cookies}
) => {
    const {brukerBehandlingId} = await RESTRequest<NySoknadResponse>({
        path: "soknader/opprettSoknad",
        method: "POST",
        schema: NySoknadResponseSchema,
        cookies,
    });

    return {status: MutationStatus.Success, soknad: {id: brukerBehandlingId}};
};
