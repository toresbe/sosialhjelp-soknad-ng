import {serverGet} from "../restClients";
import {LegacyPersonalia, LegacyPersonaliaSchema} from "../legacyTypes/personalia";
import {Personalia, Resolver, Soknad} from "../../../generated/apolloServerTypes";
import {DeepPartial} from "utility-types";
import {translatePersonalia} from "../translators/personalia";

export const resolveBasisPersonalia: Resolver<Personalia, DeepPartial<Soknad>> = async (parent, _, context) => {
    const soknadId = parent.id;

    if (!soknadId) throw new Error("soknadId was nullish");

    const data = await serverGet<LegacyPersonalia>(
        `soknader/${soknadId}/personalia/basisPersonalia`,
        LegacyPersonaliaSchema,
        context
    );

    return translatePersonalia(data);
};
