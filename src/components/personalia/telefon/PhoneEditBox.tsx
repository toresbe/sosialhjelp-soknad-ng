import {useState} from "react";
import {useTranslation} from "next-i18next";
import {Button, TextField} from "@navikt/ds-react";
import styled from "styled-components";
import * as React from "react";

const FlexHorizontalDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    button {
        margin-left: 1em;
    }
`;

interface TelefonSelvvalgtProps {
    defaultValue?: string | null;
    onCancel?: () => void;
    onSave: (tlfnr: string) => any;
}

export const PhoneEditBox = ({defaultValue, onCancel, onSave}: TelefonSelvvalgtProps) => {
    const {t} = useTranslation("skjema", {keyPrefix: "telefon"});

    const [tlfnr, setTlfnr] = useState<string>(defaultValue ?? "");

    return (
        <FlexHorizontalDiv>
            <TextField
                hideLabel
                label={t("norsknummer")}
                type="tel"
                autoComplete={"tel"}
                maxLength={11}
                value={tlfnr}
                onChange={(e) => setTlfnr(e.target.value)}
                required={false}
            />
            <Button onClick={() => onSave(tlfnr)}>Lagre</Button>
            {onCancel && (
                <Button variant="secondary" onClick={() => onCancel()}>
                    Avbryt
                </Button>
            )}
        </FlexHorizontalDiv>
    );
};
