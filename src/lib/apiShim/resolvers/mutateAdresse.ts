import {MutationSetAdresseArgs, Resolver, SoknadMutation} from "../../../generated/apolloServerTypes";
import {DeepPartial} from "utility-types";
import {serverGet, serverPut} from "../restClients";
import {LegacyAdresser, LegacyAdresserSchema, LegacyNavEnhet, LegacyNavEnhetSchema} from "../legacyTypes/personalia";
import {vegadresseTilLegacy} from "../translators/vegadresse";
import {adresseValgTilLegacy} from "../translators/adresseValg";
import {navEnhetFraLegacy} from "../translators/navEnhet";

export const mutateAdresse: Resolver<DeepPartial<SoknadMutation>, any, any, MutationSetAdresseArgs> = async (
    _,
    {input: {soknadId, adresseValg, soknadsAdresse}}
) => {
    const now = await serverGet<LegacyAdresser>(`soknader/${soknadId}/personalia/adresser`, LegacyAdresserSchema);

    const legacyAdresser: LegacyAdresser = {
        ...now,
        soknad: soknadsAdresse ? vegadresseTilLegacy(soknadsAdresse) : now.soknad,
        valg: adresseValgTilLegacy(adresseValg),
    };

    const legacyNavEnhet = await serverPut<LegacyNavEnhet>(
        `soknader/${soknadId}/personalia/adresser`,
        JSON.stringify(legacyAdresser),
        LegacyNavEnhetSchema
    );

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
