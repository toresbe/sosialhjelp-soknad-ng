// Matrikkeladresse: <gardsnummer>/<bruksnummer>/<ev festenummer>-<ev undernummer>

import {fmtLegacyMatrikkeladresse} from "./fmtLegacyMatrikkeladresse";

test("formats with all members", () => {
    expect(
        fmtLegacyMatrikkeladresse({
            gaardsnummer: "123",
            bruksnummer: "456",
            festenummer: "20",
            undernummer: "1",
        })
    ).toBe("123/456/20-1");
});

test("formats with gaardsnummer, bruksnummer and festenummer", () => {
    expect(
        fmtLegacyMatrikkeladresse({
            gaardsnummer: "123",
            bruksnummer: "456",
            festenummer: "20",
        })
    ).toBe("123/456/20");
});

test("formats with gaardsnummer and bruksnummer", () => {
    expect(
        fmtLegacyMatrikkeladresse({
            gaardsnummer: "123",
            bruksnummer: "456",
        })
    ).toBe("123/456");
});

test("formats without undernummer if festenummer not set", () => {
    expect(
        fmtLegacyMatrikkeladresse({
            gaardsnummer: "123",
            bruksnummer: "456",
            undernummer: "1",
        })
    ).toBe("123/456");
});

test("throws if invalid gaardsnummer or bruksnummer", () => {
    expect(() => fmtLegacyMatrikkeladresse({gaardsnummer: "123", bruksnummer: "A"})).toThrow();
});
