/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '2mb',
        },
    },
    // Configurações para deploy no Render
    swcMinify: false,
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
}

module.exports = nextConfig
