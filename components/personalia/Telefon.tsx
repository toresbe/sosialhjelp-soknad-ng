import * as React from "react";
import {Fieldset} from "@navikt/ds-react";
import {useTranslation} from "next-i18next";
import {TelefonSysteminfo} from "./TelefonSysteminfo";
import {TelefonSelvvalgt} from "./TelefonSelvvalgt";

export const Telefon = () => {
    const {t} = useTranslation("telefon");

    return (
        <Fieldset legend={t("legend")} description={t("description")}>
            <TelefonSysteminfo />
            <TelefonSelvvalgt />
        </Fieldset>
    );
};

export default Telefon;
