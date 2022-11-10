import {LegacyAdresseElement} from "../../legacyTypes/personalia";
import {AdresseFraSystem} from "../../../generated/apolloServerTypes";
import {vegadresseFraLegacy} from "./vegadresse";
import {matrikkeladresseFraLegacy} from "./matrikkeladresse";

export const adresseFraLegacy = ({type, gateadresse, matrikkeladresse}: LegacyAdresseElement): AdresseFraSystem => {
    switch (type) {
        case "gateadresse":
            if (!gateadresse) throw new Error("adressetype = gateadresse, but gateadresse nullish");
            return vegadresseFraLegacy(gateadresse);
        case "matrikkeladresse":
            if (!matrikkeladresse) throw new Error("adressetype = matrikkeladresse, but matrikkeladresse nullish");
            return matrikkeladresseFraLegacy(matrikkeladresse);
        default:
            throw new Error(`invalid adressetype "${type}"`);
    }
};
