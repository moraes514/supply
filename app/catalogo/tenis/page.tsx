import { getProductsByCategory } from '@/lib/data'
import ProductCard from '@/components/product/ProductCard'

// Página que lista todos os Tênis cadastrados no 'products.json'.

export default function TenisPage() {
    // Aqui o site busca no products.json apenas os itens da categoria 'tenis'
    const sneakers = getProductsByCategory('tenis')

    return (
        <div className="min-h-screen px-4 py-24">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                        Tênis
                    </h1>
                    <p className="text-gray-400">
                        Explore nossa coleção de sneakers exclusivos ({sneakers.length} produtos)
                    </p>
                </div>

                {/* Se não houver nenhum tênis cadastrado, exibe uma mensagem de aviso */}
                {sneakers.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-400">Nenhum produto disponível no momento.</p>
                    </div>
                ) : (
                    /* Grade (grid) que organiza os produtos em colunas adaptáveis ao celular/PC */
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {/* Aqui o site percorre a lista de tênis e cria um "Card" para cada um */}
                        {sneakers.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                salePrice={product.salePrice || undefined}
                                image={product.images[0]}
                                featured={product.featured}
                                isNew={product.isNew}
                                onSale={product.onSale}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
