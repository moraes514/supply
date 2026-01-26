// Script para marcar produtos como inativos
// Execute com: npx tsx prisma/retire-products.ts

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Lista de produtos para retirar do catálogo (nomes exatos do banco de dados)
const productsToRetire = [
    'Adidas Samba "Black"',
    'Nike Air Max Plus "Black Metallic Silver"',
    'Nike SB Dunk Low "Supreme 94 Green"',
    'Nike SB Dunk Low "Green Bear"',
    'Nike SB Dunk Low "Orange Bear"',
    'Nike GT Cut 2 "Purple/Orange"',
    'Nike GT Cut 2 "Pink/White"',
    'Bape x Crocs Classic "Black"',
    'Bape x Crocs Classic "Pink"',
    'Bape x Crocs Classic "Blue"',
    'Nike Air Max 97 "White"',
    'Nike Ja 3 Morant "White Grey"',
    'Nike Ja 3 Morant "Grey Lavender"',
    'Nike Ja 3 Morant "Tiger"',
    'Yeezy Boost 350 V2 "Citrin"',
    'Yeezy Boost 350 V2 "Bone"',
    'Nike Air Max DN "White Green"',
    'Nike Air Max DN "Black Purple"',
]


async function main() {
    console.log('🔄 Iniciando processo de retirada de produtos...\n')

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
                console.log(`✅ Produto retirado: ${productName} (${result.count} produto(s) atualizado(s))`)
                retiredCount += result.count
            } else {
                console.log(`⚠️  Produto não encontrado: ${productName}`)
            }
        } catch (error) {
            console.error(`❌ Erro ao retirar produto ${productName}:`, error)
        }
    }

    console.log(`\n🎉 Processo concluído! Total de produtos retirados: ${retiredCount}`)

    // Verificar contagem de produtos ativos e inativos
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
