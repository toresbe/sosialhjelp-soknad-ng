import {useBehandlingsIdFromRouter} from "../../lib/soknadContext/useBehandlingsIdFromRouter";
import {useMutation, useQuery} from "@apollo/client";
import {Adresse, GetOppholdDocument, SetAdresseDocument} from "../../generated/apolloClientTypes";
import {Loader} from "@navikt/ds-react";
import {OppholdInputStaged} from "../../components/personalia/adresse/Adresse";

export const Opphold = () => {
    const behandlingsId = useBehandlingsIdFromRouter();

    const {data, loading} = useQuery(GetOppholdDocument, {variables: {behandlingsId}});
    const [mutate] = useMutation(SetAdresseDocument, {
        refetchQueries: ["getOpphold"],
        awaitRefetchQueries: true,
    });

    const opphold = data?.soknad?.opphold;

    if (loading) return <Loader />;
    if (!opphold) return <Loader />;

    const setOpphold = async (adresse: Pick<Adresse, "valgtAdresse" | "brukerdefinert">) => {
        await mutate({variables: {input: {...adresse, behandlingsId}}});
    };

    return <OppholdInputStaged opphold={opphold} setOpphold={setOpphold} />;
};
