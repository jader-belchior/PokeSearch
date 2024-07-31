import styled from "styled-components";

export const StyledButton = styled.button`
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.backgroundColor};
  border: solid 1px ${(props) => props.theme.color};
  padding: 5px 15px;
  cursor: pointer;
`;