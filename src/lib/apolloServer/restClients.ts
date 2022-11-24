import {z} from "zod";
import {API_BASE_URL, API_BASE_URL_WITH_TOKEN} from "../config";
import logger from "../logger";
import {LoginRedirectSchema} from "./restSchemas/loginRedirect";
import {HttpMethod} from "undici/types/dispatcher";
import {RequestCookies} from "next/dist/server/web/spec-extension/cookies";

export const getApiBaseUrl = (withAccessToken?: boolean) => (withAccessToken ? API_BASE_URL_WITH_TOKEN : API_BASE_URL);

type CookiesType = Partial<{[key: string]: string}>;

// Custom exception used to obtain loginUrl in case we are redirected to auth during a request.
export class HTTPUnauthorized extends Error {
    public readonly loginUrl: string;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, HTTPUnauthorized.prototype);
        const {loginUrl} = LoginRedirectSchema.parse(JSON.parse(message));
        this.loginUrl = loginUrl;
    }
}

// Throws HTTPUnauthorized on 401
export const restClient = async <T>({path, method = "GET", body, schema, cookies}: ServerRequest): Promise<T> => {
    const requestUri = getApiBaseUrl(false) + path;

    const headers = new Headers({"Content-Type": "application/json", accept: "application/json, text/plain, */*"});

    if (cookies)
        headers.set(
            "cookie",
            Object.entries(cookies)
                .map(([key, value]) => `${key}=${value}`)
                .join(";")
        );

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
                return schema.parse(jsonResponse) as T;
            } catch (e: any) {
                // TODO: Examine the security implications of logging this way
                if (e instanceof z.ZodError) logger.warn(`Failed to validate ${path}: Zod error ${e.toString()}`);

                return jsonResponse as T;
            }
    }
};

export interface ServerRequest {
    path: string; // The API base url is prepended by restClient
    method?: HttpMethod;
    body?: string;
    schema?: z.Schema; // Optional schema against which to validate data. Will only log a warning on mismatch.
    cookies?: CookiesType; // Request cookies
}

// Converts from NextJS cookie object to Record<string,string>.
// Next.JS stores its cookies using a special object, but we use Record<string, string> in our requests
export const convertNextJSCookiesToRecord = (cookies: RequestCookies): Record<string, string> => {
    const convertedCookies: Record<string, string> = {};
    cookies.getAll().forEach((c) => (convertedCookies[c.name] = c.value));
    return convertedCookies;
};
