"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MessageCircle,
  Zap,
  Globe,
  Palette,
  ArrowLeft,
  Star,
  Users,
  Clock,
  Shield,
  CheckCircle,
  Play,
  Sparkles,
  Rocket,
  Award,
  TrendingUp,
  Heart,
  Code,
  Smartphone,
  Monitor,
  Tablet,
  ArrowRight,
  Eye,
  Settings,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [currentFeature, setCurrentFeature] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [stats, setStats] = useState({
    websites: 15000,
    users: 8500,
    uptime: 99.9,
    avgTime: 3.5,
    satisfaction: 98.5,
    countries: 45,
  })

  const features = [
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "محادثة ذكية",
      description: "تحدث مع الذكاء الاصطناعي المتطور لإنشاء موقعك بسهولة",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "معاينة فورية",
      description: "شاهد موقعك يتم بناؤه أمام عينيك في الوقت الفعلي",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "نشر تلقائي",
      description: "موقعك جاهز للنشر على الإنترنت فور الانتهاء",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "تخصيص كامل",
      description: "عدّل الألوان والتصميم والمحتوى حسب رغبتك",
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50",
    },
  ]

  const testimonials = [
    {
      name: "أحمد محمد",
      role: "مدير تنفيذي",
      content: "أنشأت موقع شركتي في أقل من 10 دقائق! النتيجة كانت مذهلة ومهنية جداً",
      rating: 5,
      avatar: "أ",
      company: "شركة النجاح للتكنولوجيا",
      image: "/placeholder.svg?height=60&width=60&text=أحمد",
    },
    {
      name: "فاطمة السعيد",
      role: "مصممة جرافيك",
      content: "المنصة سهلة جداً والتصاميم احترافية. وفرت علي ساعات من العمل",
      rating: 5,
      avatar: "ف",
      company: "استوديو الإبداع",
      image: "/placeholder.svg?height=60&width=60&text=فاطمة",
    },
    {
      name: "خالد العتيبي",
      role: "صاحب متجر",
      content: "متجري الإلكتروني أصبح جاهزاً في نفس اليوم وبدأت البيع فوراً",
      rating: 5,
      avatar: "خ",
      company: "متجر الأناقة",
      image: "/placeholder.svg?height=60&width=60&text=خالد",
    },
  ]

  const plans = [
    {
      name: "الأساسي",
      price: "10",
      originalPrice: "15",
      features: ["موقع واحد", "نطاق فرعي مجاني", "دعم أساسي", "SSL مجاني"],
      popular: false,
      color: "from-blue-500 to-blue-600",
      savings: "33%",
    },
    {
      name: "المتقدم",
      price: "25",
      originalPrice: "35",
      features: ["3 مواقع", "نطاق مخصص", "دعم متقدم", "تحليلات مفصلة", "نسخ احتياطي"],
      popular: true,
      color: "from-purple-500 to-pink-500",
      savings: "29%",
    },
    {
      name: "الاحترافي",
      price: "50",
      originalPrice: "70",
      features: ["مواقع غير محدودة", "نطاقات متعددة", "دعم أولوية", "API متقدم", "تخصيص كامل"],
      popular: false,
      color: "from-green-500 to-emerald-500",
      savings: "29%",
    },
  ]

  const steps = [
    {
      number: "01",
      title: "ابدأ المحادثة",
      description: "أخبرنا عن نوع الموقع الذي تريده",
      icon: <MessageCircle className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      number: "02",
      title: "شاهد البناء",
      description: "راقب موقعك وهو يتم إنشاؤه أمامك",
      icon: <Eye className="h-6 w-6" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      number: "03",
      title: "خصص التصميم",
      description: "عدّل الألوان والمحتوى حسب رغبتك",
      icon: <Settings className="h-6 w-6" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      number: "04",
      title: "ادفع وانشر",
      description: "ادفع بـ USDT واحصل على موقعك فوراً",
      icon: <Rocket className="h-6 w-6" />,
      color: "from-orange-500 to-red-500",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-x-hidden" dir="rtl">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-pink-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-400/5 to-blue-400/5 rounded-full blur-3xl animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>

        {/* Mouse follower */}
        <div
          className="absolute w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 blur-sm transition-all duration-300 ease-out pointer-events-none"
          style={{
            left: mousePosition.x - 8,
            top: mousePosition.y - 8,
          }}
        ></div>
      </div>

      {/* Header */}
      <header className="relative border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
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
            </div>
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
                  <Sparkles className="mr-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Full Width Horizontal */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="flex justify-center">
              <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0 px-6 py-2 text-base font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                🚀 منصة إنشاء المواقع بالذكاء الاصطناعي الأولى عربياً
              </Badge>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                  أنشئ موقعك
                </span>
                <br />
                <span className="text-gray-800">بمجرد المحادثة</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                لا تحتاج لأي خبرة تقنية. تحدث مع الذكاء الاصطناعي وشاهد موقعك يتم بناؤه في دقائق معدودة
              </p>
            </div>

            {/* CTA Buttons - Horizontal */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/chat">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg"
                >
                  ابدأ إنشاء موقعك الآن
                  <ArrowLeft className="mr-3 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-2 hover:bg-gray-50 group bg-white/80 backdrop-blur-sm px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                شاهد العرض التوضيحي
              </Button>
            </div>

            {/* Stats Row - Horizontal */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-4xl mx-auto pt-8">
              {[
                {
                  number: `${stats.websites.toLocaleString()}+`,
                  label: "موقع تم إنشاؤه",
                  icon: <Globe className="h-5 w-5" />,
                  color: "text-blue-600",
                },
                {
                  number: `${stats.users.toLocaleString()}+`,
                  label: "عميل راضي",
                  icon: <Users className="h-5 w-5" />,
                  color: "text-green-600",
                },
                {
                  number: `${stats.uptime}%`,
                  label: "وقت التشغيل",
                  icon: <Shield className="h-5 w-5" />,
                  color: "text-purple-600",
                },
                {
                  number: `${stats.avgTime} دقائق`,
                  label: "متوسط الإنشاء",
                  icon: <Clock className="h-5 w-5" />,
                  color: "text-orange-600",
                },
                {
                  number: `${stats.satisfaction}%`,
                  label: "رضا العملاء",
                  icon: <Heart className="h-5 w-5" />,
                  color: "text-pink-600",
                },
                {
                  number: `${stats.countries}+`,
                  label: "دولة",
                  icon: <TrendingUp className="h-5 w-5" />,
                  color: "text-indigo-600",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-white/20"
                >
                  <div className={`flex items-center justify-center mb-2 ${stat.color}`}>{stat.icon}</div>
                  <div className="text-2xl font-bold text-gray-800">{stat.number}</div>
                  <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Horizontal Cards */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-800">لماذا Chat2Site؟</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">نحن نجعل إنشاء المواقع أمراً بسيطاً وممتعاً للجميع</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br ${feature.bgColor} p-6 transform hover:scale-105 hover:-translate-y-2 ${currentFeature === index ? "ring-2 ring-blue-500 shadow-2xl scale-105" : ""}`}
              >
                <CardContent className="p-0 text-center space-y-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="h-5 w-5 text-blue-600 mx-auto" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works - Horizontal Steps */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-800">كيف يعمل؟</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">أربع خطوات بسيطة لموقع احترافي</p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 via-green-500 to-orange-500 rounded-full transform -translate-y-1/2 opacity-20"></div>

            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative text-center group">
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 group-hover:shadow-2xl transition-all duration-500 relative z-10`}
                  >
                    <div className="text-white">{step.icon}</div>
                  </div>
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg z-20">
                    <span className="text-sm font-bold text-gray-800">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Horizontal Slider */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-800">ماذا يقول عملاؤنا؟</h2>
            <p className="text-xl text-gray-600">آراء حقيقية من عملاء راضين</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <Card className="bg-white shadow-2xl border-0 overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative">
                    <img
                      src={testimonials[currentTestimonial]?.image || "/placeholder.svg"}
                      alt={testimonials[currentTestimonial]?.name || ""}
                      className="w-16 h-16 rounded-full object-cover shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-800">{testimonials[currentTestimonial]?.name || ""}</h4>
                    <p className="text-gray-600">{testimonials[currentTestimonial]?.role || ""}</p>
                    <p className="text-blue-600 text-sm font-medium">{testimonials[currentTestimonial]?.company || ""}</p>
                  </div>
                  <div className="flex">
                    {[...Array(testimonials[currentTestimonial]?.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                <blockquote className="text-lg text-gray-700 italic leading-relaxed mb-6">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>

                {/* Navigation */}
                <div className="flex justify-center gap-3">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentTestimonial
                          ? "bg-blue-500 scale-125 shadow-lg"
                          : "bg-gray-300 hover:bg-gray-400 hover:scale-110"
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section - Horizontal Cards */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-0 px-6 py-2 text-base font-medium shadow-lg">
              💰 عرض محدود - خصم يصل إلى 33%
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-800">اختر الخطة المناسبة</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">ادفع فقط مقابل ما تحتاجه، بدون رسوم خفية</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative transform hover:scale-105 transition-all duration-500 ${
                  plan.popular
                    ? "border-2 border-purple-500 shadow-2xl bg-gradient-to-b from-purple-50 to-white scale-105"
                    : "border shadow-xl hover:shadow-2xl bg-white"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 text-sm font-bold shadow-lg">
                      ⭐ الأكثر شعبية
                    </Badge>
                  </div>
                )}

                <CardContent className="p-8 text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                  >
                    <Code className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-gray-800">{plan.name}</h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-5xl font-bold text-blue-600">${plan.price}</span>
                      <div className="text-right">
                        <div className="text-lg text-gray-500 line-through">${plan.originalPrice}</div>
                        <div className="text-sm text-gray-500">/شهر</div>
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-0 text-sm font-bold">
                      وفر {plan.savings} - ${Number.parseInt(plan.originalPrice) - Number.parseInt(plan.price)}
                    </Badge>
                  </div>

                  <ul className="space-y-3 mb-8 text-sm">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/payment">
                    <Button
                      className={`w-full py-3 text-base font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                        plan.popular
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                          : "bg-gray-900 hover:bg-gray-800"
                      }`}
                    >
                      {plan.popular ? "ابدأ الآن" : "اختر هذه الخطة"}
                      <ArrowLeft className="mr-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Device Compatibility - Horizontal */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-800">يعمل على جميع الأجهزة</h2>
            <p className="text-xl text-gray-600">مواقعك ستبدو رائعة على كل الشاشات</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: <Smartphone className="h-12 w-12" />,
                title: "الهواتف الذكية",
                desc: "تصميم متجاوب تماماً",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: <Tablet className="h-12 w-12" />,
                title: "الأجهزة اللوحية",
                desc: "تجربة مثالية على التابلت",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: <Monitor className="h-12 w-12" />,
                title: "أجهزة الكمبيوتر",
                desc: "عرض احترافي على الشاشات الكبيرة",
                color: "from-green-500 to-emerald-500",
              },
            ].map((device, index) => (
              <div key={index} className="text-center group">
                <div
                  className={`w-24 h-24 bg-gradient-to-r ${device.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 group-hover:shadow-2xl transition-all duration-500`}
                >
                  <div className="text-white">{device.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {device.title}
                </h3>
                <p className="text-gray-600">{device.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Full Width */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">جاهز لإنشاء موقعك؟</h2>
            <p className="text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed">
              انضم إلى آلاف العملاء الراضين وابدأ رحلتك الرقمية اليوم
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/chat">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 px-10 py-4 text-lg font-bold"
                >
                  ابدأ مجاناً الآن
                  <ArrowLeft className="mr-3 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/templates">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-10 py-4 text-lg font-bold"
                >
                  استعرض القوالب
                  <Eye className="mr-3 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 text-base opacity-90 pt-8">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5" />
                <span>دفع آمن 100%</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5" />
                <span>إنشاء فوري</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5" />
                <span>ضمان الجودة</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Enhanced */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Chat2Site</h3>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                منصة ثورية لإنشاء المواقع بالذكاء الاصطناعي. نحن نجعل التكنولوجيا في خدمة الجميع.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: <Globe className="h-5 w-5" />, label: "الموقع" },
                  { icon: <MessageCircle className="h-5 w-5" />, label: "الدردشة" },
                  { icon: <Heart className="h-5 w-5" />, label: "المتابعة" },
                ].map((social, index) => (
                  <button
                    key={index}
                    className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-300"
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            </div>

            {[
              { title: "المنتج", links: ["الميزات", "الأسعار", "القوالب", "العروض التوضيحية"] },
              { title: "الدعم", links: ["المساعدة", "اتصل بنا", "الوثائق", "الأسئلة الشائعة"] },
              { title: "الشركة", links: ["من نحن", "المدونة", "الوظائف", "الشراكات"] },
            ].map((section, index) => (
              <div key={index}>
                <h4 className="font-bold mb-4 text-lg">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 Chat2Site. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
