"use client"

import type React from "react"
import { createContext, useContext } from "react"
import { useAdminSettings } from "@/hooks/useAdminSettings"
import type { AdminSettings } from "@/lib/admin-settings"

interface SettingsContextType {
  settings: AdminSettings | null
  loading: boolean
  error: string | null
  saveSettings: (settings: AdminSettings) => Promise<boolean>
  updateSetting: (key: string, value: any) => Promise<boolean>
  resetToDefaults: () => Promise<boolean>
  exportSettings: () => Promise<string | null>
  importSettings: (settingsJson: string) => Promise<boolean>
  refetch: () => Promise<void>
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const settingsData = useAdminSettings()

  return <SettingsContext.Provider value={settingsData}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}
