import {AdresseSokResultat, QueryAdresseSokArgs, Resolver} from "../../../generated/apolloServerTypes";
import {restClient} from "../restClients";
import {ApolloContextType} from "../apolloServer";
import {LegacyAdressesokTreffListe, LegacyAdressesokTreffListeSchema} from "../restSchemas/personalia";
import {vegadresseFraLegacyTreff} from "../translators/vegadresse";

export const resolveAdresseSok: Resolver<AdresseSokResultat, any, ApolloContextType, QueryAdresseSokArgs> = async (
    parent,
    {query},
    {cookies}
) => {
    const results = await restClient<LegacyAdressesokTreffListe>({
        path: `informasjon/adressesok?sokestreng=${encodeURI(query)}`,
        schema: LegacyAdressesokTreffListeSchema,
        cookies,
    });

    return {
        treff: results?.map((treff) => vegadresseFraLegacyTreff(treff)),
    };
};
