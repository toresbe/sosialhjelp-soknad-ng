import {useQuery} from "@apollo/client";
import {GetPersonaliaDocument, GetPersonaliaQuery} from "../../generated/apolloClientTypes";
import {BasisPersonaliaProps} from "../../components/personalia/BasisPersonalia";

interface useAPIPersonaliaResult {}

// This hook
export const useAPIPersonalia = (soknadId: string): BasisPersonaliaProps => {
    const {data, error} = useQuery<GetPersonaliaQuery>(GetPersonaliaDocument, {variables: {soknadId}});

    return {
        personalia: data?.soknad?.personalia,
    };
};
