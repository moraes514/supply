import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const gender = searchParams.get('gender')
        const category = searchParams.get('category')
        const featured = searchParams.get('featured')
        const onSale = searchParams.get('onSale')
        const search = searchParams.get('search')

        const where: any = {}

        if (gender) where.gender = gender.toUpperCase()
        if (category) where.categoryId = category
        if (featured === 'true') where.featured = true
        if (onSale === 'true') where.onSale = true
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ]
        }

        const products = await prisma.product.findMany({
            where,
            include: {
                category: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        return NextResponse.json({ products })
    } catch (error) {
        console.error('Error fetching products:', error)
        return NextResponse.json(
            { error: 'Erro ao buscar produtos' },
            { status: 500 }
        )
    }
}
