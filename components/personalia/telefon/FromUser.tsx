import {Button, Detail, Loader} from "@navikt/ds-react";
import * as React from "react";
import styled from "styled-components";
import {useTranslation} from "next-i18next";
import {formatPhoneNumber} from "../../../lib/formatPhoneNumber";
import TelefonRad from "./TelefonRad";

interface PhoneNumberUserDefinedProps {
    numberFromUser?: string | null;
    onDelete: () => void;
    onEdit: () => void;
}

const KnappRad = styled.div`
    display: flex;
    gap: 1rem;
`;

export const FromUser = ({numberFromUser, onDelete, onEdit}: PhoneNumberUserDefinedProps) => {
    const {t} = useTranslation("telefon");

    const fromUserFormatted = numberFromUser ? formatPhoneNumber(numberFromUser) : numberFromUser;

    return (
        <TelefonRad>
            <div>
                <Detail size={"small"}>{t("fraBruker")}</Detail>
                {fromUserFormatted ?? <Loader size={"xsmall"} />}
            </div>
            <KnappRad>
                <Button onClick={onEdit}>Endre</Button>
                <Button variant="danger" onClick={onDelete}>
                    Slett
                </Button>
            </KnappRad>
        </TelefonRad>
    );
};
