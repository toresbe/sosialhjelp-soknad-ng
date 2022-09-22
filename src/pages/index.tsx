import type {NextPage} from "next";
import Head from "next/head";
import NySoknad from "../components/NySoknad";
import {SoknadDiv} from "./[behandlingsId]/1";

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Sosialhjelpsøknad</title>
            </Head>

            <main>
                <SoknadDiv>
                    <NySoknad />
                </SoknadDiv>
            </main>
        </div>
    );
};

export default Home;
