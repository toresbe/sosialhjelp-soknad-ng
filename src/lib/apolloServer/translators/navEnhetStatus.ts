import {LegacyNavEnhet} from "../../legacyTypes/personalia";
import {NavEnhetStatus} from "../../../generated/apolloServerTypes";

// Konverter GraphQL-kompatibelt NAV-enhet-status fra legacy
export const navEnhetStatusFraLegacy = (legacyNavEnhet: LegacyNavEnhet): NavEnhetStatus => {
    const {isMottakMidlertidigDeaktivert, isMottakDeaktivert} = legacyNavEnhet;
    if (isMottakMidlertidigDeaktivert) return NavEnhetStatus.MidlDeaktivert;
    if (isMottakDeaktivert) return NavEnhetStatus.Deaktivert;
    return NavEnhetStatus.Aktiv;
};
