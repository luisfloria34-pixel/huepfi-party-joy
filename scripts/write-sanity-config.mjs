import { writeFile } from "node:fs/promises";

const config = {
  projectId: process.env.VITE_SANITY_PROJECT_ID || "",
  dataset: process.env.VITE_SANITY_DATASET || "production",
  apiVersion: process.env.VITE_SANITY_API_VERSION || "2026-03-01",
  useCdn: process.env.VITE_SANITY_USE_CDN !== "false",
};

await writeFile(
  "public/sanity-config.js",
  `window.HUEPFI_SANITY_CONFIG = ${JSON.stringify(config, null, 2)};\n`,
);
