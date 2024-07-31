import { useContext } from "react";
import { ThemeContext, themes } from "../../contexts/theme-context";
import { Button } from "../generalized-button/button";

export const ThemeTogglerButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div>
      <Button
        onClick={() => {
          setTheme(theme === themes.dark ? themes.light : themes.dark);
        }}
      >
        {theme === themes.dark ? "Dark" : "Light"}
      </Button>
    </div>
  );
};
