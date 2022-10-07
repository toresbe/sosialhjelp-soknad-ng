import * as React from "react";
import styled from "styled-components";
import {AdresseFraSystem} from "../../../generated/apolloClientTypes";

const AdresseEtikett = styled.div`
    width: fit-content;
    border: 2px solid #ddd;
    border-radius: 10px;
    padding: 1em;
`;

export interface AdressefeltProps {
    adresse: AdresseFraSystem;
}

export const Adressefelt = ({adresse: {adresseTekst, poststed, postnummer}}: AdressefeltProps) => {
    return (
        <AdresseEtikett className={"h-adr"}>
            <span className="p-street-address">{adresseTekst}</span>
            <br />
            <span className="p-postal-code">{postnummer}</span> <span className="p-locality">{poststed}</span>
        </AdresseEtikett>
    );
};

export default Adressefelt;
