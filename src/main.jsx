import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import clarity from "@microsoft/clarity";
import { CLARITY_PROJECT_ID } from "./config/env";
import "./styles/global.css";
import App from "./App.jsx";

const container = document.getElementById("root");
const app = (
    <StrictMode>
        <HashRouter>
            <App />
        </HashRouter>
    </StrictMode>
);

// The build pre-renders the home page into #root (scripts/prerender.mjs).
// Hydrate that markup when it is for the route being opened; a deep link to a
// hash route such as /#/work renders from scratch instead.
const route = window.location.hash.replace(/^#/, "") || "/";
if (container.hasChildNodes() && route.split(/[?#]/)[0] === "/") {
    hydrateRoot(container, app);
} else {
    container.textContent = "";
    createRoot(container).render(app);
}

if (CLARITY_PROJECT_ID) {
    const initClarity = () => clarity.init(CLARITY_PROJECT_ID);
    if ("requestIdleCallback" in window) {
        window.requestIdleCallback(initClarity, { timeout: 2000 });
    } else {
        setTimeout(initClarity, 1500);
    }
}
