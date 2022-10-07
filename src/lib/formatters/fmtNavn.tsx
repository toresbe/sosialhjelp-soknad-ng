import {Navn} from "../../generated/apolloClientTypes";

export const fmtNavn = ({fornavn, mellomnavn, etternavn}: Navn) => {
    if (!/.+/.test(fornavn)) throw new Error("fmtNavn received a name without required first name");
    if (!/.+/.test(etternavn)) throw new Error("fmtNavn received a name without required surname");
    if (mellomnavn) return `${fornavn} ${mellomnavn} ${etternavn}`;
    return `${fornavn} ${etternavn}`;
};
