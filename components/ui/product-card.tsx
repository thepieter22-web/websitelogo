"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Leaf, Maximize2 } from "lucide-react"

interface ProductCardProps {
  title: string
  description: string
  price: string
  image: string
  badge?: string
  features: string[]
  isEco?: boolean
  isXXL?: boolean
}

export function ProductCard({
  title,
  description,
  price,
  image,
  badge,
  features,
  isEco,
  isXXL,
}: ProductCardProps) {
  return (
    <Card className="group overflow-hidden border-border hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {badge && (
          <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
            {badge}
          </Badge>
        )}
        {isEco && (
          <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-primary/90 flex items-center justify-center">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
        )}
        {isXXL && (
          <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-foreground/90 flex items-center justify-center">
            <Maximize2 className="h-5 w-5 text-background" />
          </div>
        )}
      </div>
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="font-serif text-2xl mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {feature}
            </li>
          ))}
        </ul>
        <div className="pt-2">
          <p className="text-sm text-muted-foreground">Vanaf</p>
          <p className="font-serif text-3xl text-foreground">{price}</p>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full gap-2" size="lg">
          <ShoppingCart className="h-4 w-4" />
          Bestellen
        </Button>
      </CardFooter>
    </Card>
  )
}