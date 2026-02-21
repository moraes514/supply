import HeroBanner from '@/components/ui/HeroBanner'
import ProductCarousel from '@/components/product/ProductCarousel'

// Esta é a Página Inicial (Home) do site.
// Aqui definimos os carrosséis de produtos que aparecem logo de cara.
import {
    getNewProducts,
    getFeaturedProducts,
    getEssentialProducts,
    getSaleProducts,
    getAllProducts,
    type Product,
} from '@/lib/data'

export default function HomePage() {
    // Aqui o site busca no 'products.json' grupos específicos de produtos:
    const newProducts = getNewProducts(8)       // Busca os últimos 8 produtos marcados como "isNew"
    const bestSellers = getFeaturedProducts(8)  // Busca os últimos 8 produtos marcados como "featured"
    const essentials = getEssentialProducts(8)   // Busca os últimos 8 produtos marcados como essenciais
    const onSale = getSaleProducts(8)           // Busca os últimos 8 produtos marcados como "onSale"

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
                {/* Carrossel de Lançamentos */}
                {newProducts.length > 0 && (
                    <ProductCarousel
                        title="Lançamentos"
                        products={transformProducts(newProducts)}
                    />
                )}

                {/* Carrossel de Mais Vendidos */}
                {bestSellers.length > 0 && (
                    <ProductCarousel
                        title="Mais Vendidos"
                        products={transformProducts(bestSellers)}
                    />
                )}

                {/* Carrossel de Essenciais */}
                {essentials.length > 0 && (
                    <ProductCarousel
                        title="Essenciais"
                        products={transformProducts(essentials)}
                    />
                )}

                {/* Carrossel de Promoções */}
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
