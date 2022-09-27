import * as React from "react";
import {Alert, GuidePanel, Heading} from "@navikt/ds-react";
import {Trans, useTranslation} from "next-i18next";
import {NavEnhet, NavEnhetStatus} from "../../generated/apolloClientTypes";
import Brevkonvolutt from "../common/illustrations/Brevkonvolutt";

// Linken vi henviser brukere til dersom digital søknad ikke kan brukes
const PAPIRSOKNAD_LINK = "https://www.nav.no/sosialhjelp/sok-papir";

interface NavEnhetStatusPanelProps {
    navEnhet: NavEnhet;
}

export const NavEnhetStatusPanel = ({navEnhet}: NavEnhetStatusPanelProps) => {
    const {t} = useTranslation("skjema", {keyPrefix: "navEnhet"});

    if (!navEnhet) return null;

    const {navn, kommune, status} = navEnhet;

    const GyldigMottaker = <GuidePanel illustration={<Brevkonvolutt />}>{t("gyldig", {navn, kommune})}</GuidePanel>;

    const UgyldigMottaker = (
        <Alert variant="warning">
            <Heading size={"small"}>{t("ugyldig", {kommune})}</Heading>
            <Trans t={t} i18nKey={"papirSoknad"} components={[<a key={""} href={PAPIRSOKNAD_LINK} />]} />
        </Alert>
    );

    const MidlertidigDeaktivertMottaker = (
        <Alert variant="error">
            <Heading size={"small"}>{t("midlUgyldig", {kommune})}</Heading>
            <Trans t={t} i18nKey={"midlPapirSoknad"} components={[<a key={""} href={PAPIRSOKNAD_LINK} />]} />
        </Alert>
    );

    switch (status) {
        case NavEnhetStatus.Aktiv:
            return GyldigMottaker;
        case NavEnhetStatus.Deaktivert:
            return UgyldigMottaker;
        case NavEnhetStatus.MidlDeaktivert:
            return MidlertidigDeaktivertMottaker;
    }

    throw new Error("navEnhet has invalid status");
};

export default NavEnhetStatusPanelProps;
