import { createContext, useState, useContext, useEffect } from 'react';

// Criação do contexto para o tema
const ThemeContext = createContext();

// Componente que fornece o contexto para os filhos
export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Verificar se o tema está salvo no localStorage ao carregar o app
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        }
    }, []);

    // Função para alternar entre o modo claro e escuro
    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    // Atualiza o localStorage com o tema selecionado
    useEffect(() => {
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Hook customizado para acessar o contexto
export const useTheme = () => useContext(ThemeContext);
