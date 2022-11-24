import {LegacyPersonalia} from "../restSchemas/personalia";
import {Personalia} from "../../../generated/apolloServerTypes";

export const translatePersonalia = ({navn, fodselsnummer, statsborgerskap}: LegacyPersonalia): Personalia => ({
    navn,
    fnr: fodselsnummer,
    statsborgerskap: statsborgerskap,
});
