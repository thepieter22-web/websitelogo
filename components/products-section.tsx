import { ShopProductCard } from "@/components/shop-product-card"
import { PRODUCTS } from "@/lib/products"

export function ProductsSection() {
  return (
    <section id="producten" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
            Onze Collectie
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-balance">
            Kies de perfecte mat voor uw bedrijf
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {PRODUCTS.map((product) => (
            <ShopProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}