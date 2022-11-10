import type {NextPage} from "next";
import Head from "next/head";
import NySoknad from "../components/informasjon/NySoknad";
import {SoknadDiv} from "../components/layout/SoknadDiv";
import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Sosialhjelpsøknad</title>
            </Head>

            <SoknadDiv>
                <NySoknad />
            </SoknadDiv>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {
            ...(await serverSideTranslations("nb")),
        },
    };
};

export default Home;
