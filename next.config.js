/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config.js');

const nextConfig = {
    reactStrictMode: true,
    i18n,
    images: {
        remotePatterns: [
            {
                hostname: 'main-bvxea6i-33i32kvwbas3y.de-2.platformsh.site',
            },
        ],
    },
    env: {
        BACKEND_URL: process.env.BACKEND_URL,
    },

}

module.exports = nextConfig
