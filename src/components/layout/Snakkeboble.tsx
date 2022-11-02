import styled from "styled-components";
import {MEDIA_QUERY_BREAKPOINT_SMALL} from "../../lib/config";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 7px;
`;

const StyledSnakkeboble = styled.div`
    position: relative;

    @media ${MEDIA_QUERY_BREAKPOINT_SMALL} {
        margin-left: 1rem;
        margin-right: 1rem;
    }
`;

const Innhold = styled.div`
    max-width: 390px;
    border-radius: 0.5rem;
    padding: 1rem;
    background-color: #cde7d8;
    text-align: left;
    line-height: 1.38;
    position: relative;
    z-index: 3;

    .navds-label {
        text-transform: uppercase;
    }
`;

const Arrow = styled.span`
    position: absolute;
    bottom: -0.7rem;
    right: 5.5rem;
    width: 4rem;
    height: 3rem;
    background-color: #cde7d8;
    transform: rotate(90deg) skew(36deg);
    z-index: 2;

    @media screen and (max-width: 390px) {
        right: 17vw;
    }
`;

export const Snakkeboble = ({children}: {children: any}) => (
    <Wrapper>
        <StyledSnakkeboble>
            <Innhold>{children}</Innhold>
            <Arrow aria-hidden="true" />
        </StyledSnakkeboble>
    </Wrapper>
);

export default Snakkeboble;
