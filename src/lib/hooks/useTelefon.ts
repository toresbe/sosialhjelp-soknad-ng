import {useMutation, useQuery} from "@apollo/client";
import {
    GetTelefonDocument,
    GetTelefonQuery,
    Maybe,
    SetTelefonnummerDocument,
    SetTelefonnummerMutation,
} from "../../generated/apollo";
import {TelefonProps} from "../../components/personalia/telefon/Telefon";
import {useSoknadIdFromRouter} from "../soknadContext/useSoknadIdFromRouter";

export const useTelefon = (): TelefonProps => {
    const soknadId = useSoknadIdFromRouter();

    const {data} = useQuery<GetTelefonQuery>(GetTelefonDocument, {variables: {soknadId}});
    const [mutate] = useMutation<SetTelefonnummerMutation>(SetTelefonnummerDocument, {variables: {soknadId}});

    const onSetTelefonnummer = async (tlfNr: Maybe<string>) => {
        try {
            await mutate({variables: {tlfNr}});
        } catch (e: any) {
            return e.toString();
        }

        return null;
    };

    return {
        telefon: data?.soknad?.telefon,
        onSetTelefonnummer,
    };
};
