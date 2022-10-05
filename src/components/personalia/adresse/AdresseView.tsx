import * as React from "react";
import {ReactNode} from "react";
import {useTranslation} from "react-i18next";
import styled from "styled-components";
import {Adresse, Matrikkeladresse, Vegadresse} from "../../../generated/apolloServerTypes";

const fmtGnrBnr = ({gaardsnummer, bruksnummer}: Matrikkeladresse) =>
    (gaardsnummer ?? "") + (bruksnummer ? " / " + bruksnummer : "");

// NOTE: Not sure about the use of ul here
const AdresseEtikett = styled.ul``;

const MatrikkeladresseDetalj = ({matrikkeladresse}: {matrikkeladresse: Matrikkeladresse}) => {
    //FIXME: Must migrate i18n strings here
    const {t} = useTranslation();

    return (
        <AdresseEtikett>
            <li>
                {t("matrikkel.gnrbnr")}: {fmtGnrBnr(matrikkeladresse)}
            </li>
            <li>
                {t("matrikkel.kommunenr")}: {matrikkeladresse.kommunenummer}
            </li>
        </AdresseEtikett>
    );
};

const GateadresseDetalj = ({
    vegadresse: {adressenavn, husnummer, husbokstav, postnummer, poststed},
}: {
    vegadresse: Vegadresse;
}) => {
    return (
        <AdresseEtikett>
            <li>
                {adressenavn} {husnummer} {husbokstav}
            </li>
            <li>
                {postnummer} {poststed}
            </li>
        </AdresseEtikett>
    );
};

export const AdresseView = ({adresse}: {adresse: Adresse}) => (
    <div>
        {adresse.vegadresse && <GateadresseDetalj vegadresse={adresse.vegadresse} />}
        {adresse.matrikkeladresse && <MatrikkeladresseDetalj matrikkeladresse={adresse.matrikkeladresse} />}
    </div>
);

export default AdresseView;
