import { notFound } from 'next/navigation'
import { getProductById, getRelatedProducts, getCategoryById, getAllProducts } from '@/lib/data'
import ProductDetailClient from './ProductDetailClient'

// Generate static params for all products at build time
export function generateStaticParams() {
    const products = getAllProducts()
    return products.map((product) => ({
        id: product.id,
    }))
}

export default function ProductPage({ params }: { params: { id: string } }) {
    const product = getProductById(params.id)

    if (!product) {
        notFound()
    }

    const category = getCategoryById(product.categoryId)
    const relatedProducts = getRelatedProducts(product.id, 4)

    return (
        <ProductDetailClient
            product={{
                ...product,
                category,
            }}
            relatedProducts={relatedProducts}
        />
    )
}
