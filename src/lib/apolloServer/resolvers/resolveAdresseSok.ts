import {AdresseSokResultat, QueryAdresseSokArgs, Resolver} from "../../../generated/apolloServerTypes";
import {RESTRequest} from "../restClients";
import {ApolloContextType} from "../apolloServer";
import {LegacyAdressesokTreffSchema} from "../../legacyTypes/personalia";

export const resolveAdresseSok: Resolver<AdresseSokResultat, any, ApolloContextType, QueryAdresseSokArgs> = async (
    parent,
    {query},
    {cookies}
) => {
    console.log("cookies:", cookies);

    const results = await RESTRequest({
        path: `informasjon/adressesok?sokestreng=${encodeURI(query)}`,
        schema: LegacyAdressesokTreffSchema,
        cookies,
    });

    console.log(results);

    return {
        treff: [],
    };
};
