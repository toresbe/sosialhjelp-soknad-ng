import Telefon from "../../components/personalia/telefon/Telefon";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {GetServerSideProps} from "next";
import {Heading} from "@navikt/ds-react";
import styled from "styled-components";
import {useTelefon} from "../../lib/hooks/useTelefon";
import Head from "next/head";
import {BasisPersonalia} from "../../components/personalia/BasisPersonalia";
import {usePersonalia} from "../../lib/hooks/usePersonalia";

export const SoknadDiv = styled.div`
    max-width: 720px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin: 0 auto;
    padding: 2rem;
`;

export const Page1 = () => {
    const {telefon, onSetTelefonnummer} = useTelefon();
    const {personalia} = usePersonalia();

    return (
        <SoknadDiv>
            <Head>
                <title>Sosialhjelpsøknad - Personalia</title>
            </Head>
            <Heading size={"large"}>Sosialhjelpsøknad</Heading>
            <BasisPersonalia personalia={personalia} />
            <Telefon telefon={telefon} onSetTelefonnummer={onSetTelefonnummer} />
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
