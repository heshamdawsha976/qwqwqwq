"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdminSettings } from "@/types/database.types"
import {
  Settings,
  Palette,
  DollarSign,
  MessageCircle,
  Save,
  Upload,
  Download,
  Trash2,
  Plus,
  BarChart3,
  Bell,
  Mail,
  Zap,
  ArrowLeft,
  Loader2,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Globe,
  Shield,
  Database,
  Code,
} from "lucide-react"

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<AdminSettings>({
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
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")
  const [activeTab, setActiveTab] = useState("general")

  // Load settings on component mount
  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/settings")
      if (response.ok) {
        const data = await response.json()
        setSettings({ ...settings, ...data })
      }
    } catch (error) {
      console.error("Failed to load settings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const saveSettings = async () => {
    setIsSaving(true)
    setSaveStatus("idle")
    
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        setSaveStatus("success")
        setTimeout(() => setSaveStatus("idle"), 3000)
      } else {
        setSaveStatus("error")
      }
    } catch (error) {
      console.error("Failed to save settings:", error)
      setSaveStatus("error")
    } finally {
      setIsSaving(false)
    }
  }

  const updateSetting = (key: keyof AdminSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">جاري تحميل الإعدادات...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6" dir="rtl">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 hover:bg-white rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">إعدادات النظام</h1>
              <p className="text-gray-600">إدارة جميع إعدادات المنصة</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {saveStatus === "success" && (
              <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-lg">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">تم الحفظ بنجاح</span>
              </div>
            )}
            {saveStatus === "error" && (
              <div className="flex items-center gap-2 bg-red-100 text-red-800 px-3 py-1 rounded-lg">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm">فشل في الحفظ</span>
              </div>
            )}
            
            <Button
              onClick={loadSettings}
              variant="outline"
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              تحديث
            </Button>
            
            <Button
              onClick={saveSettings}
              disabled={isSaving}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {isSaving ? "جاري الحفظ..." : "حفظ الإعدادات"}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-lg h-12">
            <TabsTrigger value="general" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Settings className="h-4 w-4" />
              عام
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Zap className="h-4 w-4" />
              الذكاء الاصطناعي
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <DollarSign className="h-4 w-4" />
              المدفوعات
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Globe className="h-4 w-4" />
              المميزات
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Code className="h-4 w-4" />
              الأسعار
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-blue-600" />
                    الإعدادات العامة
                  </CardTitle>
                  <CardDescription>إعدادات التطبيق الأساسية</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">اسم التطبيق</label>
                      <Input
                        value={settings.app_name}
                        onChange={(e) => updateSetting("app_name", e.target.value)}
                        placeholder="Chat2Site"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">رابط التطبيق</label>
                      <Input
                        value={settings.app_url}
                        onChange={(e) => updateSetting("app_url", e.target.value)}
                        placeholder="https://chat2site.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">وصف التطبيق</label>
                    <Input
                      value={settings.app_description}
                      onChange={(e) => updateSetting("app_description", e.target.value)}
                      placeholder="منصة إنشاء المواقع بالذكاء الاصطناعي"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">بريد التواصل</label>
                      <Input
                        value={settings.contact_email}
                        onChange={(e) => updateSetting("contact_email", e.target.value)}
                        placeholder="info@chat2site.com"
                        type="email"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">بريد الدعم</label>
                      <Input
                        value={settings.support_email}
                        onChange={(e) => updateSetting("support_email", e.target.value)}
                        placeholder="support@chat2site.com"
                        type="email"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Settings */}
          <TabsContent value="ai">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-purple-600" />
                    إعدادات الذكاء الاصطناعي
                  </CardTitle>
                  <CardDescription>إعدادات محركات الذكاء الاصطناعي</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">مفتاح OpenAI API</label>
                      <Input
                        value={settings.openai_api_key}
                        onChange={(e) => updateSetting("openai_api_key", e.target.value)}
                        placeholder="sk-..."
                        type="password"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">مفتاح Anthropic API</label>
                      <Input
                        value={settings.anthropic_api_key}
                        onChange={(e) => updateSetting("anthropic_api_key", e.target.value)}
                        placeholder="sk-ant-..."
                        type="password"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">نموذج الذكاء الاصطناعي</label>
                      <select
                        value={settings.ai_model}
                        onChange={(e) => updateSetting("ai_model", e.target.value)}
                        className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="gpt-4">GPT-4</option>
                        <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                        <option value="claude-3-opus">Claude 3 Opus</option>
                        <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">الحد الأقصى للرموز</label>
                      <Input
                        value={settings.max_tokens}
                        onChange={(e) => updateSetting("max_tokens", parseInt(e.target.value))}
                        placeholder="4000"
                        type="number"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payment">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    إعدادات المدفوعات
                  </CardTitle>
                  <CardDescription>إعدادات العملات المشفرة والدفع</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">عنوان محفظة USDT</label>
                      <Input
                        value={settings.usdt_address}
                        onChange={(e) => updateSetting("usdt_address", e.target.value)}
                        placeholder="TQrYKdQBJJt4iNKKSRhqwYqpamQKGvvZMGm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">مفتاح Tron API</label>
                      <Input
                        value={settings.tron_api_key}
                        onChange={(e) => updateSetting("tron_api_key", e.target.value)}
                        placeholder="Your Tron API Key"
                        type="password"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">الحد الأدنى للدفع (USDT)</label>
                      <Input
                        value={settings.min_payment_amount}
                        onChange={(e) => updateSetting("min_payment_amount", parseFloat(e.target.value))}
                        placeholder="10"
                        type="number"
                        step="0.01"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">وقت تأكيد الدفع (دقائق)</label>
                      <Input
                        value={settings.payment_confirmation_time}
                        onChange={(e) => updateSetting("payment_confirmation_time", parseInt(e.target.value))}
                        placeholder="10"
                        type="number"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Features Settings */}
          <TabsContent value="features">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-600" />
                    إعدادات المميزات
                  </CardTitle>
                  <CardDescription>تفعيل وإلغاء تفعيل مميزات المنصة</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { key: "enable_registration", label: "تسجيل المستخدمين", icon: Shield },
                      { key: "enable_chat", label: "نظام المحادثة", icon: MessageCircle },
                      { key: "enable_templates", label: "القوالب", icon: Palette },
                      { key: "enable_analytics", label: "التحليلات", icon: Database },
                      { key: "enable_custom_domains", label: "النطاقات المخصصة", icon: Globe },
                    ].map(({ key, label, icon: Icon }) => (
                      <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-gray-600" />
                          <span className="font-medium">{label}</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings[key as keyof AdminSettings] as boolean}
                            onChange={(e) => updateSetting(key as keyof AdminSettings, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* Website Limits */}
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-4">حدود المواقع لكل خطة</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">المجاني</label>
                        <Input
                          value={settings.free_websites_limit}
                          onChange={(e) => updateSetting("free_websites_limit", parseInt(e.target.value))}
                          type="number"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">الأساسي</label>
                        <Input
                          value={settings.basic_websites_limit}
                          onChange={(e) => updateSetting("basic_websites_limit", parseInt(e.target.value))}
                          type="number"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">المتقدم</label>
                        <Input
                          value={settings.advanced_websites_limit}
                          onChange={(e) => updateSetting("advanced_websites_limit", parseInt(e.target.value))}
                          type="number"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">الاحترافي</label>
                        <Input
                          value={settings.pro_websites_limit === -1 ? "غير محدود" : settings.pro_websites_limit}
                          onChange={(e) => updateSetting("pro_websites_limit", e.target.value === "غير محدود" ? -1 : parseInt(e.target.value))}
                          placeholder="غير محدود"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Pricing Settings */}
          <TabsContent value="pricing">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-orange-600" />
                    إعدادات الأسعار
                  </CardTitle>
                  <CardDescription>أسعار الخطط بالـ USDT</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
                      <h4 className="font-bold text-blue-800 mb-2">الأساسي</h4>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">السعر (USDT)</label>
                        <Input
                          value={settings.basic_plan_price}
                          onChange={(e) => updateSetting("basic_plan_price", parseFloat(e.target.value))}
                          type="number"
                          step="0.01"
                        />
                      </div>
                    </div>

                    <div className="p-4 border-2 border-purple-200 rounded-lg bg-purple-50">
                      <h4 className="font-bold text-purple-800 mb-2">المتقدم</h4>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">السعر (USDT)</label>
                        <Input
                          value={settings.advanced_plan_price}
                          onChange={(e) => updateSetting("advanced_plan_price", parseFloat(e.target.value))}
                          type="number"
                          step="0.01"
                        />
                      </div>
                    </div>

                    <div className="p-4 border-2 border-green-200 rounded-lg bg-green-50">
                      <h4 className="font-bold text-green-800 mb-2">الاحترافي</h4>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">السعر (USDT)</label>
                        <Input
                          value={settings.pro_plan_price}
                          onChange={(e) => updateSetting("pro_plan_price", parseFloat(e.target.value))}
                          type="number"
                          step="0.01"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
