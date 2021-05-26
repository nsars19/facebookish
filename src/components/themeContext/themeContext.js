import { useState, useContext, createContext } from "react";
import { GlobalStyle } from "./../globalTheme/globalTheme";
import Cookies from "universal-cookie";

const ThemeColorContext = createContext();
const UpdateThemeContext = createContext();

export const useThemeColor = () => {
  return useContext(ThemeColorContext);
};

export const useUpdateTheme = () => {
  return useContext(UpdateThemeContext);
};

const cookies = new Cookies();

export default function ThemeContext({ children }) {
  const isLight = cookies.get("light") === "true" ? true : false;
  const [lightTheme, setLightTheme] = useState(isLight);

  const toggleThemeColor = () => {
    cookies.set("light", !lightTheme);
    setLightTheme((theme) => !theme);
  };

  return (
    <ThemeColorContext.Provider value={lightTheme}>
      <UpdateThemeContext.Provider value={toggleThemeColor}>
        <GlobalStyle light={lightTheme} />
        {children}
      </UpdateThemeContext.Provider>
    </ThemeColorContext.Provider>
  );
}
