import styled from "styled-components";

// A table styled to be suitable for information obtained from
// systems and registries, presented in tabular form.
//
// Table markup is used hoping it can expose data in a good way
// for screen readers.
export const SysteminfoTabell = styled.table`
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
