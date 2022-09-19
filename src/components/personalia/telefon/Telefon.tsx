import * as React from "react";
import {Fieldset, Loader} from "@navikt/ds-react";
import {useTranslation} from "next-i18next";
import {PhoneEditBox} from "./PhoneEditBox";
import {useState} from "react";
import {Maybe, TelefonData} from "../../../generated/apollo";
import {FromUser} from "./FromUser";
import {FromKrr} from "./FromKrr";

export interface TelefonProps {
    telefon?: TelefonData;
    onSetTelefonnummer: (tlfnr: Maybe<string>) => Promise<Maybe<string>>;
}

export const Telefon = ({telefon, onSetTelefonnummer}: TelefonProps) => {
    const {t} = useTranslation("telefon");

    const [editMode, setEditMode] = useState<boolean>(false);

    const {fraKrr, brukerdefinert} = telefon || {};

    return (
        <Fieldset legend={t("legend")} description={t("description")}>
            {!telefon ? (
                <Loader />
            ) : editMode ? (
                <PhoneEditBox
                    defaultValue={brukerdefinert}
                    onCancel={() => setEditMode(false)}
                    onSave={async (tlfNr: string) => {
                        await onSetTelefonnummer(tlfNr);
                        setEditMode(false);
                    }}
                />
            ) : brukerdefinert ? (
                <FromUser
                    numberFromUser={brukerdefinert}
                    onDelete={async () => await onSetTelefonnummer(null)}
                    onEdit={() => setEditMode(true)}
                />
            ) : fraKrr ? (
                <FromKrr onEdit={() => setEditMode(true)} fraKrr={fraKrr} />
            ) : (
                <PhoneEditBox onSave={async (tlfNr: string) => await onSetTelefonnummer(tlfNr)} />
            )}
        </Fieldset>
    );
};

export default Telefon;
