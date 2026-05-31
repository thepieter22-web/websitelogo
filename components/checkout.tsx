'use client'

import { useCallback } from 'react'
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { startCheckoutSession } from '@/app/actions/stripe'
import { useCart } from '@/lib/cart-context'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export function Checkout() {
  const { items, clearCart } = useCart()

  const fetchClientSecret = useCallback(() => {
    const checkoutItems = items.map(item => ({
      sizeId: item.size.id,
      quantity: item.quantity
    }))
    return startCheckoutSession(checkoutItems)
  }, [items])

  if (items.length === 0) {
    return null
  }

  return (
    <div id="checkout" className="mt-8">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ 
          fetchClientSecret,
          onComplete: () => {
            clearCart()
          }
        }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}