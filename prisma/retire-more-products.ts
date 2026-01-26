// Script para retirar mais 2 produtos
// Execute com: npx tsx prisma/retire-more-products.ts

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const productsToRetire = [
    'Nike Ja 3 Morant "Green"',
    'Nike SB Dunk Low "Freddy Krueger"',
]

async function main() {
    console.log('🔄 Retirando mais produtos do catálogo...\n')

    let retiredCount = 0

    for (const productName of productsToRetire) {
        try {
            const result = await prisma.product.updateMany({
                where: {
                    name: productName,
                },
                data: {
                    active: false,
                },
            })

            if (result.count > 0) {
                console.log(`✅ Produto retirado: ${productName}`)
                retiredCount += result.count
            } else {
                console.log(`⚠️  Produto não encontrado: ${productName}`)
            }
        } catch (error) {
            console.error(`❌ Erro ao retirar produto ${productName}:`, error)
        }
    }

    console.log(`\n🎉 Processo concluído! Total de produtos retirados: ${retiredCount}`)

    // Verificar contagem
    const activeCount = await prisma.product.count({ where: { active: true } })
    const inactiveCount = await prisma.product.count({ where: { active: false } })

    console.log(`\n📊 Status do catálogo:`)
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
