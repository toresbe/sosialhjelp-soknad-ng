import styled from "styled-components";

export const RegisterdataTabell = styled.table`
    width: 100%;
    caption {
        text-align: left;
        padding-bottom: 0.75em;
    }
    tr {
        margin-bottom: 0.5em;
        display: flex;
    }
    th {
        text-align: right;
        padding-right: 1.5em;
        display: block;
        flex-basis: 30%;
    }
    td {
        flex-grow: 1;
        display: block;
    }
`;