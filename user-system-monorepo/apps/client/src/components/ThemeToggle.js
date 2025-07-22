import { jsx as _jsx } from "react/jsx-runtime";
// src/components/ThemeToggle.tsx
import { useContext } from "react";
import { IconButton, Tooltip } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { CustomThemeContext } from "../theme/ThemeContext";
const ThemeToggle = () => {
    const context = useContext(CustomThemeContext);
    if (!context)
        return null; // או אפשרות לטיפול בשגיאה
    const { toggleColorMode, mode } = context;
    return (_jsx(Tooltip, { title: mode === "dark" ? "מצב בהיר" : "מצב כהה", children: _jsx(IconButton, { onClick: toggleColorMode, color: "inherit", children: mode === "dark" ? _jsx(LightModeIcon, {}) : _jsx(DarkModeIcon, {}) }) }));
};
export default ThemeToggle;
