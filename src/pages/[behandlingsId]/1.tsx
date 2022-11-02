import Telefon from "../../components/personalia/Telefon";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {GetServerSideProps} from "next";
import {Heading} from "@navikt/ds-react";
import {useAPITelefon} from "../../lib/hooks/useAPITelefon";
import Head from "next/head";
import {BasisPersonalia} from "../../components/personalia/BasisPersonalia";
import {useAPIPersonalia} from "../../lib/hooks/useAPIPersonalia";
import {useSoknadIdFromRouter} from "../../lib/soknadContext/useSoknadIdFromRouter";
import {SkjemaSkritt} from "../../components/layout/SkjemaSkritt";

export const Page1 = () => {
    const soknadId = useSoknadIdFromRouter();
    const {telefon, setTelefonnummer} = useAPITelefon();
    const {personalia} = useAPIPersonalia(soknadId);

    return (
        <SkjemaSkritt activeStep={1}>
            <Head>
                <title>Sosialhjelpsøknad - Personalia</title>
            </Head>
            <Heading size={"large"}>Sosialhjelpsøknad</Heading>
            <BasisPersonalia personalia={personalia} />
            <Telefon telefon={telefon} onSetTelefonnummer={setTelefonnummer} />
        </SkjemaSkritt>
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
