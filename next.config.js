/** @type {import('next').NextConfig} */

const {i18n} = require("./next-i18next.config");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    basePath: "/sosialhjelp/soknad",
    compiler: {
        styledComponents: true,
    },
    i18n,
};

module.exports = withBundleAnalyzer(nextConfig);
