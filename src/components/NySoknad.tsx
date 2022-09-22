import {useMutation} from "@apollo/client";
import {NySoknadDocument, NySoknadMutation} from "../generated/apollo";

// Just a placeholder page for now.
export const NySoknad = () => {
    const [mutation] = useMutation<NySoknadMutation>(NySoknadDocument);

    return (
        <div>
            <button
                onClick={async () => {
                    console.log(await mutation());
                }}
            >
                Opprett søknad
            </button>
        </div>
    );
};

export default NySoknad;
