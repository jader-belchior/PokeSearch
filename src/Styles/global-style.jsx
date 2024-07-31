import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{margin: 0;
    padding: 0;
    box-sizing: border-box;}
    a{
        text-decoration: none;
        color: ${(props) => props.color ? props.color : 'gray'};
        &:hover{
        color: ${(props) => props.color ? props.color : 'gray'};

        }
    }
`;
