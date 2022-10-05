import {useQuery} from "@apollo/client";
import {GetPersonaliaDocument, GetPersonaliaQuery} from "../../generated/apolloClientTypes";
import {useSoknadIdFromRouter} from "../soknadContext/useSoknadIdFromRouter";
import {BasisPersonaliaProps} from "../../components/personalia/BasisPersonalia";

export const usePersonalia = (): BasisPersonaliaProps => {
    const soknadId = useSoknadIdFromRouter();

    const {data, error} = useQuery<GetPersonaliaQuery>(GetPersonaliaDocument, {variables: {soknadId}});

    console.log({data, error});
    return {
        personalia: data?.soknad?.personalia,
    };
};
