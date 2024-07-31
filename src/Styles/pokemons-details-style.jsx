import styled from "styled-components";

export const UpperCaseh3 = styled.h3`
  text-transform: uppercase;
  margin: 15px 0;
`;

export const ImgDiv = styled.div`
  max-width: 250px;
  margin: auto;
  img {
    max-width: 100%;
  }
`;

export const MovAbContainer = styled.div`
  display: flex;
  margin-bottom: 25px;
`;

export const MovesContainer = styled.div`
  width: 50%;
  div {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 5px;
    max-height: 200px;
    overflow: scroll;
    overflow-y: scroll;
    scrollbar-width: none;
  }
  span {
    display: inline-block;
    padding: 5px 10px;
    margin: 5px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #222222;
    color: white;
    font-size: small;
  }
`;

export const AbContainer = styled.div`
  width: 50%;
  div {
    position: relative;
    margin-bottom: 10px;
    cursor: pointer;
    div {
      position: absolute;
      bottom: 0;
      left: 72%;
      transform: translateX(-50%);
      padding: 10px;
      background-color: black;
      color: white;
      border-radius: 5px;
      white-space: wrap;
      z-index: 1;
      font-size: small;
    }
  }
`;
