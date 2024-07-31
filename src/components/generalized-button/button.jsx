import { useContext } from "react"
import { ThemeContext } from "../../contexts/theme-context"
import { StyledButton } from "../../Styles/button-style";


export const Button = (props) => {
  const { theme } = useContext(ThemeContext);

  return <StyledButton theme={theme} {...props} />;
};


