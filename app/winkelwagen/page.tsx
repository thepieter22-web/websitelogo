"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/products"
import { CartItem } from "@/components/cart-item"
import { Checkout } from "@/components/checkout"

export default function WinkelwagenPage() {
  const { items, totalPrice } = useCart()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Terug naar shop
          </Link>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <h1 className="font-serif text-4xl mb-8">Winkelwagen</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-6">
              Uw winkelwagen is leeg
            </p>
            <Link href="/">
              <Button size="lg">
                Bekijk onze producten
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map(item => (
                <CartItem key={item.size.id} item={item} />
              ))}
            </div>
            
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="font-serif">Overzicht</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {items.map(item => (
                      <div key={item.size.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.product.name} ({item.size.label}) x{item.quantity}
                        </span>
                        <span>{formatPrice(item.size.priceInCents * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div className="flex justify-between font-serif text-xl">
                    <span>Totaal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Inclusief BTW. Verzendkosten worden berekend bij checkout.
                  </p>
                </CardContent>
              </Card>
              
              <Checkout />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}