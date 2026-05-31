"use client"

import Image from "next/image"
import { Minus, Plus, Trash2, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart, CartItem as CartItemType } from "@/lib/cart-context"
import { formatPrice } from "@/lib/products"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative h-24 w-24 flex-shrink-0 rounded-md overflow-hidden bg-secondary">
            <Image
              src={item.product.image}
              alt={item.product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-lg truncate">{item.product.name}</h3>
            <p className="text-sm text-muted-foreground">
              {item.size.label} - {item.size.dimensions}
            </p>
            {item.logoUrl && (
              <div className="flex items-center gap-2 mt-2">
                <div className="relative h-8 w-8 rounded overflow-hidden bg-secondary border border-border">
                  <Image
                    src={item.logoUrl}
                    alt="Uw logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xs text-primary flex items-center gap-1">
                  <ImageIcon className="h-3 w-3" />
                  Logo geüpload
                </span>
              </div>
            )}
            <p className="font-medium mt-1">{formatPrice(item.size.priceInCents)}</p>
          </div>
          <div className="flex flex-col items-end justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => removeItem(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}