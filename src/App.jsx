import "./App.css";
import { ThemeProvider } from "./contexts/theme-context";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components/navbar/navbar";
import { Footer } from "./components/footer/footer";
import { GlobalStyle } from "./Styles/global-style";

function App() {
  return (
    <>
      <ThemeProvider>
        <GlobalStyle />
        <Navbar />
        <Outlet />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
