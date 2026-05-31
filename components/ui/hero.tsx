import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            Premium Entréematten
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight text-balance">
            Maak een eerste indruk die blijft hangen
          </h1>
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            Transformeer uw entree met een professionele logomat. 
            Duurzaam, stijlvol en volledig op maat gemaakt met uw bedrijfslogo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="gap-2">
              Bekijk collectie
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Offerte aanvragen
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <Image
              src="/images/hero-mat.jpg"
              alt="Premium logomatten in moderne kantooromgeving"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-lg border border-border">
            <p className="text-sm text-muted-foreground">Tevreden klanten</p>
            <p className="font-serif text-3xl">500+</p>
          </div>
        </div>
      </div>
    </section>
  )
}