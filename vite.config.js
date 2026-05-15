import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const pad = (n) => String(n).padStart(2, "0");
const computeCalVer = () => {
    const now = new Date();
    return [
        now.getUTCFullYear(),
        pad(now.getUTCMonth() + 1),
        pad(now.getUTCDate()),
        pad(now.getUTCHours()) + pad(now.getUTCMinutes()),
    ].join(".");
};
const buildVersion = process.env.VITE_BUILD_VERSION || computeCalVer();

export default defineConfig({
    plugins: [react()],
    define: {
        __BUILD_VERSION__: JSON.stringify(buildVersion),
    },
});
