import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {convertNextJSCookiesToRecord, HTTPUnauthorized, RESTRequest} from "./lib/apolloServer/restClients";
import {LegacyTilgangResponse, LegacyTilgangResponseSchema} from "./lib/legacyTypes/statusInformation";

const RequireSession = async (req: NextRequest) => {
    try {
        await RESTRequest<LegacyTilgangResponse>({
            path: `informasjon/utslagskriterier/sosialhjelp`,
            schema: LegacyTilgangResponseSchema,
            cookies: convertNextJSCookiesToRecord(req.cookies),
        });

        return NextResponse.next();
    } catch (e: any) {
        if (e instanceof HTTPUnauthorized) {
            const loginUrl = new URL(e.loginUrl);

            // Set "redirect" parameter to the page the user attempted to load.
            loginUrl.searchParams.set("redirect", req.url);

            return NextResponse.redirect(loginUrl);
        }

        throw e;
    }
};

// OBS: middleware() under invokeres av NextJS ved alle requests.
// TODO: Her bør sannsynligvis NAV-dekoratoren inn på noe vis?
// Før hver sidelasting gjør vi en request mot backend med cookies sendt av browseren.
// Om den bouncer oss til login, så følger vi den lenken.
export const middleware = async (req: NextRequest) => {
    return await RequireSession(req);
};
