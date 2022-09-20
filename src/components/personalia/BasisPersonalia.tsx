import {useTranslation} from "next-i18next";
import {Personalia} from "../../generated/apollo";
import {Heading} from "@navikt/ds-react";
import {formatFnr, screenReaderFnr} from "../../lib/formatters/FormatFnr";
import {formatName} from "../../lib/formatters/FormatName";
import {RegisterdataTabell} from "../RegisterdataTabell";

export interface BasisPersonaliaProps {
    personalia?: Personalia;
}

export const BasisPersonalia = ({personalia}: BasisPersonaliaProps) => {
    const {t} = useTranslation("skjema", {keyPrefix: "personalia"});

    const {navn, fnr, statsborgerskap} = personalia || {};

    return (
        <RegisterdataTabell aria-label={"personalia"}>
            <caption>
                <Heading size={"small"}>{t("legend")}</Heading>
            </caption>
            <tbody>
                <tr>
                    <th>{t("navn")}</th>
                    <td>{navn && formatName(navn)}</td>
                </tr>
                <tr>
                    <th>{t("fnr")}</th>
                    <td aria-label={fnr && screenReaderFnr(fnr)}>{fnr && formatFnr(fnr)}</td>
                </tr>
                <tr>
                    <th>{t("statsborgerskap")}</th>
                    <td>{statsborgerskap}</td>
                </tr>
            </tbody>
        </RegisterdataTabell>
    );
};
