import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import clarity from "@microsoft/clarity";
import { CLARITY_PROJECT_ID } from "./config/env";
import "./styles/global.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <HashRouter>
            <App />
        </HashRouter>
    </StrictMode>
);

if (CLARITY_PROJECT_ID) {
    const initClarity = () => clarity.init(CLARITY_PROJECT_ID);
    if ("requestIdleCallback" in window) {
        window.requestIdleCallback(initClarity, { timeout: 2000 });
    } else {
        setTimeout(initClarity, 1500);
    }
}
