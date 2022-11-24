import {QuerySoknadArgs, Resolver, Soknad} from "../../../generated/apolloServerTypes";
import {DeepPartial} from "utility-types";
export type SoknadType = DeepPartial<Soknad> & Pick<Soknad, "id">;

export const resolveSoknad: Resolver<SoknadType, any, any, QuerySoknadArgs> = async (parent, {id}) => ({id});
