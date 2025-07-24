"use client"

import { useState, useEffect } from "react"
import { type AdminSettings } from "@/types/database.types"

export function useAdminSettings() {
  const [settings, setSettings] = useState<AdminSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Mock default settings
  const defaultSettings: AdminSettings = {
    app_name: "Chat2Site",
    app_description: "منصة إنشاء المواقع بالذكاء الاصطناعي",
    app_url: "https://chat2site.com",
    contact_email: "info@chat2site.com",
    support_email: "support@chat2site.com",
    openai_api_key: "",
    anthropic_api_key: "",
    ai_model: "gpt-4",
    max_tokens: 4000,
    usdt_address: "TQrYKdQBJJt4iNKKSRhqwYqpamQKGvvZMGm",
    tron_api_key: "",
    min_payment_amount: 10,
    payment_confirmation_time: 10,
    enable_registration: true,
    enable_chat: true,
    enable_templates: true,
    enable_analytics: true,
    enable_custom_domains: true,
    free_websites_limit: 1,
    basic_websites_limit: 1,
    advanced_websites_limit: 3,
    pro_websites_limit: -1,
    basic_plan_price: 10,
    advanced_plan_price: 25,
    pro_plan_price: 50,
  }

  // جلب الإعدادات
  const fetchSettings = async () => {
    try {
      setLoading(true)
      setError(null)
      // For now, just return default settings
      setSettings(defaultSettings)
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
      setSettings(newSettings)
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ في حفظ الإعدادات")
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
    refetch: fetchSettings,
  }
}
