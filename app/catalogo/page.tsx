import Link from 'next/link'

export default function CatalogoLandingPage() {
    return (
        <div className="min-h-screen px-4 py-32 flex items-center justify-center">
            <div className="max-w-5xl mx-auto w-full">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                        Nosso Catálogo
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Escolha a categoria que deseja explorar. Trabalhamos apenas com peças exclusivas e selecionadas.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Categoria Tênis */}
                    <Link href="/catalogo/tenis" className="group">
                        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300 relative h-96 flex p-8 items-end">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                            {/* Placeholder/Imagem de Fundo */}
                            <img
                                src="/images/products/tenis/kobe-6-grinch.png"
                                alt="Tênis"
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-50"
                            />
                            <div className="relative z-20">
                                <h2 className="text-3xl font-display font-bold text-white mb-2">Sneakers</h2>
                                <p className="text-gray-300">Explorar tênis exclusivos</p>
                            </div>
                        </div>
                    </Link>

                    {/* Categoria Roupas */}
                    <Link href="/catalogo/roupas" className="group">
                        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300 relative h-96 flex p-8 items-end">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                            {/* Placeholder/Imagem de Fundo */}
                            <img
                                src="/images/products/roupas/syna-track-top-grey/imagem.png"
                                alt="Roupas"
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-50"
                            />
                            <div className="relative z-20">
                                <h2 className="text-3xl font-display font-bold text-white mb-2">Streetwear</h2>
                                <p className="text-gray-300">Explorar vestuário e acessórios</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
