import fetch, {RequestInit} from "node-fetch";
import {z, ZodType} from "zod";
import {API_BASE_URL, API_BASE_URL_WITH_TOKEN, MOCK_ALT_API_BASE} from "../config";
import logger from "../logger";

// HERE BE DRAGONS: The authentication is incredibly bodged here.
// It works just enough to sort of use it with sosialhjelp-soknad-api
// with mock-alt.

let AuthCookie: string;

const getmockFnr = async () => {
    const url = `${MOCK_ALT_API_BASE}/mock-alt/personalia/liste`;
    const res = await fetch(url);
    const personalia = (await res.json()) as any;
    return personalia[0].fnr;
};

const getAuthCookie = async () => {
    const fnr = await getmockFnr();

    const url = `${MOCK_ALT_API_BASE}/login/cookie?subject=${fnr}&issuerId=selvbetjening&audience=someaudience`;

    const res = await fetch(url);

    return res.headers.raw()["set-cookie"][0].split(";")[0];
};

const getXsrfCookies = async () => {
    const url = "http://localhost:8181/sosialhjelp/soknad-api/soknader/110000001/xsrfCookie";

    const res = await fetch(url, {headers: {Cookie: await getAuthCookie()}});

    if (!res.ok) {
        throw new Error(res.statusText);
    }
    return res.headers.raw()["set-cookie"].map((c) => c.split(";")[0]);
};

const getXsrfToken = async (cookies: any) => {
    return cookies[0].split(";")[0].split("=")[1];
};

getAuthCookie().then((c) => (AuthCookie = c));

export const getApiBaseUrl = (withAccessToken?: boolean) => (withAccessToken ? API_BASE_URL_WITH_TOKEN : API_BASE_URL);

export const serverRequest = async <T>(path: string, method?: string, body?: string, schema?: z.Schema): Promise<T> => {
    const requestUri = getApiBaseUrl(false) + path;

    const headers = new Headers({"Content-Type": "application/json", accept: "application/json, text/plain, */*"});

    const xsrfCookies = await getXsrfCookies();
    headers.set("cookie", [AuthCookie, ...xsrfCookies].join("; "));
    headers.set("X-XSRF-TOKEN", await getXsrfToken(xsrfCookies));

    const options: RequestInit = {
        method,
        headers,
        body,
    };

    const res = await fetch(requestUri, options);

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    if (res.status === 204) return (await res.text()) as any;

    const jsonResponse = await res.json();

    if (schema)
        try {
            return schema.parse(jsonResponse);
        } catch (e: any) {
            logger.warn(`Failed to validate from ${path}: Zod error ${e.toString()}`);
            return jsonResponse as T;
        }
    else return jsonResponse as T;
};

export const serverGet = async <T>(path: string, schema?: ZodType): Promise<T> => {
    return serverRequest<T>(path, undefined, undefined, schema);
};

export const serverPost = async <T>(path: string, body?: string, schema?: ZodType): Promise<T> => {
    return serverRequest<T>(path, "POST", body, schema);
};

export const serverPut = async <T>(path: string, body?: string, schema?: ZodType): Promise<T> => {
    return serverRequest<T>(path, "PUT", body, schema);
};
