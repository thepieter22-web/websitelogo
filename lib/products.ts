export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  image: string
  badge?: string
  features: string[]
  isEco?: boolean
  isXXL?: boolean
  sizes: ProductSize[]
}

export interface ProductSize {
  id: string
  label: string
  dimensions: string
  priceInCents: number
}

export const PRODUCTS: Product[] = [
  {
    id: 'logomat-light',
    name: 'Logomat Light',
    description: 'De lichtgewicht oplossing voor kantoren en winkels. Dun profiel, makkelijk te verplaatsen en ideaal voor seizoensgebonden gebruik.',
    priceInCents: 5900,
    image: '/images/logomat-light.jpg',
    badge: 'Nieuw',
    features: [
      'Ultralicht en flexibel',
      'Makkelijk te reinigen',
      'Anti-slip onderkant',
      'Snel te wisselen'
    ],
    sizes: [
      { id: 'light-40x60', label: 'Small', dimensions: '40 x 60 cm', priceInCents: 5900 },
      { id: 'light-60x90', label: 'Medium', dimensions: '60 x 90 cm', priceInCents: 7900 },
      { id: 'light-90x120', label: 'Large', dimensions: '90 x 120 cm', priceInCents: 10900 },
    ]
  },
  {
    id: 'logomat-green',
    name: 'Logomat Green',
    description: 'Onze duurzame keuze voor milieubewuste bedrijven. Gemaakt van 100% gerecyclede materialen met dezelfde premium kwaliteit.',
    priceInCents: 8900,
    image: '/images/logomat-green.jpg',
    badge: 'Duurzaam',
    isEco: true,
    features: [
      '100% gerecycled materiaal',
      'CO2-neutraal geproduceerd',
      'Hoge slijtvastheid',
      'Volledig personaliseerbaar'
    ],
    sizes: [
      { id: 'green-60x90', label: 'Small', dimensions: '60 x 90 cm', priceInCents: 8900 },
      { id: 'green-90x120', label: 'Medium', dimensions: '90 x 120 cm', priceInCents: 12900 },
      { id: 'green-120x180', label: 'Large', dimensions: '120 x 180 cm', priceInCents: 18900 },
    ]
  },
  {
    id: 'logomat-xxl',
    name: 'Logomat XXL',
    description: 'Voor grote entrees en showrooms. Maak een onvergetelijke eerste indruk met dit extra grote formaat.',
    priceInCents: 14900,
    image: '/images/logomat-xxl.jpg',
    badge: 'Populair',
    isXXL: true,
    features: [
      'Extra groot formaat',
      'Heavy-duty kwaliteit',
      'Perfect voor hoge traffic',
      'Indrukwekkende presentatie'
    ],
    sizes: [
      { id: 'xxl-150x200', label: 'Large', dimensions: '150 x 200 cm', priceInCents: 14900 },
      { id: 'xxl-200x300', label: 'X-Large', dimensions: '200 x 300 cm', priceInCents: 24900 },
      { id: 'xxl-300x400', label: 'XX-Large', dimensions: '300 x 400 cm', priceInCents: 39900 },
    ]
  },
]

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id)
}

export function formatPrice(priceInCents: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR'
  }).format(priceInCents / 100)
}