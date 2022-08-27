import Telefon from "../../components/personalia/Telefon";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {GetServerSideProps} from "next";

export const Page1 = () => {
    return <Telefon />;
};

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {
            ...(await serverSideTranslations("nb")),
        },
    };
};

export default Page1;
