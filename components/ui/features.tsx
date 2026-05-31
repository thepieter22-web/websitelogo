import { Truck, Shield, Palette, Sparkles } from "lucide-react"

const features = [
  {
    icon: Palette,
    title: "Op Maat Gemaakt",
    description: "Elk ontwerp wordt volledig aangepast aan uw huisstijl en wensen.",
  },
  {
    icon: Shield,
    title: "5 Jaar Garantie",
    description: "Wij staan achter de kwaliteit van onze producten met een uitgebreide garantie.",
  },
  {
    icon: Truck,
    title: "Gratis Levering",
    description: "Gratis bezorging door heel Nederland en België bij bestellingen vanaf €100.",
  },
  {
    icon: Sparkles,
    title: "Premium Kwaliteit",
    description: "Alleen de beste materialen voor een langdurig en professioneel resultaat.",
  },
]

export function Features() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center space-y-4">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}