import { getProductsByCategory } from '@/lib/data'
import ProductCard from '@/components/product/ProductCard'

export default function TenisPage() {
    // Buscar apenas produtos com categoryId 'tenis'
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

                {sneakers.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-400">Nenhum produto disponível</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
