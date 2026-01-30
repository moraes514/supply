// ============================================
// DATA HELPERS - STATIC PRODUCTS & CATEGORIES
// ============================================
// Helper functions para acessar produtos e categorias de arquivos JSON estáticos

import productsData from '@/data/products.json'
import categoriesData from '@/data/categories.json'

export interface Product {
    id: string
    name: string
    description: string
    price: number
    categoryId: string
    images: string[]
    sizes: string[]
    colors: string[]
    stock: number
    featured: boolean
    isNew: boolean
    onSale: boolean
    salePrice?: number
    gender: 'MALE' | 'FEMALE' | 'UNISEX'
}

export interface Category {
    id: string
    name: string
    slug: string
    description: string
}

// ============================================
// PRODUCT FUNCTIONS
// ============================================

/**
 * Retorna todos os produtos
 */
export function getAllProducts(): Product[] {
    return productsData as Product[]
}

/**
 * Retorna um produto específico por ID
 */
export function getProductById(id: string): Product | undefined {
    return productsData.find((p) => p.id === id) as Product | undefined
}

/**
 * Retorna produtos por categoria
 */
export function getProductsByCategory(categoryId: string): Product[] {
    return productsData.filter((p) => p.categoryId === categoryId) as Product[]
}

/**
 * Retorna produtos por gênero
 */
export function getProductsByGender(gender: 'MALE' | 'FEMALE' | 'UNISEX'): Product[] {
    return productsData.filter((p) => p.gender === gender) as Product[]
}

/**
 * Retorna produtos em destaque
 */
export function getFeaturedProducts(limit?: number): Product[] {
    const featured = productsData.filter((p) => p.featured) as Product[]
    return limit ? featured.slice(0, limit) : featured
}

/**
 * Retorna lançamentos (produtos novos)
 */
export function getNewProducts(limit?: number): Product[] {
    const newProducts = productsData.filter((p) => p.isNew) as Product[]
    return limit ? newProducts.slice(0, limit) : newProducts
}

/**
 * Retorna produtos em promoção
 */
export function getSaleProducts(limit?: number): Product[] {
    const onSale = productsData.filter((p) => p.onSale) as Product[]
    return limit ? onSale.slice(0, limit) : onSale
}

/**
 * Retorna produtos relacionados (mesma categoria, excluindo o produto atual)
 */
export function getRelatedProducts(productId: string, limit: number = 4): Product[] {
    const product = getProductById(productId)
    if (!product) return []

    return productsData
        .filter((p) => p.categoryId === product.categoryId && p.id !== productId)
        .slice(0, limit) as Product[]
}

/**
 * Busca produtos por nome ou descrição
 */
export function searchProducts(query: string): Product[] {
    const lowerQuery = query.toLowerCase()
    return productsData.filter(
        (p) =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.description.toLowerCase().includes(lowerQuery)
    ) as Product[]
}

// ============================================
// CATEGORY FUNCTIONS
// ============================================

/**
 * Retorna todas as categorias
 */
export function getAllCategories(): Category[] {
    return categoriesData as Category[]
}

/**
 * Retorna uma categoria específica por ID
 */
export function getCategoryById(id: string): Category | undefined {
    return categoriesData.find((c) => c.id === id) as Category | undefined
}

/**
 * Retorna uma categoria específica por slug
 */
export function getCategoryBySlug(slug: string): Category | undefined {
    return categoriesData.find((c) => c.slug === slug) as Category | undefined
}
