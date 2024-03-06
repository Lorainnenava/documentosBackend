/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        OWNCLOUD_URL: process.env.OWNCLOUD_URL,
    },
    modules: true,
    images: {
        domains: ["localhost"], // Agrega el dominio de la URL de la imagen
    },
};

export default nextConfig;
