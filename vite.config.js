import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const now = new Date();
const pad = (n) => String(n).padStart(2, "0");
const buildVersion = [
    now.getUTCFullYear(),
    pad(now.getUTCMonth() + 1),
    pad(now.getUTCDate()),
    pad(now.getUTCHours()) + pad(now.getUTCMinutes()),
].join(".");

export default defineConfig({
    plugins: [react()],
    define: {
        __BUILD_VERSION__: JSON.stringify(buildVersion),
    },
});
