import styled from "styled-components";

export const Card = styled.div`
  max-width: 120px;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: ${(props) => (props.isVisible ? "translateY(0)" : "translateY(10px)")};
  transition: opacity 0.3s ease, transform 0.3s ease;

  img {
    width: 100%;
  }
`;

export const TypeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 0 20px;
  margin-top: 20px;
  label {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

export const PokeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px 0;
  margin: 20px 0;
  overflow-y: scroll;
  max-height: 450px;
  min-height: 450px;
  scrollbar-width: none;
`;
