/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { Container } from "../Styles/context-style";

// eslint-disable-next-line react-refresh/only-export-components
export const themes = {
  light: {
    color: "#000000",
    backgroundColor: "#d3d3d3",
  },
  dark: {
    color: "#ffffff",
    backgroundColor: "#000000",
  },
};

export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.dark);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Container theme={theme}>{children}</Container>
    </ThemeContext.Provider>
  );
};


