import {fmtNavn} from "./fmtNavn";

test("formats name with mellomnavn", () => {
    expect(
        fmtNavn({
            fornavn: "Tore",
            mellomnavn: "Sinding",
            etternavn: "Bekkedal",
        })
    ).toBe("Tore Sinding Bekkedal"); // hei mamma
});

test("formats name without mellomnavn", () => {
    expect(fmtNavn({fornavn: "Lech", etternavn: "Wałęsa"})).toBe("Lech Wałęsa");
});

test("throws without fornavn or etternavn", () => {
    expect(() => fmtNavn({fornavn: "Ola", etternavn: ""})).toThrow();
});
