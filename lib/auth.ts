// ============================================
// CONFIGURAÇÃO DE AUTENTICAÇÃO - NEXTAUTH
// ============================================
// Este arquivo configura o sistema de autenticação usando NextAuth.js
// Permite login com email e senha, validação de credenciais e gerenciamento de sessões

import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs' // Para comparar senhas criptografadas
import { prisma } from './prisma'

// Configuração principal do NextAuth
export const authOptions: NextAuthOptions = {
    // ============================================
    // PROVIDERS (PROVEDORES DE AUTENTICAÇÃO)
    // ============================================
    // Define como os usuários podem fazer login
    providers: [
        // Provider de credenciais (email + senha)
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            // Função que valida as credenciais do usuário
            async authorize(credentials) {
                // Verifica se email e senha foram fornecidos
                if (!credentials?.email || !credentials?.password) {
                    return null // Retorna null se faltar informação
                }

                // Busca o usuário no banco de dados pelo email
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                })

                // Se o usuário não existe, retorna null
                if (!user) {
                    return null
                }

                // Compara a senha fornecida com a senha criptografada no banco
                const isPasswordValid = await compare(credentials.password, user.password)

                // Se a senha está incorreta, retorna null
                if (!isPasswordValid) {
                    return null
                }

                // Se tudo está correto, retorna os dados do usuário
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                }
            },
        }),
    ],

    // ============================================
    // CONFIGURAÇÃO DE SESSÃO
    // ============================================
    // Usa JWT (JSON Web Token) para gerenciar sessões
    // Mais leve que sessões de banco de dados
    session: {
        strategy: 'jwt',
    },

    // ============================================
    // PÁGINAS PERSONALIZADAS
    // ============================================
    // Define quais páginas usar para login, logout e erros
    pages: {
        signIn: '/auth/login',   // Página de login
        signOut: '/auth/login',  // Redireciona para login após logout
        error: '/auth/login',    // Página de erro
    },

    // ============================================
    // CALLBACKS (FUNÇÕES DE RETORNO)
    // ============================================
    // Permitem customizar o comportamento da autenticação
    callbacks: {
        // Callback executado ao criar/atualizar o JWT
        async jwt({ token, user }) {
            // Na primeira vez (quando o usuário faz login), adiciona o ID ao token
            if (user) {
                token.id = user.id
            }
            return token
        },

        // Callback executado ao criar a sessão
        // Adiciona informações do token à sessão do usuário
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string // Adiciona o ID do usuário à sessão
            }
            return session
        },
    },
}
