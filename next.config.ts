import type { NextConfig } from "next";

const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim()
  .replace(/^\/+/, "")
  .replace(/\/+$/, "");

const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: configuredBasePath ? `/${configuredBasePath}` : "",
};

export default config;
