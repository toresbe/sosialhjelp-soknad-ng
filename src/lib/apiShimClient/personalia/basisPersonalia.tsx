import {serverGet} from "../rest-utils";
import {LegacyNavn, LegacyPersonalia, LegacyPersonaliaSchema} from "../schemas/personalia";
import {Navn, Personalia} from "../../../generated/resolvers";

const translateNavn = ({fornavn, mellomnavn, etternavn}: LegacyNavn): Navn => ({fornavn, mellomnavn, etternavn});

const translatePersonalia = ({navn, fodselsnummer, statsborgerskap}: LegacyPersonalia): Personalia => {
    return {
        navn: translateNavn(navn),
        fnr: fodselsnummer,
        statsborgerskap: statsborgerskap,
    };
};

export const getBasisPersonalia = async (behandlingsId: string) => {
    const data = await serverGet<LegacyPersonalia>(
        `soknader/${behandlingsId}/personalia/basisPersonalia`,
        LegacyPersonaliaSchema
    );

    return translatePersonalia(data);
};
