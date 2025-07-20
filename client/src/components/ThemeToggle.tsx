// src/components/ThemeToggle.tsx
import React, { useContext } from "react";
import { IconButton, Tooltip } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { CustomThemeContext } from "../theme/ThemeContext";

const ThemeToggle: React.FC = () => {
  const context = useContext(CustomThemeContext);

  if (!context) return null; // או אפשרות לטיפול בשגיאה

  const { toggleColorMode, mode } = context;

  return (
    <Tooltip title={mode === "dark" ? "מצב בהיר" : "מצב כהה"}>
      <IconButton onClick={toggleColorMode} color="inherit">
        {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
