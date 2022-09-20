import {Navn} from "../../generated/apollo";

export const formatName = ({fornavn, mellomnavn, etternavn}: Navn) =>
    mellomnavn ? `${fornavn} ${mellomnavn} ${etternavn}` : `${fornavn} ${etternavn}`;