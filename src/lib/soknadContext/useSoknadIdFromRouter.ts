import {useRouter} from "next/router";

// React hook, obtains behandlingsId from request path via next/router.
// Throws an error if behandlingsId is not present, or not a string.
export const useSoknadIdFromRouter = () => {
    const router = useRouter();
    const {behandlingsId} = router.query;
    if (typeof behandlingsId !== "string") throw new Error("Ugyldig behandlingsId!");
    return behandlingsId;
};
