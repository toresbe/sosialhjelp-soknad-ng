import {LegacyAdresseElement} from "../legacyTypes/personalia";
import {Adresse} from "../../../generated/apolloServerTypes";
import {vegadresseFraLegacy} from "./vegadresse";
import {matrikkeladresseFraLegacy} from "./matrikkeladresse";

export const adresseFraLegacy = ({type, gateadresse, matrikkeladresse}: LegacyAdresseElement): Adresse => {
    switch (type) {
        case "gateadresse":
            if (!gateadresse) throw new Error("adressetype = gateadresse, but gateadresse nullish");
            return {
                vegadresse: vegadresseFraLegacy(gateadresse),
            };
        case "matrikkeladresse":
            if (!matrikkeladresse) throw new Error("adressetype = matrikkeladresse, but matrikkeladresse nullish");
            return {
                matrikkeladresse: matrikkeladresseFraLegacy(matrikkeladresse),
            };
        default:
            throw new Error(`invalid adressetype "${type}"`);
    }
};
