import { useTheme } from "../context/ThemeContext";
import "./header.css";

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <header>
      <h1>Where in the world?</h1>
      <button onClick={toggleTheme}>
        {isDarkMode ? "Mode Dark" : "Mode Light"}
      </button>
    </header>
  );
};

export default Header;
