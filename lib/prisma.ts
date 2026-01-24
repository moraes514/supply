// ============================================
// CLIENTE PRISMA - SINGLETON
// ============================================
// Este arquivo cria uma instância única do Prisma Client
// Evita criar múltiplas conexões com o banco de dados

import { PrismaClient } from '@prisma/client'

// Define um tipo global para armazenar a instância do Prisma
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

// Cria ou reutiliza a instância do Prisma
// Se já existe uma instância global, usa ela; caso contrário, cria uma nova
export const prisma = globalForPrisma.prisma ?? new PrismaClient()

// Em desenvolvimento, salva a instância globalmente para evitar
// criar múltiplas conexões ao recarregar o código (hot reload)
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
