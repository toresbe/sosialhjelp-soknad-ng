import Telefon from "../../components/personalia/telefon/Telefon";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {GetServerSideProps} from "next";
import {Heading} from "@navikt/ds-react";
import styled from "styled-components";
import {useTelefon} from "../../lib/hooks/useTelefon";

export const SoknadDiv = styled.div`
    max-width: 720px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin: 0 auto;
    padding: 2rem;
`;

export const Page1 = () => {
    return (
        <SoknadDiv>
            <Heading size={"large"}>Sosialhjelpsøknad</Heading>
            <Telefon {...useTelefon()} />
        </SoknadDiv>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {
            ...(await serverSideTranslations("nb")),
        },
    };
};

export default Page1;
