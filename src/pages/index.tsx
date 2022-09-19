import type {NextPage} from "next";
import Head from "next/head";
import OpprettSoknad from "../components/OpprettSoknad";
import {SoknadDiv} from "./[behandlingsId]/1";

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Sosialhjelpsøknad</title>
            </Head>

            <main>
                <SoknadDiv>
                    <OpprettSoknad />
                </SoknadDiv>
            </main>
        </div>
    );
};

export default Home;
