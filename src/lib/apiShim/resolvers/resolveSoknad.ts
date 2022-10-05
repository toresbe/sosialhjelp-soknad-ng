import {QuerySoknadArgs, Resolver, Soknad} from "../../../generated/apolloServerTypes";
import {DeepPartial} from "utility-types";
import {SoknadType} from "../SoknadType";

export const resolveSoknad: Resolver<SoknadType, any, any, QuerySoknadArgs> = async (parent, {id}) => ({id});
