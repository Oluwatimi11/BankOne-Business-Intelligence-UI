import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },
    env: {},
    basePath: "/dashboard-mgt"
};

export default nextConfig;
