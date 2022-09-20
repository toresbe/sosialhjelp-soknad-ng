import * as env from "env-var";

export const API_BASE_URL = env.get("NEXT_PUBLIC_API_BASE").required().asString();
export const API_BASE_URL_WITH_TOKEN = env.get("NEXT_PUBLIC_API_BASE").required().asString();

export const MOCK_ALT_API_BASE = "http://localhost:8989/sosialhjelp/mock-alt-api";
