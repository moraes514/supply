import { notFound } from 'next/navigation'
import { getProductById, getRelatedProducts, getCategoryById, getAllProducts } from '@/lib/data'
import ProductDetailClient from './ProductDetailClient'

// Esta página exibe os detalhes de UM produto específico quando o usuário clica nele.

// Esta função avisa o Next.js sobre todos os produtos que existem para que as páginas sejam criadas mais rápido.
export function generateStaticParams() {
    const products = getAllProducts()
    return products.map((product) => ({
        id: product.id,
    }))
}

export default function ProductPage({ params }: { params: { id: string } }) {
    // Busca as informações do produto pelo ID (que vem da URL)
    const product = getProductById(params.id)

    // Se o produto não for encontrado, exibe a página de erro 404
    if (!product) {
        notFound()
    }

    // Busca a categoria e produtos relacionados para exibir na mesma página
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
