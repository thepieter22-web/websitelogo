import { Quote } from "lucide-react"

export function Testimonial() {
  return (
    <section className="py-24 bg-foreground text-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <Quote className="h-12 w-12 mx-auto opacity-30" />
          <blockquote className="font-serif text-3xl md:text-4xl leading-relaxed">
            &ldquo;De kwaliteit van de logomatten overtrof onze verwachtingen. 
            Onze klanten complimenteren ons regelmatig met de professionele uitstraling.&rdquo;
          </blockquote>
          <div>
            <p className="font-medium">Mark de Vries</p>
            <p className="text-sm opacity-70">Directeur, TechFlow Solutions</p>
          </div>
        </div>
      </div>
    </section>
  )
}