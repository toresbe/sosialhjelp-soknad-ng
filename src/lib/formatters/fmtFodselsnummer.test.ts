import {fmtFodselsnummer, fmtFodselsnummerForScreenReader} from "./fmtFodselsnummer";

test("Inserts one space in valid fnr", () => {
    expect(fmtFodselsnummer("12345678901")).toBe("123456 78901");
});

test("Throws if not an 11-digit string", () => {
    expect(() => fmtFodselsnummer("")).toThrow(Error);
    expect(() => fmtFodselsnummer("123456a8901")).toThrow(Error);
    expect(() => fmtFodselsnummer("12345678901a")).toThrow(Error);
});

test("Screen reader format is as expected", () => {
    expect(fmtFodselsnummerForScreenReader("12345678901")).toBe("12, 34, 56, 78901");
});

test("Screen reader format throws if not an 11-digit string", () => {
    expect(() => fmtFodselsnummerForScreenReader("")).toThrow(Error);
});
