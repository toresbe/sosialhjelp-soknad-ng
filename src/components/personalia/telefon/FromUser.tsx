import {Button, Detail, Loader} from "@navikt/ds-react";
import * as React from "react";
import styled from "styled-components";
import {useTranslation} from "next-i18next";
import {formatPhone} from "../../../lib/formatters/FormatPhone";
import DivWithFlex from "../../common/DivWithFlex";

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

    const fromUserFormatted = numberFromUser ? formatPhone(numberFromUser) : numberFromUser;

    return (
        <DivWithFlex>
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
        </DivWithFlex>
    );
};
