import {useMutation, useQuery} from "@apollo/client";
import {
    GetTelefonDocument,
    GetTelefonQuery,
    Maybe,
    SetTelefonnummerDocument,
    SetTelefonnummerMutation,
} from "../../generated/apolloClientTypes";

import {useSoknadIdFromRouter} from "../soknadContext/useSoknadIdFromRouter";

// React hook for applicant telephone data via GraphQL API
export const useTelefon = () => {
    const soknadId = useSoknadIdFromRouter();

    const {data} = useQuery<GetTelefonQuery>(GetTelefonDocument, {variables: {soknadId}});
    const [mutate] = useMutation<SetTelefonnummerMutation>(SetTelefonnummerDocument, {variables: {soknadId}});

    // TODO: Metrics for network failures.
    const setTelefonnummer = async (tlfNr: Maybe<string>) => {
        try {
            await mutate({variables: {tlfNr}});
        } catch (e: any) {
            return e.toString();
        }

        return null;
    };

    return {
        // Telephony data
        telefon: data?.soknad?.telefon,
        // Callback to modify user-defined number
        setTelefonnummer,
    };
};
