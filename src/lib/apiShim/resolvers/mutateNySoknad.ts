import {serverPost} from "../restClients";
import {NySoknadResponse, NySoknadResponseSchema} from "../legacyTypes/nySoknad";
import {Resolver} from "../../../generated/apolloServerTypes";
import {SoknadType} from "../SoknadType";

// Create a new application.
//
// POSTs an empty request to soknader/opprettSoknad, which returns
// a string identifying the form.
//
// TODO: Error handling.
export const mutateNySoknad: Resolver<SoknadType> = async (parent, args, context) => {
    const {brukerBehandlingId} = await serverPost<NySoknadResponse>(
        "soknader/opprettSoknad",
        undefined,
        NySoknadResponseSchema,
        context
    );

    return {id: brukerBehandlingId};
};
