import { NextRequest, NextResponse } from 'next/server';
import { AnalyticsService } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    // In a real app, you'd check admin authentication here
    // const user = await authenticate(request);
    // if (!user || user.role !== 'admin') {
    //   return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    // }

    const stats = await AnalyticsService.getOverallStats();
    const userGrowth = await AnalyticsService.getUserGrowth();

    // Mock additional stats for demo
    const enhancedStats = {
      ...stats,
      userGrowth,
      activeChats: Math.floor(Math.random() * 300) + 100,
      avgSessionTime: (Math.random() * 10 + 5).toFixed(1),
      customerSatisfaction: (Math.random() * 5 + 95).toFixed(1),
      serverUptime: (Math.random() * 0.5 + 99.5).toFixed(1),
      recentActivity: [
        {
          id: 1,
          type: "website_created",
          user: "أحمد محمد",
          time: "منذ 5 دقائق",
          status: "success"
        },
        {
          id: 2,
          type: "payment_completed",
          user: "فاطمة السعيد",
          time: "منذ 12 دقيقة",
          status: "success"
        },
        {
          id: 3,
          type: "chat_started",
          user: "خالد العتيبي",
          time: "منذ 18 دقيقة",
          status: "active"
        }
      ],
      topTemplates: [
        { name: "موقع شركة", usage: 2500, growth: "+15%" },
        { name: "متجر إلكتروني", usage: 1800, growth: "+22%" },
        { name: "مدونة شخصية", usage: 1200, growth: "+8%" },
        { name: "صفحة هبوط", usage: 950, growth: "+18%" }
      ]
    };

    return NextResponse.json({
      success: true,
      stats: enhancedStats
    });
  } catch (error) {
    console.error('Admin Stats API Error:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ في معالجة الطلب' },
      { status: 500 }
    );
  }
}