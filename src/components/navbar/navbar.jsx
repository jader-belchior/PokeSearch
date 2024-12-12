import { Link } from "react-router-dom";
import { ThemeTogglerButton } from "../theme-toggler-button/theme-toggler-button";
import { ThemeContext } from "../../contexts/theme-context";
import { useContext } from "react";
import {
  StyledNav,
  DivButton,
  DivImg,
  DivTitle,
  Title,
} from "../../Styles/navbar-styles";

export const Navbar = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <StyledNav theme={theme}>

      <DivImg>
        <Link to="/">
          <img src="../../../pokeball.png" alt="pokeball" />
        </Link>
      </DivImg>

      <DivTitle>
        <Link to="/" style={{ color: theme.color }}>
          <Title>PokeSearch</Title>
        </Link>
      </DivTitle>

      <DivButton>
        <ThemeTogglerButton />
      </DivButton>
      
    </StyledNav>
  );
};
