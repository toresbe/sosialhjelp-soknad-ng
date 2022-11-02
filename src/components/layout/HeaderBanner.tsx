import * as React from "react";
import styled from "styled-components";
import {Heading} from "@navikt/ds-react";
import {useTranslation} from "next-i18next";

const StyledAppBanner = styled.header`
    background-color: #9bd0b0;
    border-bottom: 5px solid #38a161;
    color: #3e3832;
    width: 100%;

    @media screen and (min-width: 768px) {
        padding-left: 0.75rem;
    }

    display: flex;
    justify-content: center;
    align-items: flex-end;

    h1 {
        padding-top: 1.5rem;
    }

    @media screen and (max-width: 768px) {
        padding-left: 0.75rem;
    }
`;

export const HeaderBanner = () => {
    const {t} = useTranslation("skjema", {keyPrefix: "globalt"});

    return (
        <StyledAppBanner>
            <Heading level="1" size="xlarge" spacing>
                {t("applikasjonsNavn")}
            </Heading>
        </StyledAppBanner>
    );
};

export default HeaderBanner;
