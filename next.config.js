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
    }
}

module.exports = nextConfig
