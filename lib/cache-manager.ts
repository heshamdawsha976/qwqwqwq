// Simple in-memory cache for development (use Redis in production)
interface CacheItem<T> {
  data: T
  expires: number
  created: number
}

class CacheManager {
  private cache = new Map<string, CacheItem<any>>()
  private readonly defaultTTL = 5 * 60 * 1000 // 5 minutes

  set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    const now = Date.now()
    this.cache.set(key, {
      data,
      expires: now + ttl,
      created: now,
    })

    // Clean up expired items periodically
    this.cleanup()
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key)
    
    if (!item) {
      return null
    }

    if (Date.now() > item.expires) {
      this.cache.delete(key)
      return null
    }

    return item.data as T
  }

  has(key: string): boolean {
    const item = this.cache.get(key)
    
    if (!item) {
      return false
    }

    if (Date.now() > item.expires) {
      this.cache.delete(key)
      return false
    }

    return true
  }

  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  size(): number {
    this.cleanup()
    return this.cache.size
  }

  keys(): string[] {
    this.cleanup()
    return Array.from(this.cache.keys())
  }

  // Get cache statistics
  getStats() {
    const now = Date.now()
    let expired = 0
    let active = 0

    for (const [, item] of this.cache) {
      if (now > item.expires) {
        expired++
      } else {
        active++
      }
    }

    return {
      total: this.cache.size,
      active,
      expired,
      memoryUsage: this.getMemoryUsage(),
    }
  }

  private cleanup(): void {
    const now = Date.now()
    const toDelete: string[] = []

    for (const [key, item] of this.cache) {
      if (now > item.expires) {
        toDelete.push(key)
      }
    }

    toDelete.forEach(key => this.cache.delete(key))
  }

  private getMemoryUsage(): number {
    // Rough estimation of memory usage
    let size = 0
    for (const [key, item] of this.cache) {
      size += key.length * 2 // chars are 2 bytes
      size += JSON.stringify(item.data).length * 2
      size += 16 // overhead for expires and created
    }
    return size
  }

  // Cache decorators for functions
  cached<T extends (...args: any[]) => any>(
    fn: T,
    keyGenerator: (...args: Parameters<T>) => string,
    ttl?: number
  ): T {
    return ((...args: Parameters<T>) => {
      const key = keyGenerator(...args)
      const cached = this.get(key)
      
      if (cached !== null) {
        return cached
      }

      const result = fn(...args)
      this.set(key, result, ttl)
      return result
    }) as T
  }

  // Async cache decorator
  cachedAsync<T extends (...args: any[]) => Promise<any>>(
    fn: T,
    keyGenerator: (...args: Parameters<T>) => string,
    ttl?: number
  ): T {
    return (async (...args: Parameters<T>) => {
      const key = keyGenerator(...args)
      const cached = this.get(key)
      
      if (cached !== null) {
        return cached
      }

      const result = await fn(...args)
      this.set(key, result, ttl)
      return result
    }) as T
  }
}

// Singleton instance
export const cacheManager = new CacheManager()

// Utility functions
export function cacheKey(...parts: (string | number)[]): string {
  return parts.join(':')
}

export function createCacheKey(prefix: string, ...parts: (string | number)[]): string {
  return `${prefix}:${parts.join(':')}`
}

// Pre-configured cache functions
export const templateCache = {
  get: (id: string) => cacheManager.get(cacheKey('template', id)),
  set: (id: string, data: any) => cacheManager.set(cacheKey('template', id), data, 10 * 60 * 1000), // 10 minutes
  delete: (id: string) => cacheManager.delete(cacheKey('template', id)),
}

export const userCache = {
  get: (id: string) => cacheManager.get(cacheKey('user', id)),
  set: (id: string, data: any) => cacheManager.set(cacheKey('user', id), data, 5 * 60 * 1000), // 5 minutes
  delete: (id: string) => cacheManager.delete(cacheKey('user', id)),
}

export const websiteCache = {
  get: (id: string) => cacheManager.get(cacheKey('website', id)),
  set: (id: string, data: any) => cacheManager.set(cacheKey('website', id), data, 15 * 60 * 1000), // 15 minutes
  delete: (id: string) => cacheManager.delete(cacheKey('website', id)),
}