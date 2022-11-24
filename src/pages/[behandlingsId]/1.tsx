import {Telefon} from "../../components/personalia/Telefon";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {GetServerSideProps} from "next";
import {BasisPersonalia} from "../../components/personalia/BasisPersonalia";
import {SkjemaSkritt} from "../../components/layout/SkjemaSkritt";
import {useMutation, useQuery} from "@apollo/client";
import {
    GetPersonaliaDocument,
    GetPersonaliaQuery,
    Maybe,
    SetTelefonnummerDocument,
} from "../../generated/apolloClientTypes";
import {Opphold} from "./Opphold";

export const Page1 = ({behandlingsId}: {behandlingsId: string}) => {
    const {data} = useQuery<GetPersonaliaQuery>(GetPersonaliaDocument, {variables: {behandlingsId}});
    const [mutate] = useMutation(SetTelefonnummerDocument);

    // TODO: Metrics for network failures.
    const setTelefonnummer = async (tlfnr: Maybe<string>) => {
        try {
            await mutate({variables: {input: {behandlingsId, brukerdefinert: tlfnr}}});
        } catch (e: any) {
            return e.toString();
        }

        return null;
    };

    if (!data?.soknad) return null;

    const {personalia, telefon} = data?.soknad;

    return (
        <SkjemaSkritt activeStep={1}>
            <BasisPersonalia personalia={personalia} />
            <Opphold />
            <Telefon telefon={telefon} onSetTelefonnummer={setTelefonnummer} />
        </SkjemaSkritt>
    );
};

export const getServerSideProps: GetServerSideProps = async ({query}) => {
    const {behandlingsId} = query;
    return {
        props: {
            behandlingsId,
            ...(await serverSideTranslations("nb")),
        },
    };
};

export default Page1;
