// Script para verificar e remover produtos duplicados
// Execute com: npx tsx prisma/remove-duplicates.ts

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🔍 Verificando produtos duplicados...\n')

    // Buscar todos os produtos
    const allProducts = await prisma.product.findMany({
        orderBy: { name: 'asc' },
    })

    console.log(`📊 Total de produtos no banco: ${allProducts.length}\n`)

    // Agrupar produtos por nome
    const productsByName = new Map<string, any[]>()

    for (const product of allProducts) {
        if (!productsByName.has(product.name)) {
            productsByName.set(product.name, [])
        }
        productsByName.get(product.name)!.push(product)
    }

    // Encontrar duplicados
    const duplicates: string[] = []
    for (const [name, products] of productsByName.entries()) {
        if (products.length > 1) {
            duplicates.push(name)
            console.log(`🔄 DUPLICADO: "${name}" - ${products.length} cópias`)
            products.forEach((p, index) => {
                console.log(`   ${index + 1}. ID: ${p.id.substring(0, 8)}... | Active: ${p.active} | Created: ${p.createdAt.toISOString().split('T')[0]}`)
            })
            console.log('')
        }
    }

    if (duplicates.length === 0) {
        console.log('✅ Nenhum produto duplicado encontrado!')
        return
    }

    console.log(`\n⚠️  Encontrados ${duplicates.length} produtos duplicados\n`)
    console.log('🗑️  Removendo duplicatas (mantendo a primeira cópia)...\n')

    let removedCount = 0

    for (const [name, products] of productsByName.entries()) {
        if (products.length > 1) {
            // Ordenar por data de criação (manter o mais antigo)
            products.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())

            const toKeep = products[0]
            const toDelete = products.slice(1)

            console.log(`📌 Mantendo: "${name}" (ID: ${toKeep.id.substring(0, 8)}...)`)

            for (const product of toDelete) {
                try {
                    await prisma.product.delete({
                        where: { id: product.id },
                    })
                    console.log(`   ✅ Removido duplicata (ID: ${product.id.substring(0, 8)}...)`)
                    removedCount++
                } catch (error) {
                    console.error(`   ❌ Erro ao remover (ID: ${product.id.substring(0, 8)}...):`, error)
                }
            }
            console.log('')
        }
    }

    console.log(`\n🎉 Processo concluído!`)
    console.log(`   - Produtos removidos: ${removedCount}`)
    console.log(`   - Produtos únicos no banco: ${allProducts.length - removedCount}\n`)

    // Verificação final
    const finalCount = await prisma.product.count()
    const activeCount = await prisma.product.count({ where: { active: true } })
    const inactiveCount = await prisma.product.count({ where: { active: false } })

    console.log(`📊 Status final do catálogo:`)
    console.log(`   - Total de produtos: ${finalCount}`)
    console.log(`   - Produtos ativos: ${activeCount}`)
    console.log(`   - Produtos inativos: ${inactiveCount}`)
}

main()
    .catch((e) => {
        console.error('❌ Erro no processo:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
