import { jsx as _jsx } from "react/jsx-runtime";
// src/theme/ThemeContext.ts
import { useState, useMemo, createContext, useCallback, } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from './theme';
// ✅ 2. יצירת ה-Context עם ערך התחלתי null
export const CustomThemeContext = createContext(null);
export const CustomThemeProvider = ({ children, }) => {
    const [mode, setMode] = useState('light');
    const toggleColorMode = useCallback(() => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    }, []);
    const theme = useMemo(() => getTheme(mode), [mode]);
    const contextValue = useMemo(() => ({ mode, toggleColorMode }), [mode, toggleColorMode]);
    return (_jsx(CustomThemeContext.Provider, { value: contextValue, children: _jsx(ThemeProvider, { theme: theme, children: children }) }));
};
