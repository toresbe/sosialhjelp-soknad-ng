import {createSoknad} from "../restAPI/createSoknad";
import {getTelefonnummer, setTelefonnummer} from "../restAPI/personalia/telefon";
import {Resolvers} from "@apollo/client";

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
        setTelefonnummer: async (_: any, args: any) => {
            await setTelefonnummer(args.id, args.tlfnr);
            return {id: args.id};
        },
    },
    Soknad: {
        telefon: async (parent: any) => getTelefonnummer(parent.id),
    },
};
