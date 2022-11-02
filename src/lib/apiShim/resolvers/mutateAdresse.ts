import {MutationSetAdresseArgs, Resolver, SoknadMutation} from "../../../generated/apolloServerTypes";
import {DeepPartial} from "utility-types";
import {RESTRequest} from "../restClients";
import {LegacyAdresser, LegacyAdresserSchema, LegacyNavEnhet, LegacyNavEnhetSchema} from "../legacyTypes/personalia";
import {vegadresseTilLegacy} from "../translators/vegadresse";
import {adresseValgTilLegacy} from "../translators/adresseValg";
import {navEnhetFraLegacy} from "../translators/navEnhet";

export const mutateAdresse: Resolver<DeepPartial<SoknadMutation>, any, any, MutationSetAdresseArgs> = async (
    _,
    {input: {soknadId, adresseValg, soknadsAdresse}},
    {cookies}
) => {
    const now = await RESTRequest<LegacyAdresser>({
        path: `soknader/${soknadId}/personalia/adresser`,
        schema: LegacyAdresserSchema,
        cookies,
    });

    const legacyAdresser: LegacyAdresser = {
        ...now,
        soknad: soknadsAdresse ? vegadresseTilLegacy(soknadsAdresse) : now.soknad,
        valg: adresseValgTilLegacy(adresseValg),
    };

    const legacyNavEnhet = await RESTRequest<LegacyNavEnhet>({
        method: "PUT",
        path: `soknader/${soknadId}/personalia/adresser`,
        body: JSON.stringify(legacyAdresser),
        schema: LegacyNavEnhetSchema,
        cookies,
    });

    return {
        soknad: {
            id: soknadId,
            navEnhet: navEnhetFraLegacy(legacyNavEnhet),
            adresser: {
                valgt: adresseValg,
                soknadsadresse: soknadsAdresse ?? undefined,
            },
        },
    };
};
