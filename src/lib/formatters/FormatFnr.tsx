export const formatFnr = (fnr: string) => [fnr.slice(0, 6), fnr.slice(6, 11)].join(" ");
export const screenReaderFnr = (fnr: string) =>
    [fnr.slice(0, 2), fnr.slice(2, 4), fnr.slice(4, 6), fnr.slice(6, 11)].join(", ");
