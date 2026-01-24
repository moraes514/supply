'use client'

import { useCart } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Plus, Minus } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CartPage() {
    const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart()
    const total = getTotalPrice()
    const shipping = total > 0 ? 15.00 : 0
    const finalTotal = total + shipping

    const handleCheckout = () => {
        // Criar mensagem do WhatsApp com os produtos do carrinho
        let message = '🛒 *Novo Pedido*\n\n'

        items.forEach((item, index) => {
            message += `${index + 1}. *${item.name}*\n`
            message += `   Tamanho: ${item.size} | Cor: ${item.color}\n`
            message += `   Quantidade: ${item.quantity}x\n`
            message += `   Preço: ${formatPrice(item.price)}\n\n`
        })

        message += `💰 *Subtotal:* ${formatPrice(total)}\n`
        message += `🚚 *Frete:* ${formatPrice(shipping)}\n`
        message += `✅ *Total:* ${formatPrice(finalTotal)}\n\n`
        message += `Gostaria de finalizar este pedido!`

        // Codificar a mensagem para URL
        const encodedMessage = encodeURIComponent(message)

        // Redirecionar para WhatsApp
        const whatsappUrl = `https://wa.me/5515998500726?text=${encodedMessage}`
        window.open(whatsappUrl, '_blank')
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 py-24">
                <div className="text-center">
                    <h1 className="text-3xl font-display font-bold text-white mb-4">
                        Seu carrinho está vazio
                    </h1>
                    <p className="text-gray-400 mb-8">
                        Adicione produtos para começar suas compras
                    </p>
                    <Link href="/" className="btn-primary inline-block">
                        Continuar Comprando
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen px-4 py-24">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
                        Carrinho
                    </h1>
                    <button
                        onClick={clearCart}
                        className="text-gray-400 hover:text-orange-primary transition-colors text-sm"
                    >
                        Limpar Carrinho
                    </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                className="glass rounded-xl p-4 flex gap-4"
                            >
                                {/* Image */}
                                <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-900 flex-shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Details */}
                                <div className="flex-1">
                                    <h3 className="text-white font-medium mb-1">{item.name}</h3>
                                    <p className="text-gray-400 text-sm mb-2">
                                        Tamanho: {item.size} | Cor: {item.color}
                                    </p>
                                    <p className="text-orange-primary font-bold">
                                        {formatPrice(item.price)}
                                    </p>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex flex-col items-end justify-between">
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-gray-400 hover:text-orange-primary transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-1 glass rounded hover:bg-white/10 transition-colors"
                                        >
                                            <Minus size={16} className="text-white" />
                                        </button>
                                        <span className="text-white font-medium w-8 text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-1 glass rounded hover:bg-white/10 transition-colors"
                                        >
                                            <Plus size={16} className="text-white" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="glass rounded-xl p-6 sticky top-24">
                            <h2 className="text-xl font-display font-bold text-white mb-6">
                                Resumo do Pedido
                            </h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-300">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                                <div className="flex justify-between text-gray-300">
                                    <span>Frete</span>
                                    <span>{formatPrice(shipping)}</span>
                                </div>
                                <div className="border-t border-gray-800 pt-4 flex justify-between text-white font-bold text-lg">
                                    <span>Total</span>
                                    <span className="text-orange-primary">{formatPrice(finalTotal)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="btn-primary w-full block text-center"
                            >
                                Finalizar Compra
                            </button>

                            <Link
                                href="/"
                                className="block text-center text-gray-400 hover:text-white transition-colors mt-4 text-sm"
                            >
                                Continuar Comprando
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

