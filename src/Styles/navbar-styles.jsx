import styled from "styled-components";

export const StyledNav = styled.nav`
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  box-sizing: border-box;
`;

export const DivImg = styled.div`
  position: absolute;
  left: 1.5rem;
  img{
    width: 30px
  }
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 32px;
`;

export const DivTitle = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  text-align: center;
`;

export const DivButton = styled.div`
  position: absolute;
  right: 1.5rem;
  font-size: 12px;
`;
