"use client"

import { useState, useEffect } from "react"
import { type AdminSettings } from "@/types/database.types"

export function useAdminSettings() {
  const [settings, setSettings] = useState<AdminSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // جلب الإعدادات
  const fetchSettings = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await AdminSettingsService.getAllSettings()
      setSettings(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ في جلب الإعدادات")
    } finally {
      setLoading(false)
    }
  }

  // حفظ الإعدادات
  const saveSettings = async (newSettings: AdminSettings) => {
    try {
      setError(null)
      const success = await AdminSettingsService.saveSettings(newSettings)
      if (success) {
        setSettings(newSettings)
        return true
      } else {
        throw new Error("فشل في حفظ الإعدادات")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ في حفظ الإعدادات")
      return false
    }
  }

  // تحديث إعداد محدد
  const updateSetting = async (key: string, value: any) => {
    try {
      setError(null)
      const success = await AdminSettingsService.updateSetting(key, value)
      if (success) {
        await fetchSettings() // إعادة جلب الإعدادات
        return true
      } else {
        throw new Error("فشل في تحديث الإعداد")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ في تحديث الإعداد")
      return false
    }
  }

  // إعادة تعيين للقيم الافتراضية
  const resetToDefaults = async () => {
    try {
      setError(null)
      const success = await AdminSettingsService.resetToDefaults()
      if (success) {
        await fetchSettings()
        return true
      } else {
        throw new Error("فشل في إعادة التعيين")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ في إعادة التعيين")
      return false
    }
  }

  // تصدير الإعدادات
  const exportSettings = async () => {
    try {
      setError(null)
      return await AdminSettingsService.exportSettings()
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ في تصدير الإعدادات")
      return null
    }
  }

  // استيراد الإعدادات
  const importSettings = async (settingsJson: string) => {
    try {
      setError(null)
      const success = await AdminSettingsService.importSettings(settingsJson)
      if (success) {
        await fetchSettings()
        return true
      } else {
        throw new Error("فشل في استيراد الإعدادات")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ في استيراد الإعدادات")
      return false
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  return {
    settings,
    loading,
    error,
    saveSettings,
    updateSetting,
    resetToDefaults,
    exportSettings,
    importSettings,
    refetch: fetchSettings,
  }
}
