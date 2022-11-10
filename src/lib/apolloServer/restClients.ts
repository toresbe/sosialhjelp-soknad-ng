import {z, ZodType} from "zod";
import {API_BASE_URL, API_BASE_URL_WITH_TOKEN} from "../config";
import logger from "../logger";
import {LoginRedirectSchema} from "../legacyTypes/loginRedirect";
import {HttpMethod} from "undici/types/dispatcher";
import {RequestCookies} from "next/dist/server/web/spec-extension/cookies";

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

    // TODO: Handle 409 Conflict with retries
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
                // TODO: Examine the security implications of logging this way
                if (e instanceof z.ZodError) logger.warn(`Failed to validate from ${path}: Zod error ${e.toString()}`);

                return jsonResponse as T;
            }
    }
};

export interface ServerRequest {
    method?: HttpMethod;
    path: string;
    body?: string;
    schema?: ZodType;
    cookies?: CookiesType;
}

// Converts from NextJS cookie object to Record<string,string>.
// Next.JS stores its cookies using a special object, but we use Record<string, string> in our requests
export const convertNextJSCookiesToRecord = (cookies: RequestCookies): Record<string, string> => {
    const convertedCookies: Record<string, string> = {};
    cookies.getAll().forEach((c) => (convertedCookies[c.name] = c.value));
    return convertedCookies;
};

export const RESTRequest = async <T>({method = "GET", path, body, schema, cookies}: ServerRequest): Promise<T> =>
    serverRequest<T>(path, method, body, schema, cookies);
