/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        OWNCLOUD_URL: process.env.OWNCLOUD_URL,
    },
};

export default nextConfig;
