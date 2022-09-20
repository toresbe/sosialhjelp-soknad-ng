import {serverPost} from "./restClients";
import {NySoknadResponse, NySoknadResponseSchema} from "./schemas/opprettSoknad";

// Create a new application.
//
// POSTs an empty request to soknader/opprettSoknad, which returns
// a string identifying the form.
//
// TODO: Error handling.
export const createSoknad = async () => {
    const {brukerBehandlingId} = await serverPost<NySoknadResponse>(
        "soknader/opprettSoknad",
        undefined,
        NySoknadResponseSchema
    );

    return {id: brukerBehandlingId};
};
