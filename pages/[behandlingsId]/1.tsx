import Telefon from "../../components/personalia/telefon/Telefon";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {GetServerSideProps} from "next";
import {useBehandlingsId} from "../../lib/useBehandlingsId";
import {SoknadContext} from "../../lib/SoknadContext";

export const Page1 = () => {
    const behandlingsId = useBehandlingsId();

    return (
        <SoknadContext.Provider value={behandlingsId}>
            <Telefon />
        </SoknadContext.Provider>
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
