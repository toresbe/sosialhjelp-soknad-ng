import {createSoknad} from "../apiShimClient/createSoknad";
import {getTelefonnummer, setTelefonnummer} from "../apiShimClient/personalia/telefon";
import {Resolvers} from "../../generated/resolvers";
import {getBasisPersonalia} from "../apiShimClient/personalia/basisPersonalia";

export const resolvers: Resolvers = {
    Query: {
        soknad: async (parent, {id}) => {
            return {
                id,
            };
        },
    },
    Mutation: {
        opprettSoknad: async () => ({id: await createSoknad()}),
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
