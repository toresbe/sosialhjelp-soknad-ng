import {restClient} from "../restClients";
import {LegacyPersonalia, LegacyPersonaliaSchema} from "../restSchemas/personalia";
import {Personalia, Resolver, Soknad} from "../../../generated/apolloServerTypes";
import {DeepPartial} from "utility-types";
import {translatePersonalia} from "../translators/personalia";
import {ApolloContextType} from "../apolloServer";

export const resolveBasisPersonalia: Resolver<Personalia, DeepPartial<Soknad>, ApolloContextType> = async (
    parent,
    _,
    {cookies}
) => {
    const soknadId = parent.id;

    if (!soknadId) throw new Error("soknadId was nullish");

    const data = await restClient<LegacyPersonalia>({
        path: `soknader/${soknadId}/personalia/basisPersonalia`,
        schema: LegacyPersonaliaSchema,
        cookies,
    });

    return translatePersonalia(data);
};
