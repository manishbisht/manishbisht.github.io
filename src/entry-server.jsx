import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App.jsx";

// Used only at build time by scripts/prerender.mjs to turn the home page into
// real HTML, so crawlers and AI agents that do not run JavaScript still read
// the full page. The browser then hydrates that markup in src/main.jsx.
export function render(url = "/") {
    return renderToString(
        <StrictMode>
            <StaticRouter location={url}>
                <App />
            </StaticRouter>
        </StrictMode>
    );
}
