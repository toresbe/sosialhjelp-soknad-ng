import {mutateNySoknad} from "./resolvers/mutateNySoknad";
import {resolveTelefonnummer} from "./resolvers/resolveTelefonnummer";
import {resolveBasisPersonalia} from "./resolvers/resolveBasisPersonalia";
import {Resolvers} from "../../generated/apolloServerTypes";
import {resolveSoknad} from "./resolvers/resolveSoknad";
import {mutateTelefonnummer} from "./resolvers/mutateTelefonnummer";
import {resolveNavEnhet} from "./resolvers/resolveNavEnhet";
import {mutateAdresse} from "./resolvers/mutateAdresse";

export const resolvers: Resolvers = {
    Query: {
        soknad: resolveSoknad,
    },
    Mutation: {
        nySoknad: mutateNySoknad,
        setTelefonnummer: mutateTelefonnummer,
        setAdresse: mutateAdresse,
    },
    Soknad: {
        telefon: resolveTelefonnummer,
        navEnhet: resolveNavEnhet,
        personalia: resolveBasisPersonalia,
    },
};
