//https://medium.com/@ratebseirawan/react-native-dark-mode-done-right-13f83b39a4ca
import * as React from 'react';
import {Switch} from 'react-native';
import {useTheme} from '../components/Theme';

export const Toggle = () => {
    // We're also pulling setScheme here!
    const {setScheme, isDark} = useTheme();

    const toggleScheme = () => {
        /*
        * setScheme will change the state of the context
        * thus will cause childrens inside the context provider to re-render
        * with the new color scheme
        */
        isDark ? setScheme('light') : setScheme('dark');
    }

    return (
        <Switch value={isDark} onValueChange={toggleScheme}/>
    );
}