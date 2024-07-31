import styled from "styled-components";

export const Container = styled.div`
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.backgroundColor};
  padding: 10px;
  min-height: 100vh;
`;