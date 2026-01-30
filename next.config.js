/** @type {import('next').NextConfig} */
const nextConfig = {
    // Static export configuration
    output: 'export',
    trailingSlash: true,

    images: {
        unoptimized: true, // Required for static export
    },

    // Build optimizations
    swcMinify: true,
    compress: true,
    productionBrowserSourceMaps: false,

    // Ignore linting and type errors during build (optional)
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: false,
    },
}

module.exports = nextConfig
