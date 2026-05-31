"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { ShoppingCart, Leaf, Maximize2, Check, Upload, X, Loader2, ZoomIn, ZoomOut } from "lucide-react"
import { Product, formatPrice } from "@/lib/products"
import { useCart } from "@/lib/cart-context"

interface ShopProductCardProps {
  product: Product
}

export function ShopProductCard({ product }: ShopProductCardProps) {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0)
  const [isAdded, setIsAdded] = useState(false)
  const [logoPathname, setLogoPathname] = useState<string | null>(null)
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [logoScale, setLogoScale] = useState(50)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { addItem } = useCart()
  
  const selectedSize = product.sizes[selectedSizeIndex]

  // Create local preview URL for immediate display
  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Create local preview immediately
    const localPreviewUrl = URL.createObjectURL(file)
    setLogoPreviewUrl(localPreviewUrl)
    setIsUploading(true)
    setUploadError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload-logo', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Upload mislukt')
      }

      setLogoPathname(data.pathname)
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Upload mislukt')
      setLogoPreviewUrl(null)
    } finally {
      setIsUploading(false)
    }
  }

  // Cleanup object URL on unmount
  useEffect(() => {
    return () => {
      if (logoPreviewUrl && logoPreviewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(logoPreviewUrl)
      }
    }
  }, [logoPreviewUrl])

  const handleRemoveLogo = () => {
    if (logoPreviewUrl && logoPreviewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(logoPreviewUrl)
    }
    setLogoPathname(null)
    setLogoPreviewUrl(null)
    setUploadError(null)
    setLogoScale(50)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleAddToCart = () => {
    // Use the private blob serve URL for the cart
    const logoUrl = logoPathname ? `/api/logo?pathname=${encodeURIComponent(logoPathname)}` : undefined
    addItem(product, selectedSize, logoUrl)
    setIsAdded(true)
    setTimeout(() => {
      setIsAdded(false)
      handleRemoveLogo()
    }, 2000)
  }

  const displayLogoUrl = logoPreviewUrl

  return (
    <Card className="group overflow-hidden border-border hover:shadow-xl transition-all duration-300">
      {/* Mat Preview with Logo */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
        
        {/* Logo overlay on mat */}
        {displayLogoUrl && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div 
              className="relative transition-all duration-200 drop-shadow-lg"
              style={{
                width: `${logoScale}%`,
                height: `${logoScale}%`,
                maxWidth: '80%',
                maxHeight: '80%',
              }}
            >
              <Image
                src={displayLogoUrl}
                alt="Uw logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
        
        {product.badge && (
          <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
            {product.badge}
          </Badge>
        )}
        {product.isEco && (
          <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-primary/90 flex items-center justify-center">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
        )}
        {product.isXXL && (
          <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-foreground/90 flex items-center justify-center">
            <Maximize2 className="h-5 w-5 text-background" />
          </div>
        )}
        
        {/* Upload overlay when no logo */}
        {!displayLogoUrl && (
          <label
            htmlFor={`logo-upload-${product.id}`}
            className="absolute inset-0 flex flex-col items-center justify-center bg-foreground/5 hover:bg-foreground/10 cursor-pointer transition-colors group/upload"
          >
            <div className="bg-background/90 backdrop-blur-sm rounded-xl p-6 shadow-lg text-center max-w-[200px]">
              {isUploading ? (
                <>
                  <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                  <span className="text-sm text-muted-foreground">Uploaden...</span>
                </>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-primary mx-auto mb-2 group-hover/upload:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Upload uw logo</span>
                  <span className="text-xs text-muted-foreground block mt-1">
                    en zie direct het resultaat
                  </span>
                </>
              )}
            </div>
          </label>
        )}
      </div>
      
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="font-serif text-2xl mb-2">{product.name}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{product.description}</p>
        </div>
        
        {/* Size selector */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Kies formaat:</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size, index) => (
              <button
                key={size.id}
                onClick={() => setSelectedSizeIndex(index)}
                className={`px-3 py-2 rounded-md text-sm border transition-all ${
                  selectedSizeIndex === index
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <span className="font-medium">{size.label}</span>
                <span className="block text-xs text-muted-foreground">{size.dimensions}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Logo controls */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp"
          onChange={handleFileSelect}
          className="hidden"
          id={`logo-upload-${product.id}`}
        />
        
        {displayLogoUrl && (
          <div className="space-y-3 p-4 rounded-lg border border-primary/20 bg-primary/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative h-10 w-10 rounded overflow-hidden bg-background border border-border">
                  <Image
                    src={displayLogoUrl}
                    alt="Geüpload logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-primary">Logo geüpload</p>
                  <p className="text-xs text-muted-foreground">
                    {isUploading ? 'Wordt verwerkt...' : 'Pas de grootte aan'}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemoveLogo}
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Logo size slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Logo grootte</span>
                <span className="font-medium">{logoScale}%</span>
              </div>
              <div className="flex items-center gap-3">
                <ZoomOut className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <Slider
                  value={[logoScale]}
                  onValueChange={(value) => setLogoScale(value[0])}
                  min={20}
                  max={80}
                  step={5}
                  className="flex-1"
                />
                <ZoomIn className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </div>
            </div>
            
            {/* Change logo button */}
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              Ander logo uploaden
            </Button>
          </div>
        )}
        
        {uploadError && (
          <p className="text-sm text-destructive">{uploadError}</p>
        )}

        <ul className="space-y-2">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {feature}
            </li>
          ))}
        </ul>
        
        <div className="pt-2">
          <p className="font-serif text-3xl text-foreground">
            {formatPrice(selectedSize.priceInCents)}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button 
          className="w-full gap-2" 
          size="lg"
          onClick={handleAddToCart}
          variant={isAdded ? "secondary" : "default"}
        >
          {isAdded ? (
            <>
              <Check className="h-4 w-4" />
              Toegevoegd
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              In winkelwagen
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}