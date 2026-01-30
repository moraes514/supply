import HeroBanner from '@/components/ui/HeroBanner'
import ProductCarousel from '@/components/product/ProductCarousel'
import {
    getNewProducts,
    getFeaturedProducts,
    getSaleProducts,
    getAllProducts,
    type Product,
} from '@/lib/data'

export default function HomePage() {
    // Buscar produtos estáticos
    const newProducts = getNewProducts(8)
    const bestSellers = getFeaturedProducts(8)
    const essentials = getAllProducts().slice(0, 8)
    const onSale = getSaleProducts(8)

    // Transform products for carousel
    const transformProducts = (products: Product[]) =>
        products.map((p) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            salePrice: p.salePrice,
            image: p.images[0] || '/placeholder.jpg',
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
