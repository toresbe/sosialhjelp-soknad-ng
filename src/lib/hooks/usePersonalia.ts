import {useQuery} from "@apollo/client";
import {GetPersonaliaDocument, GetPersonaliaQuery} from "../../generated/apolloClientTypes";
import {useSoknadIdFromRouter} from "../soknadContext/useSoknadIdFromRouter";
import {BasisPersonaliaProps} from "../../components/personalia/BasisPersonalia";

export const usePersonalia = (): BasisPersonaliaProps => {
    const soknadId = useSoknadIdFromRouter();

    const {data} = useQuery<GetPersonaliaQuery>(GetPersonaliaDocument, {variables: {soknadId}});

    return {
        personalia: data?.soknad?.personalia,
    };
};
