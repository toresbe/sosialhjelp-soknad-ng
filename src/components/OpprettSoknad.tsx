import {useMutation} from "@apollo/client";
import {OpprettSoknadDocument, OpprettSoknadMutation} from "../generated/apollo";

// Just a placeholder page for now.
export const OpprettSoknad = () => {
    const [mutation] = useMutation<OpprettSoknadMutation>(OpprettSoknadDocument);

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

export default OpprettSoknad;
