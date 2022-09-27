import {Navn} from "../../generated/apolloClientTypes";

export const formatName = ({fornavn, mellomnavn, etternavn}: Navn) => {
    if (!fornavn) throw new Error("formatName received a name without required first name");
    if (!etternavn) throw new Error("formatName received a name without required surname");
    return mellomnavn ? `${fornavn} ${mellomnavn} ${etternavn}` : `${fornavn} ${etternavn}`;
};
