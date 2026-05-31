'use server'

import { stripe } from '@/lib/stripe'
import type { CartItem } from '@/lib/cart-context'
import { PRODUCTS } from '@/lib/products'

interface CheckoutItem {
  sizeId: string
  quantity: number
}

export async function startCheckoutSession(cartItems: CheckoutItem[]) {
  // Validate and look up each item server-side for security
  const lineItems = cartItems.map(cartItem => {
    // Find the product and size from our secure server-side catalog
    for (const product of PRODUCTS) {
      const size = product.sizes.find(s => s.id === cartItem.sizeId)
      if (size) {
        return {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `${product.name} - ${size.label}`,
              description: `${size.dimensions} - ${product.description}`,
            },
            unit_amount: size.priceInCents,
          },
          quantity: cartItem.quantity,
        }
      }
    }
    throw new Error(`Product size "${cartItem.sizeId}" not found`)
  })

  if (lineItems.length === 0) {
    throw new Error('No valid items in cart')
  }

  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    redirect_on_completion: 'never',
    line_items: lineItems,
    mode: 'payment',
    shipping_address_collection: {
      allowed_countries: ['NL', 'BE', 'DE'],
    },
  })

  return session.client_secret
}