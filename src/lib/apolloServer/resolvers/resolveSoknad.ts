import {QuerySoknadArgs, Resolver} from "../../../generated/apolloServerTypes";
import {SoknadType} from "../SoknadType";

export const resolveSoknad: Resolver<SoknadType, any, any, QuerySoknadArgs> = async (parent, {id}) => ({id});
