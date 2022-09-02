import * as env from "env-var";
import fetch, {RequestInit} from "node-fetch";

const API_BASE_URL = env.get("NEXT_PUBLIC_API_BASE").required().asString();
const API_BASE_URL_WITH_TOKEN = env.get("NEXT_PUBLIC_API_BASE").required().asString();
const MOCK_ALT_API_BASE = "http://localhost:8989/sosialhjelp/mock-alt-api";

let AuthCookie: string;

const getAuthCookie = async () => {
    const url = MOCK_ALT_API_BASE + "/login/cookie?subject=26104523861&issuerId=selvbetjening&audience=someaudience";

    const res = await fetch(url);

    return res.headers.raw()["set-cookie"][0].split(";")[0];
};

const getXsrfCookies = async (AuthCookie: string) => {
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

export const serverRequest = async <T>(path: string, method?: string, body?: string): Promise<T> => {
    const requestUri = getApiBaseUrl(false) + path;

    const headers = new Headers({"Content-Type": "application/json", accept: "application/json, text/plain, */*"});

    const xsrfCookies = await getXsrfCookies(AuthCookie);
    const lol = "amp_defaul=_ZR8BiWvKBOwdr-0U343iT...1gba6mk7j.1gba6qthg.1.0.1";
    headers.set("cookie", [AuthCookie, lol, ...xsrfCookies].join("; "));
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

    if (res.status === 204) return res.text() as Promise<any>;

    return res.json() as Promise<T>;
};

export const serverGet = async <T>(path: string): Promise<T> => {
    return serverRequest<T>(path);
};

export const serverPost = async <T>(path: string, body?: string): Promise<T> => {
    return serverRequest<T>(path, "POST", body);
};

export const serverPut = async <T>(path: string, body?: string): Promise<T> => {
    return serverRequest<T>(path, "PUT", body);
};
