import {serverPost} from "../restClients";
import {NySoknadResponse, NySoknadResponseSchema} from "../legacyTypes/nySoknad";
import {Resolver, Soknad} from "../../../generated/apolloServerTypes";
import {DeepPartial} from "utility-types";
import {SoknadType} from "../SoknadType";

// Create a new application.
//
// POSTs an empty request to soknader/opprettSoknad, which returns
// a string identifying the form.
//
// TODO: Error handling.
export const mutateNySoknad: Resolver<SoknadType> = async () => {
    const {brukerBehandlingId} = await serverPost<NySoknadResponse>(
        "soknader/opprettSoknad",
        undefined,
        NySoknadResponseSchema
    );

    return {id: brukerBehandlingId};
};