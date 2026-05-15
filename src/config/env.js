const COMMIT_SHA_FULL = import.meta.env.VITE_COMMIT_SHA || "dev";

export const COMMIT_SHA = COMMIT_SHA_FULL.slice(0, 7);
export const BUILD_VERSION = __BUILD_VERSION__;
export const CLARITY_PROJECT_ID = import.meta.env.VITE_CLARITY_PROJECT_ID || "";
