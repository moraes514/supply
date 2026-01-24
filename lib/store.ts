// ============================================
// GERENCIAMENTO DE ESTADO - CARRINHO DE COMPRAS
// ============================================
// Este arquivo usa Zustand para gerenciar o estado do carrinho
// Zustand é uma biblioteca leve de gerenciamento de estado
// Usa "persist" para salvar o carrinho no localStorage do navegador

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ============================================
// TIPOS E INTERFACES
// ============================================

// Define a estrutura de um item no carrinho
export interface CartItem {
    id: string          // ID único do item no carrinho (produto + tamanho + cor)
    productId: string   // ID do produto no banco de dados
    name: string        // Nome do produto
    price: number       // Preço unitário
    image: string       // URL da imagem do produto
    size: string        // Tamanho escolhido (ex: "M", "G")
    color: string       // Cor escolhida (ex: "Preto")
    quantity: number    // Quantidade no carrinho
}

// Define a estrutura da store (armazém de estado) do carrinho
interface CartStore {
    items: CartItem[]                                    // Array com todos os itens do carrinho
    addItem: (item: Omit<CartItem, 'id'>) => void       // Adiciona item ao carrinho
    removeItem: (id: string) => void                     // Remove item do carrinho
    updateQuantity: (id: string, quantity: number) => void // Atualiza quantidade de um item
    clearCart: () => void                                // Limpa todo o carrinho
    getTotalItems: () => number                          // Retorna total de itens
    getTotalPrice: () => number                          // Retorna valor total
}

// ============================================
// CRIAÇÃO DA STORE DO CARRINHO
// ============================================
// Hook personalizado que pode ser usado em qualquer componente
export const useCart = create<CartStore>()(
    // Middleware "persist" salva o estado no localStorage
    persist(
        (set, get) => ({
            // Estado inicial: carrinho vazio
            items: [],

            // ============================================
            // ADICIONAR ITEM AO CARRINHO
            // ============================================
            addItem: (item) => {
                const items = get().items

                // Verifica se o item já existe no carrinho
                // (mesmo produto + mesmo tamanho + mesma cor)
                const existingItem = items.find(
                    (i) => i.productId === item.productId && i.size === item.size && i.color === item.color
                )

                if (existingItem) {
                    // Se já existe, apenas aumenta a quantidade
                    set({
                        items: items.map((i) =>
                            i.id === existingItem.id
                                ? { ...i, quantity: i.quantity + item.quantity }
                                : i
                        ),
                    })
                } else {
                    // Se não existe, adiciona como novo item
                    // Cria um ID único combinando productId + size + color
                    set({
                        items: [...items, { ...item, id: `${item.productId}-${item.size}-${item.color}` }],
                    })
                }
            },

            // ============================================
            // REMOVER ITEM DO CARRINHO
            // ============================================
            removeItem: (id) => {
                set({ items: get().items.filter((item) => item.id !== id) })
            },

            // ============================================
            // ATUALIZAR QUANTIDADE DE UM ITEM
            // ============================================
            updateQuantity: (id, quantity) => {
                if (quantity <= 0) {
                    // Se a quantidade for 0 ou negativa, remove o item
                    get().removeItem(id)
                } else {
                    // Caso contrário, atualiza a quantidade
                    set({
                        items: get().items.map((item) =>
                            item.id === id ? { ...item, quantity } : item
                        ),
                    })
                }
            },

            // ============================================
            // LIMPAR CARRINHO
            // ============================================
            clearCart: () => {
                set({ items: [] })
            },

            // ============================================
            // CALCULAR TOTAL DE ITENS
            // ============================================
            // Soma a quantidade de todos os itens
            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0)
            },

            // ============================================
            // CALCULAR VALOR TOTAL
            // ============================================
            // Soma o preço de todos os itens (preço × quantidade)
            getTotalPrice: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
            },
        }),
        {
            // Nome da chave no localStorage onde o carrinho será salvo
            name: 'cart-storage',
        }
    )
)
