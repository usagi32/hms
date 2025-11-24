import { useContext } from "react";
import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ColorModeContext } from "./theme_context";

export function ThemeToggle() {
    const colorMode = useContext(ColorModeContext);
    const isDark = colorMode.mode === "dark";

    return (
        <IconButton
            color="inherit"
            onClick={colorMode.toggleColorMode}
            aria-label="toggle theme"
        >
            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
    );
}
