import { createContext, useState, useContext, useEffect } from "react";

// Criação do contexto para o tema
const ThemeContext = createContext();

// Componente que fornece o contexto para os filhos
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Verificar se o tema está salvo no localStorage ao carregar o app
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  // Função para alternar entre o modo claro e escuro
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Atualiza o localStorage com o tema selecionado
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const getAllCountries = async () => {
    setIsLoading(true)
    setError(false)
    setCountries([])

    const res = await fetch(" https://restcountries.com/v3.1/all");
    const data = await res.json();
    setIsLoading(false)

    if (res.status === 404) {
      setError(true);
      return;
    }
    const sortedCountries = data.sort((a, b) => {
      if (a.population < b.population) return 1;
      if (a.population > b.population) return -1;
      return 0;
    });
    setCountries(sortedCountries);
  };

  useEffect(() => {
    getAllCountries();
  }, []); // teste com o countries

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        countries,
        setCountries,
        getAllCountries,
        error,
        setError,
        isLoading, setIsLoading
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Hook customizado para acessar o contexto
export const useTheme = () => useContext(ThemeContext);
