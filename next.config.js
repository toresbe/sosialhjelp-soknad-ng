/** @type {import('next').NextConfig} */

const {i18n} = require("./next-i18next.config");

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    basePath: "/sosialhjelp/soknad",
    i18n,
};

module.exports = nextConfig;
