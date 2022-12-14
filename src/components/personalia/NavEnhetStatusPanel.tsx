import * as React from "react";
import {Alert, GuidePanel, Heading} from "@navikt/ds-react";
import {Trans, useTranslation} from "next-i18next";
import {Maybe, NavEnhet, NavEnhetStatus} from "../../generated/apolloClientTypes";
import Brevkonvolutt from "../icons/Brevkonvolutt";
import styled from "styled-components";

interface NavEnhetStatusPanelProps {
    navEnhet?: Maybe<NavEnhet>;
}

const MidtstiltGuidePanel = styled(GuidePanel)`
    > .navds-guide-panel__content {
        display: flex;
        align-items: center;
    }

    margin-left: -40px;
`;

export const NavEnhetStatusPanel = ({navEnhet}: NavEnhetStatusPanelProps) => {
    const {t} = useTranslation("skjema", {keyPrefix: "navEnhet"});

    if (!navEnhet) return null;

    const {navn, kommune, status} = navEnhet;

    const GyldigMottaker = (
        <MidtstiltGuidePanel illustration={<Brevkonvolutt />}>{t("gyldig", {navn, kommune})}</MidtstiltGuidePanel>
    );

    const UgyldigMottaker = (
        <Alert variant="warning">
            <Heading size={"small"}>{t("ugyldig", {kommune})}</Heading>
            <Trans t={t} i18nKey={"papirSoknad"} components={[<a key={""} href={t("papirSkjemaLink")} />]} />
        </Alert>
    );

    const MidlertidigDeaktivertMottaker = (
        <Alert variant="error">
            <Heading size={"small"}>{t("midlUgyldig", {kommune})}</Heading>
            <Trans t={t} i18nKey={"midlPapirSoknad"} components={[<a key={""} href={t("papirSkjemaLink")} />]} />
        </Alert>
    );

    switch (status) {
        case NavEnhetStatus.Aktiv:
            return GyldigMottaker;
        case NavEnhetStatus.Deaktivert:
            return UgyldigMottaker;
        case NavEnhetStatus.MidlDeaktivert:
            return MidlertidigDeaktivertMottaker;
        default:
            throw new Error("navEnhet has invalid status");
    }
};

export default NavEnhetStatusPanelProps;
