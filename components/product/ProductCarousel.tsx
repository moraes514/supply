'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from './ProductCard'

interface Product {
    id: string
    name: string
    price: number
    salePrice?: number
    image: string
    featured?: boolean
    isNew?: boolean
    onSale?: boolean
}

interface ProductCarouselProps {
    title: string
    products: Product[]
}

export default function ProductCarousel({ title, products }: ProductCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 400
            const newScrollLeft =
                direction === 'left'
                    ? scrollRef.current.scrollLeft - scrollAmount
                    : scrollRef.current.scrollLeft + scrollAmount

            scrollRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth',
            })
        }
    }

    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
                        {title}
                    </h2>

                    {/* Navigation Arrows */}
                    <div className="hidden md:flex items-center gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="p-2 glass rounded-full hover:bg-white/10 transition-colors"
                            aria-label="Anterior"
                        >
                            <ChevronLeft size={24} className="text-white" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-2 glass rounded-full hover:bg-white/10 transition-colors"
                            aria-label="Próximo"
                        >
                            <ChevronRight size={24} className="text-white" />
                        </button>
                    </div>
                </div>

                {/* Carousel */}
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    {products.map((product) => (
                        <div key={product.id} className="flex-none w-72">
                            <ProductCard {...product} />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </section>
    )
}
