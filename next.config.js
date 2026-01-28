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
    // Configurações otimizadas para Render (512MB limit)
    swcMinify: true, // SWC é mais eficiente que Terser
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    // Reduzir uso de memória durante build
    productionBrowserSourceMaps: false,
    compress: true,
    // Desabilitar otimizações pesadas
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: false,
    },
}

module.exports = nextConfig
