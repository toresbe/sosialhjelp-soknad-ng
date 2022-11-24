import {LegacyGateadresse} from "../apolloServer/restSchemas/personalia";

// Formatterer slik: <adressenavn> <nummer><ev. bokstav> - støtter ikke adressetilleggsnavn
export const fmtLegacyGateadresse = ({gatenavn, husnummer, husbokstav}: LegacyGateadresse) =>
    husbokstav ? `${gatenavn} ${husnummer}${husbokstav}` : `${gatenavn} ${husnummer}`;
