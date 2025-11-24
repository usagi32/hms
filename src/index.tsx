import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeWrapper } from "./theme";
import { BoxWrapper } from "./style_wrapper";

const container = document.getElementById("root");
if (!container) {
    throw new Error("Root element #root not found in index.html");
}

const root = createRoot(container);

root.render(
    <React.StrictMode>
        <ThemeWrapper>
            <BoxWrapper>
                <CssBaseline />
                <App />
            </BoxWrapper>
        </ThemeWrapper>
    </React.StrictMode>,
);
