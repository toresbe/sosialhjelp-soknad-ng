import {parsePhoneNumber} from "awesome-phonenumber";

// Formatterer et telefonnummer etter norske formatteringsregler.
export const fmtPhone = (tlfNr: string) => parsePhoneNumber(tlfNr, "NO").getNumber("national");
