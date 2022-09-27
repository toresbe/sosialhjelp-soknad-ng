import {NavEnhet, Resolver, Soknad} from "../../../generated/apolloServerTypes";
import {DeepPartial} from "utility-types";
import {navEnhetFraLegacy} from "../translators/navEnhet";
import {serverGet} from "../restClients";
import {LegacyNavEnhet, LegacyNavEnhetSchema} from "../legacyTypes/personalia";

export const resolveNavEnhet: Resolver<NavEnhet, DeepPartial<Soknad>> = async (parent) =>
    navEnhetFraLegacy(
        await serverGet<LegacyNavEnhet>(`soknader/${parent.id}/personalia/adresser`, LegacyNavEnhetSchema)
    );