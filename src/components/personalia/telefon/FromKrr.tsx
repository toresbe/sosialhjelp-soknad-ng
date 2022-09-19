import {Button, Detail, Loader} from "@navikt/ds-react";
import * as React from "react";
import {formatPhoneNumber} from "../../../lib/formatters/formatPhoneNumber";
import {useTranslation} from "next-i18next";
import DivWithFlex from "../../common/DivWithFlex";

interface FromKrrProps {
    fraKrr?: string | null;
    onEdit: () => void;
}

export const FromKrr = ({fraKrr, onEdit}: FromKrrProps) => {
    const fraKrrFormattert = fraKrr ? formatPhoneNumber(fraKrr) : fraKrr;
    const {t} = useTranslation("telefon");

    return (
        <DivWithFlex>
            <div>
                <Detail size={"small"}>{t("fraKrr")}</Detail>
                {fraKrrFormattert ?? <Loader size={"xsmall"} />}
            </div>
            <Button onClick={onEdit}>Jeg vil kontaktes på et annet nummer</Button>
        </DivWithFlex>
    );
};
