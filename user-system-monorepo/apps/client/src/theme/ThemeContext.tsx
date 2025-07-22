// src/theme/ThemeContext.ts
import React, {
  useState,
  useMemo,
  createContext,
  ReactNode,
  useCallback,
} from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from './theme';

// ✅ 1. הגדרת הממשק של ה-Context
export interface CustomThemeContextType {
  mode: 'light' | 'dark';
  toggleColorMode: () => void;
}

// ✅ 2. יצירת ה-Context עם ערך התחלתי null
export const CustomThemeContext = createContext<CustomThemeContextType | null>(
  null
);

// ✅ 3. קומפוננטת ה-Provider שמספקת Theme וקונטקסט
interface CustomThemeProviderProps {
  children: ReactNode;
}

export const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({
  children,
}) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const toggleColorMode = useCallback(() => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  const theme = useMemo(() => getTheme(mode), [mode]);

  const contextValue = useMemo(
    () => ({ mode, toggleColorMode }),
    [mode, toggleColorMode]
  );

  return (
    <CustomThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};
