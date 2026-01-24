'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react'
import { useCart } from '@/lib/store'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
    const { data: session } = useSession()
    const totalItems = useCart((state) => state.getTotalItems())
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'header-blur shadow-lg' : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2">
                            <img
                                src="/logo-stray.png"
                                alt="Stray Company"
                                className="h-12 w-auto"
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            <Link
                                href="/masculino"
                                className="text-gray-300 hover:text-white transition-colors font-medium"
                            >
                                Masculino
                            </Link>
                            <Link
                                href="/feminino"
                                className="text-gray-300 hover:text-white transition-colors font-medium"
                            >
                                Feminino
                            </Link>
                            <Link
                                href="/lancamentos"
                                className="text-gray-300 hover:text-white transition-colors font-medium"
                            >
                                Lançamentos
                            </Link>
                            <Link
                                href="/promocoes"
                                className="text-gray-300 hover:text-white transition-colors font-medium"
                            >
                                Promoções
                            </Link>
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center space-x-4">
                            {/* Search */}
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="p-2 text-gray-300 hover:text-white transition-colors"
                                aria-label="Buscar"
                            >
                                <Search size={20} />
                            </button>

                            {/* Cart */}
                            <Link
                                href="/carrinho"
                                className="relative p-2 text-gray-300 hover:text-white transition-colors"
                                aria-label="Carrinho"
                            >
                                <ShoppingCart size={20} />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-orange-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>

                            {/* User Menu */}
                            <div className="relative group">
                                <button className="p-2 text-gray-300 hover:text-white transition-colors">
                                    <User size={20} />
                                </button>
                                <div className="absolute right-0 mt-2 w-48 glass rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    {session ? (
                                        <>
                                            <Link
                                                href="/conta"
                                                className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                                            >
                                                Minha Conta
                                            </Link>
                                            <button
                                                onClick={() => signOut()}
                                                className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                                            >
                                                Sair
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                href="/auth/login"
                                                className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                                            >
                                                Entrar
                                            </Link>
                                            <Link
                                                href="/auth/register"
                                                className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                                            >
                                                Cadastrar
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
                                aria-label="Menu"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden glass border-t border-gray-800"
                        >
                            <nav className="px-4 py-4 space-y-2">
                                <Link
                                    href="/masculino"
                                    className="block py-3 text-gray-300 hover:text-white transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Masculino
                                </Link>
                                <Link
                                    href="/feminino"
                                    className="block py-3 text-gray-300 hover:text-white transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Feminino
                                </Link>
                                <Link
                                    href="/lancamentos"
                                    className="block py-3 text-gray-300 hover:text-white transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Lançamentos
                                </Link>
                                <Link
                                    href="/promocoes"
                                    className="block py-3 text-gray-300 hover:text-white transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Promoções
                                </Link>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Search Modal */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-32"
                        onClick={() => setIsSearchOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full max-w-2xl mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="glass rounded-2xl p-6">
                                <div className="flex items-center space-x-4">
                                    <Search className="text-gray-400" size={24} />
                                    <input
                                        type="text"
                                        placeholder="Buscar produtos..."
                                        className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder-gray-500"
                                        autoFocus
                                    />
                                    <button
                                        onClick={() => setIsSearchOpen(false)}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
