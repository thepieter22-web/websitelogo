"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { Product, ProductSize } from './products'

export interface CartItem {
  id: string
  product: Product
  size: ProductSize
  quantity: number
  logoUrl?: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, size: ProductSize, logoUrl?: string) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = useCallback((product: Product, size: ProductSize, logoUrl?: string) => {
    setItems(prev => {
      // For items with logo, always add as new item (unique logo per item)
      if (logoUrl) {
        const id = `${size.id}-${Date.now()}`
        return [...prev, { id, product, size, quantity: 1, logoUrl }]
      }
      
      const existingItem = prev.find(item => item.size.id === size.id && !item.logoUrl)
      if (existingItem) {
        return prev.map(item =>
          item.size.id === size.id && !item.logoUrl
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      const id = `${size.id}-${Date.now()}`
      return [...prev, { id, product, size, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId))
  }, [])

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(itemId)
      return
    }
    setItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    )
  }, [removeItem])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.size.priceInCents * item.quantity, 0)

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}