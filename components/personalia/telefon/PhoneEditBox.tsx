import {useState} from "react";
import {useTranslation} from "next-i18next";
import {Button, TextField} from "@navikt/ds-react";
import styled from "styled-components";
import * as React from "react";

// Formatterer et telefonnummer ihht ITU E.123; dvs. E.164 med + foran
const fmtNummerSomE123 = (tlfnr: string) => "+47" + tlfnr.replace(/^(?:\+|00)47/, "");

const FlexHorizontalDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    align-items: flex-end;
    button {
        margin-left: 1em;
    }
`;

interface TelefonSelvvalgtProps {
    defaultValue?: string | null;
    onCancel?: () => void;
    onSave: (tlfnr: string) => Promise<void>;
}

export const PhoneEditBox = ({defaultValue, onCancel, onSave}: TelefonSelvvalgtProps) => {
    const {t} = useTranslation("telefon");

    const [tlfnr, setTlfnr] = useState<string>(defaultValue ?? "");

    return (
        <FlexHorizontalDiv>
            <TextField
                hideLabel
                label={"Norsk telefonnummer"}
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
