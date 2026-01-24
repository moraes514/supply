'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function HeroBanner() {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
            {/* Background Glow Effect */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-96 h-96 bg-orange-primary/20 rounded-full blur-[120px] animate-glow-pulse" />
            </div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative z-10 text-center"
            >
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-8 flex justify-center"
                >
                    <img
                        src="/logo-stray.png"
                        alt="Stray Company"
                        className="h-32 md:h-40 w-auto"
                    />
                </motion.div>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-gray-400 text-lg md:text-xl font-light tracking-wide"
                >
                    Luxury Street Minimal
                </motion.p>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-6 h-10 border-2 border-gray-600 rounded-full flex items-start justify-center p-2"
                    >
                        <div className="w-1 h-2 bg-gray-600 rounded-full" />
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Gradient Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        </section>
    )
}
