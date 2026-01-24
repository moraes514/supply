import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ProductDetailClient from './ProductDetailClient'

async function getProduct(id: string) {
    try {
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
            },
        })

        return product
    } catch (error) {
        return null
    }
}

async function getRelatedProducts(categoryId: string, currentProductId: string) {
    try {
        const products = await prisma.product.findMany({
            where: {
                categoryId,
                id: { not: currentProductId },
            },
            take: 4,
        })

        return products
    } catch (error) {
        return []
    }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
    const product = await getProduct(params.id)

    if (!product) {
        notFound()
    }

    const relatedProducts = await getRelatedProducts(product.categoryId, product.id)

    return (
        <ProductDetailClient
            product={{
                ...product,
                images: JSON.parse(product.images),
                sizes: JSON.parse(product.sizes),
                colors: JSON.parse(product.colors),
            }}
            relatedProducts={relatedProducts.map((p) => ({
                ...p,
                images: JSON.parse(p.images),
                sizes: JSON.parse(p.sizes),
                colors: JSON.parse(p.colors),
            }))}
        />
    )
}
