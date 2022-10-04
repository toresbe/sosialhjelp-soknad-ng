import * as React from "react";
import {AdresseElement, Gateadresse, Matrikkeladresse} from "./AdresseTypes";
import Detaljeliste, {DetaljelisteElement} from "../../../../nav-soknad/components/detaljeliste";
import {ReactNode} from "react";
import {FormattedMessage} from "react-intl";
const fmtGnrBnr = (addresse: Matrikkeladresse | null) =>
    (addresse?.gaardsnummer ?? "") + (addresse?.bruksnummer ? " / " + addresse?.bruksnummer : "");

const MatrikkeladresseDetalj = ({legend, adresse}: {legend: React.ReactNode; adresse: Matrikkeladresse}) => (
    <div>
        {legend}
        <Detaljeliste>
            <DetaljelisteElement tittel={<FormattedMessage id="matrikkel.gnrbnr" />} verdi={fmtGnrBnr(adresse)} />
            <DetaljelisteElement tittel={<FormattedMessage id="matrikkel.kommunenr" />} verdi={adresse.kommunenummer} />
        </Detaljeliste>
    </div>
);

const GateadresseDetalj = ({legend, adresse}: {legend: ReactNode; adresse: Gateadresse}) => {
    const {gatenavn, husnummer, husbokstav, postnummer, poststed} = adresse;

    return (
        <div>
            {legend}
            <Detaljeliste>
                <li className="detaljeliste__element">
                    {gatenavn} {husnummer} {husbokstav}
                </li>
                <li className="detaljeliste__element">
                    {postnummer} {poststed}
                </li>
            </Detaljeliste>
        </div>
    );
};

export const AdresseVisning = ({legend, adresse}: {legend: ReactNode; adresse: AdresseElement}) =>
    adresse.type === "gateadresse" ? (
        <GateadresseDetalj legend={legend} adresse={adresse.gateadresse!} />
    ) : (
        <MatrikkeladresseDetalj legend={legend} adresse={adresse.matrikkeladresse!} />
    );

export default AdresseVisning;
