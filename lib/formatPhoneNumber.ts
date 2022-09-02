import {parsePhoneNumber} from "awesome-phonenumber";

export const formatPhoneNumber = (tlfNr: string) => parsePhoneNumber(tlfNr, "NO").getNumber("national");
