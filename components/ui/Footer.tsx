import Link from 'next/link'
import { Instagram, Facebook, Twitter } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-black border-t border-gray-900 mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <img
                            src="/logo-stray.png"
                            alt="Stray Company"
                            className="h-10 w-auto mb-4"
                        />
                        <p className="text-gray-500 text-sm">
                            Luxury street minimal fashion
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-white font-medium mb-4">Comprar</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/masculino" className="text-gray-500 hover:text-white transition-colors text-sm">
                                    Masculino
                                </Link>
                            </li>
                            <li>
                                <Link href="/feminino" className="text-gray-500 hover:text-white transition-colors text-sm">
                                    Feminino
                                </Link>
                            </li>
                            <li>
                                <Link href="/lancamentos" className="text-gray-500 hover:text-white transition-colors text-sm">
                                    Lançamentos
                                </Link>
                            </li>
                            <li>
                                <Link href="/promocoes" className="text-gray-500 hover:text-white transition-colors text-sm">
                                    Promoções
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-medium mb-4">Suporte</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/contato" className="text-gray-500 hover:text-white transition-colors text-sm">
                                    Contato
                                </Link>
                            </li>
                            <li>
                                <Link href="/rastreamento" className="text-gray-500 hover:text-white transition-colors text-sm">
                                    Rastrear Pedido
                                </Link>
                            </li>
                            <li>
                                <Link href="/trocas" className="text-gray-500 hover:text-white transition-colors text-sm">
                                    Trocas e Devoluções
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-gray-500 hover:text-white transition-colors text-sm">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-white font-medium mb-4">Redes Sociais</h3>
                        <div className="flex gap-4">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 glass rounded-full hover:bg-white/10 transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram size={20} className="text-gray-400" />
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 glass rounded-full hover:bg-white/10 transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook size={20} className="text-gray-400" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 glass rounded-full hover:bg-white/10 transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter size={20} className="text-gray-400" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-gray-900 mt-12 pt-8 text-center">
                    <p className="text-gray-600 text-sm">
                        © 2026 Supply. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    )
}
