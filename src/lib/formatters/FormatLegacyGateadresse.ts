import {LegacyGateadresse} from "../apiShim/legacyTypes/personalia";

// Formatterer slik: <adressenavn> <nummer><ev. bokstav>
// Støtter ikke adressetilleggsnavn
export const formatLegacyGateadresse = ({gatenavn, husnummer, husbokstav}: LegacyGateadresse) =>
    husbokstav ? `${gatenavn} ${husnummer}${husbokstav}` : `${gatenavn} ${husnummer}`;
