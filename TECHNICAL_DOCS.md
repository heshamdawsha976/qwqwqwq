# 📚 دليل التوثيق التقني - مشروع Chat2Site

## 🏗️ البنية التقنية

### Stack التكنولوجي
```typescript
Frontend: Next.js 15 + React 19 + TypeScript
UI: Shadcn/ui + Tailwind CSS + Radix UI
Database: JSON Files (simple)
Styling: CSS Modules + Tailwind
Icons: Lucide React
Fonts: Cairo (Arabic)
```

---

## 📋 متطلبات النظام

### البيئة المطلوبة
- **Node.js**: v18+ 
- **NPM**: v9+
- **TypeScript**: v5+
- **Next.js**: v15+

### المتصفحات المدعومة
- Chrome 80+
- Firefox 78+
- Safari 14+
- Edge 80+

---

## 🔧 إعداد المشروع

### 1. تثبيت المكتبات
```bash
# تثبيت المكتبات الأساسية
npm install

# إضافة مكتبات إضافية (إذا لزم الأمر)
npm install uuid @types/uuid
npm install js-cookie @types/js-cookie
```

### 2. متغيرات البيئة
```bash
# .env.local
NEXT_PUBLIC_APP_NAME="Chat2Site"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
```

### 3. تشغيل المشروع
```bash
# تطوير
npm run dev

# بناء للإنتاج
npm run build

# تشغيل الإنتاج
npm start
```

---

## 📁 هيكل المشروع المفصل

```
/app/
├── app/                          # Next.js App Router
│   ├── globals.css               # الأنماط العامة
│   ├── layout.tsx                # التخطيط الأساسي
│   ├── page.tsx                  # الصفحة الرئيسية
│   ├── loading.tsx               # صفحة التحميل
│   ├── error.tsx                 # صفحة الأخطاء
│   ├── not-found.tsx             # صفحة 404
│   │
│   ├── chat/                     # صفحة المحادثة
│   │   ├── page.tsx              # واجهة المحادثة
│   │   └── loading.tsx           # تحميل المحادثة
│   │
│   ├── pricing/                  # صفحة الأسعار
│   │   ├── page.tsx              # عرض الخطط
│   │   └── components/           # مكونات التسعير
│   │
│   ├── payment/                  # صفحة الدفع
│   │   ├── page.tsx              # نموذج الدفع
│   │   └── success/              # تأكيد الدفع
│   │
│   ├── admin/                    # لوحة التحكم
│   │   ├── page.tsx              # الإحصائيات
│   │   ├── orders/               # إدارة الطلبات
│   │   └── templates/            # إدارة القوالب
│   │
│   └── api/                      # API Routes
│       ├── orders/               # إدارة الطلبات
│       ├── templates/            # إدارة القوالب
│       ├── chat/                 # محاكاة الـ AI
│       └── payment/              # معالجة الدفع
│
├── components/                   # المكونات المعادة الاستخدام
│   ├── ui/                       # مكونات Shadcn/ui
│   ├── chat/                     # مكونات المحادثة
│   ├── website-preview/          # معاينة المواقع
│   ├── payment/                  # مكونات الدفع
│   └── admin/                    # مكونات الإدارة
│
├── lib/                          # المكتبات والأدوات
│   ├── templates.ts              # قوالب المواقع
│   ├── ai-responses.ts           # ردود الذكاء الاصطناعي
│   ├── database.ts               # قاعدة البيانات البسيطة
│   ├── utils.ts                  # أدوات مساعدة
│   └── constants.ts              # الثوابت
│
├── data/                         # البيانات المحلية
│   ├── orders.json               # الطلبات
│   ├── templates.json            # القوالب
│   └── settings.json             # الإعدادات
│
├── public/                       # الملفات العامة
│   ├── images/                   # الصور
│   ├── templates/                # صور القوالب
│   ├── mockups/                  # معاينات المواقع
│   └── icons/                    # الأيقونات
│
└── types/                        # تعريفات TypeScript
    ├── database.ts               # أنواع قاعدة البيانات
    ├── api.ts                    # أنواع API
    └── templates.ts              # أنواع القوالب
```

---

## 🎨 نظام التصميم

### الألوان الأساسية
```css
:root {
  /* الألوان الأساسية */
  --primary: #3B82F6;        /* أزرق */
  --secondary: #8B5CF6;      /* بنفسجي */
  --accent: #EC4899;         /* وردي */
  
  /* الألوان الرمادية */
  --gray-50: #F9FAFB;
  --gray-100: #F3F4F6;
  --gray-900: #111827;
  
  /* ألوان النجاح والخطأ */
  --success: #10B981;
  --error: #EF4444;
  --warning: #F59E0B;
}
```

### الخطوط
```css
font-family: 'Cairo', 'Inter', system-ui, sans-serif;

/* الأحجام */
--text-xs: 0.75rem;        /* 12px */
--text-sm: 0.875rem;       /* 14px */
--text-base: 1rem;         /* 16px */
--text-lg: 1.125rem;       /* 18px */
--text-xl: 1.25rem;        /* 20px */
--text-2xl: 1.5rem;        /* 24px */
--text-3xl: 1.875rem;      /* 30px */
```

### المسافات
```css
/* Spacing System */
--space-1: 0.25rem;        /* 4px */
--space-2: 0.5rem;         /* 8px */
--space-4: 1rem;           /* 16px */
--space-6: 1.5rem;         /* 24px */
--space-8: 2rem;           /* 32px */
```

---

## 🗄️ هيكل قاعدة البيانات

### ملف orders.json
```typescript
interface Order {
  id: string;                    // معرف فريد
  customerName: string;          // اسم العميل
  email: string;                 // البريد الإلكتروني
  phone?: string;                // رقم الهاتف
  websiteType: TemplateType;     // نوع الموقع
  plan: 'basic' | 'advanced' | 'pro';  // الخطة
  amount: number;                // المبلغ المدفوع
  currency: 'USD' | 'SAR';      // العملة
  status: 'pending' | 'paid' | 'cancelled';  // حالة الطلب
  paymentId?: string;            // معرف الدفع
  websiteData: {                 // بيانات الموقع
    title: string;
    description: string;
    sections: string[];
    colors: string[];
    customizations: Record<string, any>;
  };  
  createdAt: string;             // تاريخ الإنشاء
  updatedAt: string;             // تاريخ التحديث
  deliveredAt?: string;          // تاريخ التسليم
}
```

### ملف templates.json
```typescript
interface Template {
  id: string;                    // معرف فريد
  name: string;                  // اسم القالب
  category: TemplateCategory;    // تصنيف القالب
  description: string;           // وصف القالب
  preview: string;               // صورة المعاينة
  thumbnail: string;             // صورة مصغرة
  html: string;                  // كود HTML
  css: string;                   // كود CSS
  sections: Section[];           // أقسام الموقع
  features: string[];            // ميزات القالب
  price: {                       // أسعار الخطط
    basic: number;
    advanced: number;
    pro: number;
  };
  isActive: boolean;             // هل القالب متاح
  createdAt: string;             // تاريخ الإنشاء
  updatedAt: string;             // تاريخ التحديث
}

type TemplateCategory = 'restaurant' | 'shop' | 'clinic' | 'portfolio' | 'business' | 'blog';

interface Section {
  id: string;
  name: string;
  content: string;
  isEditable: boolean;
}
```

---

## 🤖 نظام محاكاة الذكاء الاصطناعي

### خوارزمية الردود
```typescript
interface AIResponse {
  trigger: string | RegExp;       // محفز الرد
  responses: string[];            // الردود المحتملة
  action?: 'show_template' | 'request_info' | 'finalize';  // إجراء مصاحب
  delay: [number, number];        // تأخير عشوائي (min, max)
}

// مثال على الردود
const aiResponses: AIResponse[] = [
  {
    trigger: /مطعم|restaurant/i,
    responses: [
      "رائع! سأبني لك موقع مطعم احترافي...",
      "ممتاز! المطاعم تحتاج تصميم جذاب للقائمة...",
      "سأضيف قسم خاص لقائمة الطعام والحجز..."
    ],
    action: 'show_template',
    delay: [1500, 3000]
  }
];
```

### تدفق المحادثة
```typescript
type ChatStep = 'welcome' | 'business_type' | 'business_name' | 'description' | 'customization' | 'finalize';

interface ChatState {
  currentStep: ChatStep;
  businessType: string;
  businessName: string;
  description: string;
  selectedTemplate: string;
  customizations: Record<string, any>;
}
```

---

## 💳 نظام الدفع

### تكامل Stripe
```typescript
// lib/stripe.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createPaymentIntent(
  amount: number,
  currency: string = 'usd',
  metadata: Record<string, string>
) {
  return await stripe.paymentIntents.create({
    amount: amount * 100, // Stripe uses cents
    currency,
    metadata
  });
}
```

### معالجة الطلبات
```typescript
// app/api/payment/route.ts
export async function POST(request: Request) {
  const { orderId, amount, currency } = await request.json();
  
  try {
    const paymentIntent = await createPaymentIntent(amount, currency, {
      orderId
    });
    
    return Response.json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    return Response.json({ error: 'Payment failed' }, { status: 400 });
  }
}
```

---

## 📊 نظام الإحصائيات

### مؤشرات الأداء
```typescript
interface Analytics {
  totalOrders: number;           // إجمالي الطلبات
  totalRevenue: number;          // إجمالي الإيرادات
  conversionRate: number;        // معدل التحويل
  averageOrderValue: number;     // متوسط قيمة الطلب
  topTemplates: TemplateStats[]; // أشهر القوالب
  monthlyStats: MonthlyStats[];  // إحصائيات شهرية
}

interface TemplateStats {
  templateId: string;
  name: string;
  orders: number;
  revenue: number;
}

interface MonthlyStats {
  month: string;
  orders: number;
  revenue: number;
  newCustomers: number;
}
```

---

## 🔒 الأمان والحماية

### التحقق من البيانات
```typescript
import { z } from 'zod';

// Schema للطلب الجديد
export const orderSchema = z.object({
  customerName: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  websiteType: z.enum(['restaurant', 'shop', 'clinic', 'portfolio']),
  plan: z.enum(['basic', 'advanced', 'pro']),
  websiteData: z.object({
    title: z.string().min(1).max(200),
    description: z.string().min(10).max(1000),
    sections: z.array(z.string()),
    colors: z.array(z.string()),
  })
});
```

### حماية API Routes
```typescript
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const validatedData = orderSchema.parse(data);
    
    // معالجة البيانات المتحققة
    return Response.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ 
        error: 'بيانات غير صحيحة', 
        details: error.errors 
      }, { status: 400 });
    }
    
    return Response.json({ 
      error: 'خطأ في الخادم' 
    }, { status: 500 });
  }
}
```

---

## 🎯 اختبار الجودة

### Unit Tests
```typescript
// __tests__/ai-responses.test.ts
import { getAIResponse } from '@/lib/ai-responses';

describe('AI Response System', () => {
  test('should return restaurant response for restaurant input', () => {
    const response = getAIResponse('أريد موقع مطعم');
    expect(response.action).toBe('show_template');
    expect(response.templateType).toBe('restaurant');
  });
});
```

### Integration Tests
```typescript
// __tests__/api/orders.test.ts
import { POST } from '@/app/api/orders/route';

describe('/api/orders', () => {
  test('should create new order', async () => {
    const response = await POST(new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify(mockOrderData)
    }));
    
    expect(response.status).toBe(200);
  });
});
```

---

## 🚀 نشر المشروع

### Vercel (المفضل)
```bash
# تثبيت Vercel CLI
npm i -g vercel

# نشر المشروع
vercel

# إعداد متغيرات البيئة
vercel env add STRIPE_SECRET_KEY
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🔧 استكشاف الأخطاء

### مشاكل شائعة وحلولها

#### 1. خطأ في تحميل القوالب
```bash
Error: Template not found
```
**الحل**: تأكد من وجود ملف `templates.json` في مجلد `data/`

#### 2. خطأ في الدفع
```bash
Stripe error: Invalid API key
```
**الحل**: تحقق من متغيرات البيئة `STRIPE_SECRET_KEY`

#### 3. خطأ في قاعدة البيانات
```bash
Error: Cannot read orders.json
```
**الحل**: إنشاء الملف وإعطاؤه الصلاحيات المناسبة

---

## 📞 الدعم والمساعدة

### الأدوات المساعدة
- **Next.js Docs**: https://nextjs.org/docs
- **Shadcn/ui**: https://ui.shadcn.com
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Stripe**: https://stripe.com/docs

### معلومات الاتصال
- **المطور**: [اسمك]
- **البريد الإلكتروني**: [بريدك]
- **GitHub**: [رابط المشروع]

---

**🎉 بالتوفيق في مشروعك! هذا التوثيق سيساعدك في كل مرحلة من مراحل التطوير.**