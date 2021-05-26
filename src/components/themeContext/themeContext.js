import { useState, useContext, createContext } from "react";
import { GlobalStyle } from "./../globalTheme/globalTheme";

const ThemeColorContext = createContext();
const UpdateThemeContext = createContext();

export const useThemeColor = () => {
  return useContext(ThemeColorContext);
};

export const useUpdateTheme = () => {
  return useContext(UpdateThemeContext);
};

export default function ThemeContext({ children }) {
  const [lightTheme, setLightTheme] = useState(true);

  const toggleThemeColor = () => setLightTheme((theme) => !theme);

  return (
    <ThemeColorContext.Provider value={lightTheme}>
      <UpdateThemeContext.Provider value={toggleThemeColor}>
        <GlobalStyle light={lightTheme} />
        {children}
      </UpdateThemeContext.Provider>
    </ThemeColorContext.Provider>
  );
}
