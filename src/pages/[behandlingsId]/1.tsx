import {Telefon} from "../../components/personalia/Telefon";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {GetServerSideProps} from "next";
import {BasisPersonalia} from "../../components/personalia/BasisPersonalia";
import {SkjemaSkritt} from "../../components/layout/SkjemaSkritt";
import {Opphold} from "../../components/personalia/adresse/Adresse";
import {useMutation, useQuery} from "@apollo/client";
import {
    GetPersonaliaDocument,
    GetPersonaliaQuery,
    Maybe,
    SetTelefonnummerDocument,
} from "../../generated/apolloClientTypes";

export const Page1 = ({behandlingsId}: {behandlingsId: string}) => {
    const soknadId = behandlingsId;

    const {data} = useQuery<GetPersonaliaQuery>(GetPersonaliaDocument, {variables: {soknadId}});
    const [mutate] = useMutation(SetTelefonnummerDocument);

    // TODO: Metrics for network failures.
    const setTelefonnummer = async (tlfnr: Maybe<string>) => {
        try {
            await mutate({variables: {behandlingsId, input: {brukerdefinert: tlfnr}}});
        } catch (e: any) {
            return e.toString();
        }

        return null;
    };
    if (!data?.soknad) return null;

    const {personalia, opphold, telefon} = data?.soknad;

    return (
        <SkjemaSkritt activeStep={1}>
            <BasisPersonalia personalia={personalia} />
            <Opphold opphold={opphold} />
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
