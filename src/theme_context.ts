import { createContext } from "react";
import type { ColorMode } from "./theme";

export const ColorModeContext = createContext({
    toggleColorMode: () => {},
    mode: "dark" as ColorMode,
});
