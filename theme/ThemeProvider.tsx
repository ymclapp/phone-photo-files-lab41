//https://medium.com/@ratebseirawan/react-native-dark-mode-done-right-13f83b39a4ca
import * as React from 'react';
import {useColorScheme} from 'react-native-appearance';
import {lightColors, darkColors, Colors} from './colorThemes';

export interface Theme {
    isDark: boolean;
    colors: Colors;
    setScheme: (val: 'dark' | 'light') => void;
}

export const ThemeContext = React.createContext<Theme>({
    isDark: false,
    colors: lightColors,
    setScheme: () => {},
});

export const ThemeProvider: React.FC<{}> = (props) => {
    // Getting the device color theme, this will also work with react-native-web
    const colorScheme = useColorScheme(); // Can be dark | light | no-preference

    /*
    * To enable changing the app theme dynamicly in the app (run-time)
    * we're gonna use useState so we can override the default device theme
    */
    const [isDark, setIsDark] = React.useState<boolean>(colorScheme === "dark");

    // Listening to changes of device appearance while in run-time
    React.useEffect(() => {
        setIsDark(colorScheme === "dark");
    }, [colorScheme]);

    const defaultTheme:  Theme = {
        isDark,
        // Changing color schemes according to theme
        colors: isDark ? darkColors : lightColors,
        // Overrides the isDark value will cause re-render inside the context.  
        setScheme: (scheme) => setIsDark(scheme === "dark"),
    };

  return (
        <ThemeContext.Provider value={defaultTheme}>
            {props.children}
        </ThemeContext.Provider>
    );
};

// Custom hook to get the theme object returns {isDark, colors, setScheme}
export const useTheme = () => React.useContext(ThemeContext);