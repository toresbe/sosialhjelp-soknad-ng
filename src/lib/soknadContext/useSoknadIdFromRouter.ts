import {useRouter} from "next/router";

// Extracts the behandlingsId from request path using next router.
// Throws an error if behandlingsId is not present, or not a string.
export const useSoknadIdFromRouter = () => {
    const router = useRouter();
    const {behandlingsId} = router.query;
    if (typeof behandlingsId !== "string") throw new Error("Ugyldig behandlingsId!");
    return behandlingsId;
};
