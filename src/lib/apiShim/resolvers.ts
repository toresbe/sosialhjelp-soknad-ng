import {nySoknad} from "./nySoknad";
import {getTelefonnummer, setTelefonnummer} from "./personalia/telefon";
import {Resolvers} from "../../generated/resolvers";
import {getBasisPersonalia} from "./personalia/basisPersonalia";

export const resolvers: Resolvers = {
    Query: {
        soknad: async (parent, {id}) => ({id}),
    },
    Mutation: {
        nySoknad: async () => nySoknad(),
        setTelefonnummer: async (_, {id, tlfnr}) => {
            await setTelefonnummer(id, tlfnr || null);
            return {id};
        },
    },
    Soknad: {
        telefon: ({id}) => getTelefonnummer(id!),
        personalia: ({id}) => getBasisPersonalia(id!),
    },
};
