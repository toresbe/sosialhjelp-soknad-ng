// Must be exactly 11 digits
const FodselsnummerPattern = new RegExp(/^\d{11}$/);

export const fmtFodselsnummer = (fnr: string) => {
    if (!FodselsnummerPattern.test(fnr)) throw new Error("got fodselsnummer != 11 digits");

    return [fnr.slice(0, 6), fnr.slice(6, 11)].join(" ");
};

// TODO: Ask D. Hole how a fodsselsnummer should be formatted for screen readers
export const fmtFodselsnummerForScreenReader = (fnr: string) => {
    if (!FodselsnummerPattern.test(fnr)) throw new Error("got fodselsnummer != 11 digits");

    return [fnr.slice(0, 2), fnr.slice(2, 4), fnr.slice(4, 6), fnr.slice(6, 11)].join(", ");
};
