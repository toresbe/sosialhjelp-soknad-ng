import {useMutation} from "@apollo/client";
import {NySoknadDocument, NySoknadMutation} from "../generated/apolloClientTypes";
import {useRouter} from "next/router";

// Just a placeholder page for now.
export const NySoknad = () => {
    const [mutation] = useMutation<NySoknadMutation>(NySoknadDocument);
    const router = useRouter();

    return (
        <div>
            <button
                onClick={async () => {
                    const stuff = await mutation();
                    const nySoknadId = stuff.data?.nySoknad.id;
                    router.push(`${nySoknadId}/1`);
                }}
            >
                Opprett søknad
            </button>
        </div>
    );
};

export default NySoknad;
