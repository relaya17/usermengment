// src/hooks/useColorMode.ts
import { useContext } from "react";
import { CustomThemeContext } from "../theme/ThemeContext"; // וודא ייבוא נכון

export const useColorMode = () => {
    const context = useContext(CustomThemeContext);

    if (!context) {
        // חשוב: בדיקה לוודא שה-hook משמש בתוך ה-Provider המתאים
        throw new Error('useColorMode must be used within a CustomThemeProvider');
    }

    // 🆕 החזרת האובייקט mode ו-toggleColorMode באופן מפורש
    return {
        mode: context.mode,
        toggleColorMode: context.toggleColorMode,
    };
};
