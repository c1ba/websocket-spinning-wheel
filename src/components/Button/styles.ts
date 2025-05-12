import styled from "styled-components";

export const StyledButton = styled.button<{disabled?: boolean}>`
    min-width: 320px;
    border: none;
    text-decoration: none;
    background-color: ${({disabled}) => disabled ? '#909090' : '#fff'};
    color: ${({disabled}) => disabled ? '#252525' : '#000'};
    cursor: ${({disabled}) => disabled ? 'default' : 'pointer'};

    &:focus, &:focus-visible {
        outline: solid 2px #fff;
        outline-offset: 2px;
    }
`