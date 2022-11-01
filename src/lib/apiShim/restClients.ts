import {z, ZodType} from "zod";
import {API_BASE_URL, API_BASE_URL_WITH_TOKEN} from "../config";
import logger from "../logger";
import {LoginRedirectSchema} from "./legacyTypes/loginRedirect";

export const getApiBaseUrl = (withAccessToken?: boolean) => (withAccessToken ? API_BASE_URL_WITH_TOKEN : API_BASE_URL);

export class HTTPUnauthorized extends Error {
    public readonly loginUrl: string;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, HTTPUnauthorized.prototype);
        const {loginUrl} = LoginRedirectSchema.parse(JSON.parse(message));
        this.loginUrl = loginUrl;
    }
}
type CookiesType = Partial<{[key: string]: string}>;

export const serverRequest = async <T>(
    path: string,
    method?: string,
    body?: string,
    schema?: z.Schema,
    cookies?: CookiesType
): Promise<T> => {
    const requestUri = getApiBaseUrl(false) + path;

    const headers = new Headers({"Content-Type": "application/json", accept: "application/json, text/plain, */*"});

    if (cookies)
        headers.set(
            "cookie",
            Object.entries(cookies)
                .map(([key, value]) => `${key}=${value}`)
                .join(";")
        );

    //headers.set("X-XSRF-TOKEN", await getXsrfToken(await getXsrfCookies(cookies)));

    const options: RequestInit = {
        method,
        headers,
        body,
    };

    const res = await fetch(requestUri, options);

    switch (res.status) {
        case 204:
            return (await res.text()) as any;
        case 401:
            throw new HTTPUnauthorized(await res.text());
        default:
            if (!res.ok) {
                logger.warn(`${method || "GET"} "${path}" failed: ${res.status} ${await res.text()}`);
                throw new Error(res.statusText);
            }

            const jsonResponse = await res.json();

            if (!schema) return jsonResponse as T;

            try {
                return schema.parse(jsonResponse);
            } catch (e: any) {
                logger.warn(`Failed to validate from ${path}: Zod error ${e.toString()}`);
                return jsonResponse as T;
            }
    }
};

export const serverGet = async <T>(path: string, schema?: ZodType, cookies?: CookiesType): Promise<T> => {
    return serverRequest<T>(path, undefined, undefined, schema, cookies);
};

export const serverPost = async <T>(
    path: string,
    body?: string,
    schema?: ZodType,
    cookies?: CookiesType
): Promise<T> => {
    return serverRequest<T>(path, "POST", body, schema, cookies);
};

export const serverPut = async <T>(
    path: string,
    body?: string,
    schema?: ZodType,
    cookies?: CookiesType
): Promise<T> => {
    return serverRequest<T>(path, "PUT", body, schema, cookies);
};
