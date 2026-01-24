'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Truck, Shield, ArrowLeft } from 'lucide-react'
import { useCart } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import ProductCarousel from '@/components/product/ProductCarousel'
import { useRouter } from 'next/navigation'

interface ProductDetailClientProps {
    product: any
    relatedProducts: any[]
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
    const router = useRouter()
    const addItem = useCart((state) => state.addItem)
    const [selectedImage, setSelectedImage] = useState(0)
    const [selectedSize, setSelectedSize] = useState('')
    const [selectedColor, setSelectedColor] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [addedToCart, setAddedToCart] = useState(false)

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            alert('Por favor, selecione tamanho e cor')
            return
        }

        addItem({
            productId: product.id,
            name: product.name,
            price: product.onSale && product.salePrice ? product.salePrice : product.price,
            image: product.images[0],
            size: selectedSize,
            color: selectedColor,
            quantity,
        })

        setAddedToCart(true)
        setTimeout(() => setAddedToCart(false), 2000)
    }

    const displayPrice = product.onSale && product.salePrice ? product.salePrice : product.price

    return (
        <div className="min-h-screen px-4 py-24">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
                >
                    <ArrowLeft size={20} />
                    <span>Voltar</span>
                </button>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Images */}
                    <div>
                        {/* Main Image */}
                        <motion.div
                            key={selectedImage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-900 mb-4"
                        >
                            <Image
                                src={product.images[selectedImage]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </motion.div>

                        {/* Thumbnails */}
                        {product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((image: string, index: number) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`relative aspect-square rounded-lg overflow-hidden ${selectedImage === index ? 'ring-2 ring-orange-primary' : ''
                                            }`}
                                    >
                                        <Image
                                            src={image}
                                            alt={`${product.name} ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div>
                        {/* Badges */}
                        <div className="flex gap-2 mb-4">
                            {product.isNew && (
                                <span className="bg-orange-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                                    NOVO
                                </span>
                            )}
                            {product.onSale && (
                                <span className="bg-black text-orange-primary text-xs font-bold px-3 py-1 rounded-full border border-orange-primary">
                                    SALE
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl font-display font-bold text-white mb-4">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-3 mb-6">
                            {product.onSale && product.salePrice ? (
                                <>
                                    <span className="text-3xl font-bold text-orange-primary">
                                        {formatPrice(product.salePrice)}
                                    </span>
                                    <span className="text-xl text-gray-500 line-through">
                                        {formatPrice(product.price)}
                                    </span>
                                </>
                            ) : (
                                <span className="text-3xl font-bold text-orange-primary">
                                    {formatPrice(product.price)}
                                </span>
                            )}
                        </div>

                        <p className="text-gray-300 mb-8 leading-relaxed">
                            {product.description}
                        </p>

                        {/* Size Selection */}
                        <div className="mb-6">
                            <label className="block text-white font-medium mb-3">Tamanho</label>
                            <div className="flex flex-wrap gap-3">
                                {product.sizes.map((size: string) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-6 py-3 rounded-lg font-medium transition-all ${selectedSize === size
                                            ? 'bg-orange-primary text-white'
                                            : 'glass text-gray-300 hover:bg-white/10'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color Selection */}
                        <div className="mb-8">
                            <label className="block text-white font-medium mb-3">Cor</label>
                            <div className="flex flex-wrap gap-3">
                                {product.colors.map((color: string) => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`px-6 py-3 rounded-lg font-medium transition-all ${selectedColor === color
                                            ? 'bg-orange-primary text-white'
                                            : 'glass text-gray-300 hover:bg-white/10'
                                            }`}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="mb-8">
                            <label className="block text-white font-medium mb-3">Quantidade</label>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-2 glass rounded-lg hover:bg-white/10 transition-colors"
                                >
                                    -
                                </button>
                                <span className="text-white font-medium w-12 text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-2 glass rounded-lg hover:bg-white/10 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <button
                            onClick={handleAddToCart}
                            className="btn-primary w-full mb-4 flex items-center justify-center gap-2"
                        >
                            <ShoppingCart size={20} />
                            {addedToCart ? 'Adicionado!' : 'Adicionar ao Carrinho'}
                        </button>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <div className="glass rounded-lg p-4 flex items-center gap-3">
                                <Truck className="text-orange-primary" size={24} />
                                <div>
                                    <p className="text-white font-medium text-sm">Frete Grátis</p>
                                    <p className="text-gray-400 text-xs">Acima de R$ 200</p>
                                </div>
                            </div>
                            <div className="glass rounded-lg p-4 flex items-center gap-3">
                                <Shield className="text-orange-primary" size={24} />
                                <div>
                                    <p className="text-white font-medium text-sm">Compra Segura</p>
                                    <p className="text-gray-400 text-xs">Pagamento protegido</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-24">
                        <ProductCarousel
                            title="Produtos Relacionados"
                            products={relatedProducts.map((p) => ({
                                id: p.id,
                                name: p.name,
                                price: p.price,
                                salePrice: p.salePrice,
                                image: p.images[0],
                                featured: p.featured,
                                isNew: p.isNew,
                                onSale: p.onSale,
                            }))}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
