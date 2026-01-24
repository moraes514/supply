import { prisma } from '@/lib/prisma'
import ProductCard from '@/components/product/ProductCard'

async function getSaleProducts() {
    try {
        const products = await prisma.product.findMany({
            where: {
                onSale: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        return products
    } catch (error) {
        return []
    }
}

export default async function PromocoesPage() {
    const products = await getSaleProducts()

    return (
        <div className="min-h-screen px-4 py-24">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                        Promoções
                    </h1>
                    <p className="text-gray-400">
                        Aproveite as melhores ofertas
                    </p>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-400">Nenhuma promoção no momento</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                salePrice={product.salePrice || undefined}
                                image={JSON.parse(product.images)[0]}
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
