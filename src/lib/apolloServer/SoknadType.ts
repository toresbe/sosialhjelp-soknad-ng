import {DeepPartial} from "utility-types";
import {Soknad} from "../../generated/apolloServerTypes";

export type SoknadType = DeepPartial<Soknad> & Pick<Soknad, "id">;
