// Image optimization utilities
export interface ImageOptions {
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'jpeg' | 'png'
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside'
}

export interface OptimizedImage {
  src: string
  width: number
  height: number
  format: string
  size: number
}

// Image optimization service
class ImageOptimizer {
  private baseUrl = '/api/images'

  // Generate optimized image URL
  generateUrl(src: string, options: ImageOptions = {}): string {
    const params = new URLSearchParams()
    
    if (options.width) params.set('w', options.width.toString())
    if (options.height) params.set('h', options.height.toString())
    if (options.quality) params.set('q', options.quality.toString())
    if (options.format) params.set('f', options.format)
    if (options.fit) params.set('fit', options.fit)
    
    params.set('url', encodeURIComponent(src))
    
    return `${this.baseUrl}?${params.toString()}`
  }

  // Generate responsive image srcset
  generateSrcSet(src: string, widths: number[], options: Omit<ImageOptions, 'width'> = {}): string {
    return widths
      .map(width => {
        const url = this.generateUrl(src, { ...options, width })
        return `${url} ${width}w`
      })
      .join(', ')
  }

  // Generate picture element sources
  generatePictureSource(src: string, options: ImageOptions & { media?: string } = {}): string {
    const url = this.generateUrl(src, options)
    const attributes = []
    
    if (options.media) attributes.push(`media="${options.media}"`)
    attributes.push(`srcset="${url}"`)
    if (options.format) attributes.push(`type="image/${options.format}"`)
    
    return `<source ${attributes.join(' ')} />`
  }

  // Preload critical images
  preloadImage(src: string, options: ImageOptions = {}): void {
    if (typeof document === 'undefined') return

    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = this.generateUrl(src, options)
    
    if (options.format) {
      link.type = `image/${options.format}`
    }
    
    document.head.appendChild(link)
  }

  // Lazy load image with intersection observer
  lazyLoad(
    img: HTMLImageElement,
    src: string,
    options: ImageOptions = {},
    callback?: () => void
  ): IntersectionObserver {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLImageElement
          target.src = this.generateUrl(src, options)
          
          target.onload = () => {
            target.classList.add('loaded')
            callback?.()
          }
          
          observer.unobserve(target)
        }
      })
    }, { threshold: 0.1 })

    observer.observe(img)
    return observer
  }

  // Check if image format is supported
  isFormatSupported(format: string): boolean {
    if (typeof window === 'undefined') return false

    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    
    try {
      return canvas.toDataURL(`image/${format}`).startsWith(`data:image/${format}`)
    } catch {
      return false
    }
  }

  // Get optimal format for browser
  getOptimalFormat(): 'webp' | 'jpeg' {
    if (this.isFormatSupported('webp')) {
      return 'webp'
    }
    return 'jpeg'
  }

  // Calculate aspect ratio
  calculateAspectRatio(width: number, height: number): number {
    return width / height
  }

  // Generate placeholder data URL
  generatePlaceholder(width: number, height: number, color = '#f3f4f6'): string {
    if (typeof window === 'undefined') {
      return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'%3E%3Crect width='100%25' height='100%25' fill='${encodeURIComponent(color)}'/%3E%3C/svg%3E`
    }

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    canvas.width = width
    canvas.height = height
    
    if (ctx) {
      ctx.fillStyle = color
      ctx.fillRect(0, 0, width, height)
    }
    
    return canvas.toDataURL('image/jpeg', 0.1)
  }

  // Generate blur placeholder
  generateBlurPlaceholder(src: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        
        // Small size for blur effect
        canvas.width = 10
        canvas.height = 10
        
        if (ctx) {
          ctx.filter = 'blur(2px)'
          ctx.drawImage(img, 0, 0, 10, 10)
          resolve(canvas.toDataURL('image/jpeg', 0.1))
        } else {
          reject(new Error('Canvas context not available'))
        }
      }
      
      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = src
    })
  }
}

// Singleton instance
export const imageOptimizer = new ImageOptimizer()

// React hook for responsive images
import { useState, useEffect } from 'react'

export function useResponsiveImage(
  src: string,
  options: ImageOptions = {}
): {
  src: string
  srcSet: string
  isLoaded: boolean
  error: string | null
} {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const optimizedSrc = imageOptimizer.generateUrl(src, options)
  const srcSet = imageOptimizer.generateSrcSet(src, [400, 800, 1200], options)

  useEffect(() => {
    const img = new Image()
    
    img.onload = () => {
      setIsLoaded(true)
      setError(null)
    }
    
    img.onerror = () => {
      setError('Failed to load image')
      setIsLoaded(false)
    }
    
    img.src = optimizedSrc
  }, [optimizedSrc])

  return {
    src: optimizedSrc,
    srcSet,
    isLoaded,
    error
  }
}

// Utility functions
export function getImageDimensions(src: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      })
    }
    
    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = src
  })
}

export function resizeImage(
  file: File,
  maxWidth: number,
  maxHeight: number,
  quality = 0.8
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      if (!ctx) {
        reject(new Error('Canvas context not available'))
        return
      }

      // Calculate new dimensions
      let { width, height } = img
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }
      }

      canvas.width = width
      canvas.height = height

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height)
      
      canvas.toBlob(
        blob => {
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error('Failed to create blob'))
          }
        },
        'image/jpeg',
        quality
      )
    }
    
    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = URL.createObjectURL(file)
  })
}