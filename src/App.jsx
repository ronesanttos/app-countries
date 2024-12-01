import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { isDarkMode } = useTheme();
  return (
    <div className={`App ${isDarkMode ? "dark" : "light"}`}>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
