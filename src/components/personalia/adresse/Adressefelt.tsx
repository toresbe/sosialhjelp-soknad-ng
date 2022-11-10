import * as React from "react";
import {AdresseFraSystem} from "../../../generated/apolloClientTypes";
import {Maybe} from "@graphql-tools/utils";

export interface AdressefeltProps {
    className?: string;
    adresse: Maybe<AdresseFraSystem>;
}

export const Adressefelt = ({className, adresse}: AdressefeltProps) => {
    if (!adresse) return null;

    const {adresseTekst, poststed, postnummer} = adresse;

    return (
        <div className={"h-adr " + className ?? ""}>
            <span className="p-street-address">{adresseTekst}</span>
            <br />
            <span className="p-postal-code">{postnummer}</span> <span className="p-locality">{poststed}</span>
        </div>
    );
};

export default Adressefelt;
