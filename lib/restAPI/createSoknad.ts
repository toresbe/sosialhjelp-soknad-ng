import {serverPost} from "./rest-utils";

export const createSoknad = async () => {
    const {brukerBehandlingId} = await serverPost("soknader/opprettSoknad");
    return brukerBehandlingId;
};
