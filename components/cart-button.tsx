"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

export function CartButton() {
  const { totalItems } = useCart()

  return (
    <Link href="/winkelwagen">
      <Button variant="outline" className="relative gap-2">
        <ShoppingCart className="h-4 w-4" />
        <span className="hidden sm:inline">Winkelwagen</span>
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Button>
    </Link>
  )
}