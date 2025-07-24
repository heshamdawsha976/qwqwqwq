"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Globe,
  Plus,
  Settings,
  BarChart3,
  Eye,
  Edit,
  Trash2,
  MessageCircle,
  Zap,
  Crown,
  TrendingUp,
  Users,
  Clock,
  Star
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth"

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const [stats, setStats] = useState({
    totalWebsites: 3,
    publishedWebsites: 2,
    totalVisits: 1250,
    thisMonthVisits: 340
  })

  const [websites, setWebsites] = useState([
    {
      id: '1',
      name: 'موقع شركتي',
      domain: 'mycompany.chat2site.com',
      status: 'published',
      template: 'business',
      visits: 850,
      lastUpdated: '2024-01-15',
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      name: 'متجري الإلكتروني',
      domain: 'mystore.chat2site.com',
      status: 'published',
      template: 'shop',
      visits: 400,
      lastUpdated: '2024-01-14',
      createdAt: '2024-01-12'
    },
    {
      id: '3',
      name: 'مدونتي الشخصية',
      domain: 'draft-blog.chat2site.com',
      status: 'draft',
      template: 'blog',
      visits: 0,
      lastUpdated: '2024-01-16',
      createdAt: '2024-01-16'
    }
  ])

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = '/login'
    }
  }, [isAuthenticated, isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect to login
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-800">منشور</Badge>
      case 'draft':
        return <Badge className="bg-yellow-100 text-yellow-800">مسودة</Badge>
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800">معطل</Badge>
      default:
        return <Badge>غير محدد</Badge>
    }
  }

  const getTemplateIcon = (template: string) => {
    switch (template) {
      case 'business':
        return <Globe className="h-4 w-4" />
      case 'shop':
        return <Zap className="h-4 w-4" />
      case 'blog':
        return <MessageCircle className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50" dir="rtl">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Chat2Site
              </h1>
            </Link>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">مرحباً، {user?.name}</span>
              <Button variant="outline" size="sm" className="bg-transparent">
                <Settings className="h-4 w-4 mr-2" />
                الإعدادات
              </Button>
              <Link href="/chat">
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <Plus className="h-4 w-4 mr-2" />
                  إنشاء موقع جديد
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة التحكم</h1>
            <p className="text-gray-600">إدارة مواقعك ومتابعة الإحصائيات</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "إجمالي المواقع",
                value: stats.totalWebsites,
                icon: <Globe className="h-6 w-6" />,
                color: "from-blue-500 to-blue-600",
                bgColor: "from-blue-50 to-blue-100"
              },
              {
                title: "المواقع المنشورة",
                value: stats.publishedWebsites,
                icon: <TrendingUp className="h-6 w-6" />,
                color: "from-green-500 to-green-600",
                bgColor: "from-green-50 to-green-100"
              },
              {
                title: "إجمالي الزيارات",
                value: stats.totalVisits.toLocaleString(),
                icon: <Users className="h-6 w-6" />,
                color: "from-purple-500 to-purple-600",
                bgColor: "from-purple-50 to-purple-100"
              },
              {
                title: "زيارات هذا الشهر",
                value: stats.thisMonthVisits.toLocaleString(),
                icon: <BarChart3 className="h-6 w-6" />,
                color: "from-orange-500 to-orange-600",
                bgColor: "from-orange-50 to-orange-100"
              }
            ].map((stat, index) => (
              <Card key={index} className={`bg-gradient-to-br ${stat.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                      {stat.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-gray-600 font-medium">{stat.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content */}
          <Tabs defaultValue="websites" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-white shadow-lg">
              <TabsTrigger value="websites">مواقعي</TabsTrigger>
              <TabsTrigger value="analytics">الإحصائيات</TabsTrigger>
              <TabsTrigger value="settings">الإعدادات</TabsTrigger>
            </TabsList>

            <TabsContent value="websites" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">مواقعي</h2>
                <Link href="/chat">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                    <Plus className="h-4 w-4 mr-2" />
                    إنشاء موقع جديد
                  </Button>
                </Link>
              </div>

              <div className="grid gap-6">
                {websites.map((website) => (
                  <Card key={website.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                            {getTemplateIcon(website.template)}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{website.name}</h3>
                            <p className="text-gray-600 mb-2">{website.domain}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>الزيارات: {website.visits.toLocaleString()}</span>
                              <span>آخر تحديث: {website.lastUpdated}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {getStatusBadge(website.status)}
                          
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="bg-transparent">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="bg-transparent">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">الإحصائيات</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      نمو الزيارات
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">هذا الأسبوع</span>
                        <span className="font-bold text-green-600">+23%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">هذا الشهر</span>
                        <span className="font-bold text-blue-600">+18%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">هذا العام</span>
                        <span className="font-bold text-purple-600">+45%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-600" />
                      الأداء
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">متوسط وقت التحميل</span>
                        <span className="font-bold text-green-600">1.2s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">معدل الارتداد</span>
                        <span className="font-bold text-blue-600">25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">رضا المستخدمين</span>
                        <span className="font-bold text-purple-600">4.8/5</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">إعدادات الحساب</h2>
              
              <div className="grid gap-6">
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle>معلومات الحساب</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">الاسم</label>
                      <p className="text-lg font-medium text-gray-900">{user?.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">البريد الإلكتروني</label>
                      <p className="text-lg font-medium text-gray-900">{user?.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">الخطة الحالية</label>
                      <div className="flex items-center gap-2">
                        <Crown className="h-4 w-4 text-purple-600" />
                        <span className="text-lg font-medium text-gray-900 capitalize">{user?.plan}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle>إعدادات سريعة</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-between bg-transparent">
                      تغيير كلمة المرور
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between bg-transparent">
                      إعدادات الإشعارات
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between bg-transparent">
                      تصدير البيانات
                      <Settings className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}