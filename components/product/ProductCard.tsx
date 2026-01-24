'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import { useState } from 'react'

interface ProductCardProps {
    id: string
    name: string
    price: number
    salePrice?: number
    image: string
    featured?: boolean
    isNew?: boolean
    onSale?: boolean
}

export default function ProductCard({
    id,
    name,
    price,
    salePrice,
    image,
    featured = false,
    isNew = false,
    onSale = false,
}: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false)
    const displayPrice = onSale && salePrice ? salePrice : price

    return (
        <Link href={`/produto/${id}`}>
            <motion.div
                className="product-card glass-light rounded-2xl overflow-hidden group cursor-pointer relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
            >
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {isNew && (
                        <span className="bg-orange-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                            NOVO
                        </span>
                    )}
                    {onSale && (
                        <span className="bg-black text-orange-primary text-xs font-bold px-3 py-1 rounded-full border border-orange-primary">
                            SALE
                        </span>
                    )}
                </div>

                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Gradient Overlay on Hover */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                    />
                </div>

                {/* Content */}
                <div className="p-4">
                    <h3 className="text-white font-medium text-lg mb-2 line-clamp-1">
                        {name}
                    </h3>

                    <div className="flex items-center gap-2">
                        {onSale && salePrice ? (
                            <>
                                <span className="text-orange-primary font-bold text-xl">
                                    {formatPrice(salePrice)}
                                </span>
                                <span className="text-gray-500 line-through text-sm">
                                    {formatPrice(price)}
                                </span>
                            </>
                        ) : (
                            <span className="text-orange-primary font-bold text-xl">
                                {formatPrice(price)}
                            </span>
                        )}
                    </div>

                    {/* Hidden CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                        transition={{ duration: 0.2 }}
                        className="mt-4"
                    >
                        <button className="w-full bg-orange-primary hover:bg-orange-gold text-white font-medium py-2 rounded-lg transition-colors">
                            Ver Produto
                        </button>
                    </motion.div>
                </div>

                {/* Glow Effect on Hover */}
                {featured && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 rounded-2xl glow-orange-subtle pointer-events-none"
                    />
                )}
            </motion.div>
        </Link>
    )
}
