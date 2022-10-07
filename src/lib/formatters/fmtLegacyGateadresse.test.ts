// Formatterer slik: <adressenavn> <nummer><ev. bokstav> - støtter ikke adressetilleggsnavn

import {fmtLegacyGateadresse} from "./fmtLegacyGateadresse";

test("Formatterer adressenavn med bokstav", () => {
    const adresseObjekt = {gatenavn: "František Čáps gate", husnummer: "1", husbokstav: "A"};

    expect(fmtLegacyGateadresse(adresseObjekt)).toBe("František Čáps gate 1A");
});

test("Formatterer adressenavn med bokstav", () => {
    const adresseObjekt = {gatenavn: "Jolly Kramer-Johansens gate", husnummer: "3"};

    expect(fmtLegacyGateadresse(adresseObjekt)).toBe("Jolly Kramer-Johansens gate 3");
});
