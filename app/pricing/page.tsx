"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, CheckCircle, Crown, Zap, Star, ArrowLeft, Globe, Palette, Code } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const plans = [
    {
      id: "basic",
      name: "الأساسي",
      price: 50,
      originalPrice: 75,
      currency: "USD",
      features: [
        "موقع واحد احترافي",
        "قالب حسب نوع النشاط",
        "تخصيص الألوان والنصوص",
        "نطاق فرعي مجاني",
        "استضافة لمدة سنة",
        "SSL مجاني",
        "دعم فني أساسي"
      ],
      popular: false,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      savings: "33%",
      icon: <Globe className="h-8 w-8" />
    },
    {
      id: "advanced",
      name: "المتقدم",
      price: 100,
      originalPrice: 150,
      currency: "USD",
      features: [
        "3 مواقع احترافية",
        "جميع القوالب المتاحة",
        "تخصيص كامل للتصميم",
        "نطاق مخصص مجاني",
        "استضافة لمدة سنتين",
        "SSL متقدم",
        "نظام تحليلات مفصل",
        "دعم فني متقدم",
        "نسخ احتياطية يومية"
      ],
      popular: true,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      savings: "33%",
      icon: <Crown className="h-8 w-8" />
    },
    {
      id: "pro",
      name: "الاحترافي",
      price: 200,
      originalPrice: 300,
      currency: "USD",
      features: [
        "مواقع غير محدودة",
        "قوالب حصرية ومتميزة",
        "محرر متقدم للتخصيص",
        "نطاقات متعددة",
        "استضافة مدى الحياة",
        "SSL احترافي",
        "تحليلات متقدمة + تقارير",
        "دعم أولوية 24/7",
        "API متقدم للتكامل",
        "تدريب شخصي"
      ],
      popular: false,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      savings: "33%",
      icon: <Star className="h-8 w-8" />
    }
  ]

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId)
    // Redirect to payment page with selected plan
    window.location.href = `/payment?plan=${planId}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100" dir="rtl">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Chat2Site
                </h1>
                <p className="text-sm text-gray-500 font-medium">إنشاء المواقع بالذكاء الاصطناعي</p>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="hover:bg-blue-50 transition-colors duration-300">
                  تسجيل الدخول
                </Button>
              </Link>
              <Link href="/chat">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  ابدأ الآن
                  <Zap className="mr-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <Badge className="mb-6 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-0 px-6 py-2 text-base font-medium shadow-lg">
              💰 عرض محدود - خصم يصل إلى 33%
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-900">
              اختر الخطة
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                المناسبة لك
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              احصل على موقع احترافي بدقائق معدودة. ادفع مرة واحدة واحصل على موقعك مدى الحياة!
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-8 mb-12 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>ضمان استرداد المال</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>دفع آمن 100%</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>تسليم فوري</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={plan.id}
                className={`relative transform hover:scale-105 transition-all duration-500 cursor-pointer ${
                  plan.popular
                    ? "border-2 border-purple-500 shadow-2xl bg-gradient-to-b from-purple-50 to-white scale-105"
                    : "border shadow-xl hover:shadow-2xl bg-white"
                } ${selectedPlan === plan.id ? "ring-4 ring-blue-500" : ""}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 text-sm font-bold shadow-lg">
                      ⭐ الأكثر شعبية
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                  >
                    <div className="text-white">{plan.icon}</div>
                  </div>

                  <CardTitle className="text-2xl font-bold mb-2 text-gray-800">{plan.name}</CardTitle>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-5xl font-bold text-blue-600">${plan.price}</span>
                      <div className="text-right">
                        <div className="text-lg text-gray-500 line-through">${plan.originalPrice}</div>
                        <div className="text-sm text-gray-500">دفعة واحدة</div>
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-0 text-sm font-bold">
                      وفر {plan.savings} - ${plan.originalPrice - plan.price}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 font-medium text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full py-4 text-base font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        : "bg-gray-900 hover:bg-gray-800"
                    }`}
                  >
                    {selectedPlan === plan.id ? "محدد ✓" : "اختر هذه الخطة"}
                    <ArrowLeft className="mr-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">مقارنة الميزات</h2>
            <p className="text-lg text-gray-600">تفاصيل كاملة عن كل خطة</p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                  <tr>
                    <th className="text-right py-4 px-6 font-bold text-gray-800">الميزة</th>
                    <th className="text-center py-4 px-6 font-bold text-blue-600">الأساسي</th>
                    <th className="text-center py-4 px-6 font-bold text-purple-600">المتقدم</th>
                    <th className="text-center py-4 px-6 font-bold text-green-600">الاحترافي</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["عدد المواقع", "1", "3", "غير محدود"],
                    ["القوالب المتاحة", "أساسية", "جميع القوالب", "حصرية + جميع القوالب"],
                    ["النطاق", "فرعي مجاني", "مخصص مجاني", "متعدد"],
                    ["الاستضافة", "سنة واحدة", "سنتان", "مدى الحياة"],
                    ["الدعم الفني", "أساسي", "متقدم", "أولوية 24/7"],
                    ["التحليلات", "أساسية", "مفصلة", "متقدمة + تقارير"],
                    ["النسخ الاحتياطية", "أسبوعية", "يومية", "في الوقت الفعلي"],
                  ].map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-medium text-gray-900">{row[0]}</td>
                      <td className="py-4 px-6 text-center text-gray-700">{row[1]}</td>
                      <td className="py-4 px-6 text-center text-gray-700">{row[2]}</td>
                      <td className="py-4 px-6 text-center text-gray-700">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">الأسئلة الشائعة</h2>
            <p className="text-lg text-gray-600">كل ما تحتاج لمعرفته</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "هل يمكنني تغيير الخطة لاحقاً؟",
                a: "نعم، يمكنك الترقية لخطة أفضل في أي وقت مع دفع الفرق فقط."
              },
              {
                q: "هل هناك رسوم شهرية؟",
                a: "لا، جميع خططنا بدفعة واحدة فقط. لا توجد رسوم شهرية أو مخفية."
              },
              {
                q: "كم من الوقت يستغرق إنشاء الموقع؟",
                a: "يتم إنشاء موقعك في دقائق معدودة فور إكمال المحادثة مع الذكاء الاصطناعي."
              },
              {
                q: "هل يمكنني تعديل الموقع بعد الإنشاء؟",
                a: "نعم، يمكنك تعديل النصوص والألوان والصور في أي وقت من لوحة التحكم."
              },
              {
                q: "هل تقدمون ضمان استرداد المال؟",
                a: "نعم، ضمان استرداد كامل خلال 30 يوم إذا لم تكن راضٍ عن الخدمة."
              }
            ].map((faq, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-3">{faq.q}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">جاهز لإنشاء موقعك؟</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            ابدأ الآن واحصل على موقع احترافي في دقائق معدودة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/chat">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 px-10 py-4 text-lg font-bold"
              >
                ابدأ إنشاء موقعك
                <Zap className="mr-3 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/templates">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-10 py-4 text-lg font-bold"
              >
                استعرض القوالب
                <Palette className="mr-3 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold">Chat2Site</h3>
          </div>
          <p className="text-gray-400 mb-6">إنشاء المواقع بالذكاء الاصطناعي - بسيط وسريع واحترافي</p>
          <div className="flex items-center justify-center gap-8 text-sm">
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              شروط الاستخدام
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              سياسة الخصوصية
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
              اتصل بنا
            </Link>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-gray-400">&copy; 2024 Chat2Site. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
