import * as React from "react";
import {Button, Detail, Fieldset, Loader} from "@navikt/ds-react";
import {useTranslation} from "next-i18next";
import {PhoneEditBox} from "./PhoneEditBox";
import styled from "styled-components";
import {useContext, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {
    GetTelefonDataDocument,
    GetTelefonDataQuery,
    SetTelefonnummerDocument,
    SetTelefonnummerMutation,
} from "../../../lib/generated";
import {SoknadContext} from "../../../lib/SoknadContext";
import {FromUser} from "./FromUser";
import {FromKrr} from "./FromKrr";

export const Telefon = () => {
    const {t} = useTranslation("telefon");
    const soknadId = useContext(SoknadContext);
    const {loading, error, data} = useQuery<GetTelefonDataQuery>(GetTelefonDataDocument, {variables: {soknadId}});
    const [mutate] = useMutation<SetTelefonnummerMutation>(SetTelefonnummerDocument, {variables: {soknadId}});
    const [editMode, setEditMode] = useState<boolean>(false);

    const {fraKrr, brukerdefinert} = data?.soknad?.telefon || {};

    if (loading) return <Loader />;

    if (fraKrr === null && brukerdefinert === null)
        return (
            <Fieldset legend={t("legend")} description={t("description")}>
                <PhoneEditBox
                    onSave={async (tlfNr: string) => {
                        await mutate({variables: {tlfNr}});
                    }}
                />
            </Fieldset>
        );

    return (
        <Fieldset legend={t("legend")} description={t("description")}>
            {editMode ? (
                <PhoneEditBox
                    defaultValue={brukerdefinert}
                    onCancel={() => setEditMode(false)}
                    onSave={async (tlfNr: string) => {
                        await mutate({variables: {tlfNr}});
                        setEditMode(false);
                    }}
                />
            ) : brukerdefinert ? (
                <FromUser
                    numberFromUser={brukerdefinert}
                    onDelete={async () => await mutate({variables: {tlfNr: null}})}
                    onEdit={() => setEditMode(true)}
                />
            ) : (
                <FromKrr onEdit={() => setEditMode(true)} fraKrr={fraKrr} />
            )}
        </Fieldset>
    );
};

export default Telefon;
