import {parsePhoneNumber} from "awesome-phonenumber";

export const checkTelefonnummer = (tlfNr: string): string | null => {
    parsePhoneNumber(tlfNr);
    // TODO
    return null;
};
