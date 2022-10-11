import Telefon from "../../components/personalia/Telefon";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {GetServerSideProps} from "next";
import {Heading} from "@navikt/ds-react";
import styled from "styled-components";
import {useAPITelefon} from "../../lib/hooks/useAPITelefon";
import Head from "next/head";
import {BasisPersonalia} from "../../components/personalia/BasisPersonalia";
import {useAPIPersonalia} from "../../lib/hooks/useAPIPersonalia";
import {useSoknadIdFromRouter} from "../../lib/soknadContext/useSoknadIdFromRouter";

// Just a little div to put the application in a column until we have more defined style
export const SoknadDiv = styled.div`
    max-width: 720px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin: 0 auto;
    padding: 2rem;
`;

export const Page1 = () => {
    const soknadId = useSoknadIdFromRouter();
    const {telefon, setTelefonnummer} = useAPITelefon();
    const {personalia} = useAPIPersonalia(soknadId);

    return (
        <SoknadDiv>
            <Head>
                <title>Sosialhjelpsøknad - Personalia</title>
            </Head>
            <Heading size={"large"}>Sosialhjelpsøknad</Heading>
            <BasisPersonalia personalia={personalia} />
            <Telefon telefon={telefon} onSetTelefonnummer={setTelefonnummer} />
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
