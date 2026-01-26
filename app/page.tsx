import HeroBanner from '@/components/ui/HeroBanner'
import ProductCarousel from '@/components/product/ProductCarousel'
import { prisma } from '@/lib/prisma'

async function getProducts() {
    try {
        const [newProducts, bestSellers, essentials, onSale] = await Promise.all([
            prisma.product.findMany({
                where: { isNew: true, active: true },
                take: 8,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.product.findMany({
                where: { featured: true, active: true },
                take: 8,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.product.findMany({
                where: { active: true },
                take: 8,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.product.findMany({
                where: { onSale: true, active: true },
                take: 8,
                orderBy: { createdAt: 'desc' },
            }),
        ])

        return { newProducts, bestSellers, essentials, onSale }
    } catch (error) {
        console.error('Error fetching products:', error)
        return { newProducts: [], bestSellers: [], essentials: [], onSale: [] }
    }
}

export default async function HomePage() {
    const { newProducts, bestSellers, essentials, onSale } = await getProducts()

    // Transform products for carousel
    const transformProducts = (products: any[]) =>
        products.map((p) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            salePrice: p.salePrice,
            image: JSON.parse(p.images)[0] || '/placeholder.jpg',
            featured: p.featured,
            isNew: p.isNew,
            onSale: p.onSale,
        }))

    return (
        <>
            <HeroBanner />

            <div className="bg-black">
                {newProducts.length > 0 && (
                    <ProductCarousel
                        title="Lançamentos"
                        products={transformProducts(newProducts)}
                    />
                )}

                {bestSellers.length > 0 && (
                    <ProductCarousel
                        title="Mais Vendidos"
                        products={transformProducts(bestSellers)}
                    />
                )}

                {essentials.length > 0 && (
                    <ProductCarousel
                        title="Essenciais"
                        products={transformProducts(essentials)}
                    />
                )}

                {onSale.length > 0 && (
                    <ProductCarousel
                        title="Promoções"
                        products={transformProducts(onSale)}
                    />
                )}
            </div>
        </>
    )
}
