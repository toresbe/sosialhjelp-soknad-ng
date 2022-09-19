import {createSoknad} from "../apiShimClient/createSoknad";
import {getTelefonnummer, setTelefonnummer} from "../apiShimClient/personalia/telefon";
import {Resolvers} from "../../generated/resolvers";

export const resolvers: Resolvers = {
    Query: {
        soknad: (_parent: any, args: any) => {
            return {id: args.id};
        },
    },
    Mutation: {
        opprettSoknad: async () => {
            const id = await createSoknad();
            return {id};
        },
        setTelefonnummer: async (_, {id, tlfnr}) => {
            await setTelefonnummer(id, tlfnr || null);

            return {id};
        },
    },
    Soknad: {
        telefon: async (parent: any) => getTelefonnummer(parent.id),
    },
};
