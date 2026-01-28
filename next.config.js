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
    // Configurações para deploy no Render (otimizado para 512MB RAM)
    swcMinify: false,
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    // Desabilitar source maps em produção para economizar memória
    productionBrowserSourceMaps: false,
    // Otimizar tamanho do build
    compress: true,
    // Reduzir uso de memória
    generateBuildId: async () => {
        return 'build-' + Date.now()
    },
}

module.exports = nextConfig
