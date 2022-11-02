import {useTranslation} from "next-i18next";
import {Personalia} from "../../generated/apolloClientTypes";
import {Heading, Loader} from "@navikt/ds-react";
import {fmtFodselsnummer, fmtFodselsnummerForScreenReader} from "../../lib/formatters/fmtFodselsnummer";
import {fmtNavn} from "../../lib/formatters/fmtNavn";
import {SysteminfoTabell} from "../layout/SysteminfoTabell";

export interface BasisPersonaliaProps {
    personalia?: Personalia;
}

export const BasisPersonalia = ({personalia}: BasisPersonaliaProps) => {
    const {t} = useTranslation("skjema", {keyPrefix: "personalia"});

    if (!personalia) return <Loader />;

    const {navn, fnr, statsborgerskap} = personalia;

    return (
        <SysteminfoTabell aria-label={"personalia"}>
            <caption>
                <Heading size={"small"}>{t("legend")}</Heading>
            </caption>
            <tbody>
                <tr>
                    <th>{t("navn")}</th>
                    <td>{navn && fmtNavn(navn)}</td>
                </tr>
                <tr>
                    <th>{t("fnr")}</th>
                    <td aria-label={fnr && fmtFodselsnummerForScreenReader(fnr)}>{fnr && fmtFodselsnummer(fnr)}</td>
                </tr>
                <tr>
                    <th>{t("statsborgerskap")}</th>
                    <td>{statsborgerskap}</td>
                </tr>
            </tbody>
        </SysteminfoTabell>
    );
};
