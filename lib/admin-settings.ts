// Admin settings management
export interface AdminSettings {
  site: {
    name: string
    description: string
    logo: string
    favicon: string
    language: string
    timezone: string
  }
  features: {
    registrationEnabled: boolean
    maintenanceMode: boolean
    analyticsEnabled: boolean
    cacheEnabled: boolean
    rateLimitEnabled: boolean
  }
  limits: {
    maxWebsitesPerUser: number
    maxFileSize: number
    maxBandwidth: number
    sessionTimeout: number
  }
  integrations: {
    googleAnalytics?: string
    facebookPixel?: string
    hotjar?: string
    intercom?: string
    stripe?: {
      publicKey: string
      webhookSecret: string
    }
  }
  email: {
    provider: 'smtp' | 'sendgrid' | 'mailgun'
    settings: {
      host?: string
      port?: number
      username?: string
      password?: string
      apiKey?: string
    }
  }
  security: {
    passwordMinLength: number
    requireTwoFactor: boolean
    allowedDomains: string[]
    blockedIPs: string[]
    maxLoginAttempts: number
    lockoutDuration: number
  }
  appearance: {
    primaryColor: string
    secondaryColor: string
    accentColor: string
    fontFamily: string
    logoSize: 'small' | 'medium' | 'large'
    headerStyle: 'minimal' | 'standard' | 'detailed'
  }
  notifications: {
    emailNotifications: boolean
    pushNotifications: boolean
    slackWebhook?: string
    discordWebhook?: string
  }
}

// Default settings
const defaultSettings: AdminSettings = {
  site: {
    name: 'Chat2Site',
    description: 'إنشاء المواقع بالذكاء الاصطناعي',
    logo: '/placeholder-logo.svg',
    favicon: '/favicon.ico',
    language: 'ar',
    timezone: 'Asia/Riyadh'
  },
  features: {
    registrationEnabled: true,
    maintenanceMode: false,
    analyticsEnabled: true,
    cacheEnabled: true,
    rateLimitEnabled: true
  },
  limits: {
    maxWebsitesPerUser: 5,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    maxBandwidth: 100 * 1024 * 1024, // 100MB
    sessionTimeout: 30 * 60 * 1000 // 30 minutes
  },
  integrations: {},
  email: {
    provider: 'smtp',
    settings: {}
  },
  security: {
    passwordMinLength: 8,
    requireTwoFactor: false,
    allowedDomains: [],
    blockedIPs: [],
    maxLoginAttempts: 5,
    lockoutDuration: 15 * 60 * 1000 // 15 minutes
  },
  appearance: {
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    accentColor: '#10B981',
    fontFamily: 'Cairo',
    logoSize: 'medium',
    headerStyle: 'standard'
  },
  notifications: {
    emailNotifications: true,
    pushNotifications: false
  }
}

// Settings manager
class AdminSettingsManager {
  private settings: AdminSettings = { ...defaultSettings }
  private listeners: Array<(settings: AdminSettings) => void> = []

  // Get all settings
  getSettings(): AdminSettings {
    return { ...this.settings }
  }

  // Get specific setting
  getSetting<K extends keyof AdminSettings>(key: K): AdminSettings[K] {
    return this.settings[key]
  }

  // Update settings
  updateSettings(updates: Partial<AdminSettings>): void {
    this.settings = {
      ...this.settings,
      ...updates
    }
    
    this.notifyListeners()
    this.persistSettings()
  }

  // Update specific section
  updateSection<K extends keyof AdminSettings>(
    section: K,
    updates: Partial<AdminSettings[K]>
  ): void {
    this.settings[section] = {
      ...this.settings[section],
      ...updates
    }
    
    this.notifyListeners()
    this.persistSettings()
  }

  // Reset to defaults
  resetToDefaults(): void {
    this.settings = { ...defaultSettings }
    this.notifyListeners()
    this.persistSettings()
  }

  // Subscribe to changes
  subscribe(listener: (settings: AdminSettings) => void): () => void {
    this.listeners.push(listener)
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener)
      if (index > -1) {
        this.listeners.splice(index, 1)
      }
    }
  }

  // Validate settings
  validateSettings(settings: Partial<AdminSettings>): string[] {
    const errors: string[] = []

    if (settings.site?.name && settings.site.name.length < 1) {
      errors.push('اسم الموقع مطلوب')
    }

    if (settings.security?.passwordMinLength && settings.security.passwordMinLength < 6) {
      errors.push('الحد الأدنى لطول كلمة المرور هو 6 أحرف')
    }

    if (settings.limits?.maxFileSize && settings.limits.maxFileSize > 50 * 1024 * 1024) {
      errors.push('الحد الأقصى لحجم الملف هو 50 ميجابايت')
    }

    if (settings.appearance?.primaryColor && !/^#[0-9A-F]{6}$/i.test(settings.appearance.primaryColor)) {
      errors.push('لون أساسي غير صالح')
    }

    return errors
  }

  // Export settings
  exportSettings(): string {
    return JSON.stringify(this.settings, null, 2)
  }

  // Import settings
  importSettings(settingsJson: string): boolean {
    try {
      const imported = JSON.parse(settingsJson) as Partial<AdminSettings>
      const errors = this.validateSettings(imported)
      
      if (errors.length > 0) {
        console.error('Import validation errors:', errors)
        return false
      }

      this.updateSettings(imported)
      return true
    } catch (error) {
      console.error('Failed to import settings:', error)
      return false
    }
  }

  // Private methods
  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener(this.settings)
      } catch (error) {
        console.error('Settings listener error:', error)
      }
    })
  }

  private persistSettings(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('admin_settings', JSON.stringify(this.settings))
    }
  }

  private loadSettings(): void {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('admin_settings')
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as AdminSettings
          this.settings = { ...defaultSettings, ...parsed }
        } catch (error) {
          console.error('Failed to load stored settings:', error)
        }
      }
    }
  }

  // Initialize
  init(): void {
    this.loadSettings()
  }
}

// Singleton instance
export const adminSettingsManager = new AdminSettingsManager()

// React hook for admin settings
import { useState, useEffect } from 'react'

export function useAdminSettings() {
  const [settings, setSettings] = useState<AdminSettings>(adminSettingsManager.getSettings())

  useEffect(() => {
    adminSettingsManager.init()
    setSettings(adminSettingsManager.getSettings())

    const unsubscribe = adminSettingsManager.subscribe(setSettings)
    return unsubscribe
  }, [])

  return {
    settings,
    updateSettings: adminSettingsManager.updateSettings.bind(adminSettingsManager),
    updateSection: adminSettingsManager.updateSection.bind(adminSettingsManager),
    resetToDefaults: adminSettingsManager.resetToDefaults.bind(adminSettingsManager),
    validateSettings: adminSettingsManager.validateSettings.bind(adminSettingsManager),
    exportSettings: adminSettingsManager.exportSettings.bind(adminSettingsManager),
    importSettings: adminSettingsManager.importSettings.bind(adminSettingsManager)
  }
}

// Utility functions
export function isMaintenanceMode(): boolean {
  return adminSettingsManager.getSetting('features').maintenanceMode
}

export function isFeatureEnabled(feature: keyof AdminSettings['features']): boolean {
  return adminSettingsManager.getSetting('features')[feature]
}

export function getUserLimit(limit: keyof AdminSettings['limits']): number {
  return adminSettingsManager.getSetting('limits')[limit]
}

export function getAppearanceSetting<K extends keyof AdminSettings['appearance']>(
  setting: K
): AdminSettings['appearance'][K] {
  return adminSettingsManager.getSetting('appearance')[setting]
}