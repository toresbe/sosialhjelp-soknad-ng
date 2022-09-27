import {QuerySoknadArgs, Resolver, Soknad} from "../../../generated/apolloServerTypes";
import {DeepPartial} from "utility-types";

export const resolveSoknad: Resolver<DeepPartial<Soknad>, any, any, QuerySoknadArgs> = async (parent, {id}) => ({id});
