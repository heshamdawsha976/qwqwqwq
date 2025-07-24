// Website templates data and management
export interface Template {
  id: string;
  name: string;
  category: 'restaurant' | 'shop' | 'clinic' | 'portfolio' | 'business';
  description: string;
  preview: string;
  thumbnail: string;
  sections: string[];
  features: string[];
  price: {
    basic: number;
    advanced: number;
    pro: number;
  };
  colors: string[];
  html: string;
  css: string;
  isActive: boolean;
}

export const websiteTemplates: Template[] = [
  {
    id: 'restaurant-001',
    name: 'مطعم العائلة',
    category: 'restaurant',
    description: 'قالب مطعم احترافي مع قائمة طعام تفاعلية ونظام حجز طاولات',
    preview: '/templates/restaurant-preview.jpg',
    thumbnail: '/templates/restaurant-thumb.jpg',
    sections: ['الرئيسية', 'قائمة الطعام', 'من نحن', 'المعرض', 'اتصل بنا', 'حجز طاولة'],
    features: ['قائمة طعام تفاعلية', 'نظام حجز طاولات', 'معرض الصور', 'معلومات الطاهي', 'تقييمات العملاء'],
    price: { basic: 50, advanced: 100, pro: 200 },
    colors: ['#D97706', '#FCD34D', '#F59E0B', '#FBBF24'],
    html: `
      <div class="restaurant-website">
        <header class="hero-section">
          <h1>{{businessName}}</h1>
          <p>{{businessDescription}}</p>
          <button class="cta-button">احجز طاولة الآن</button>
        </header>
        <section class="menu-section">
          <h2>قائمة الطعام</h2>
          <div class="menu-grid">
            <div class="menu-item">
              <img src="/placeholder-food.jpg" alt="طبق">
              <h3>الطبق الخاص</h3>
              <p>وصف الطبق اللذيذ</p>
              <span class="price">25 ريال</span>
            </div>
          </div>
        </section>
        <section class="about-section">
          <h2>من نحن</h2>
          <p>نحن مطعم عائلي نقدم أجود الأطباق...</p>
        </section>
        <footer class="contact-section">
          <h2>اتصل بنا</h2>
          <p>الهاتف: 0501234567</p>
          <p>العنوان: الرياض، المملكة العربية السعودية</p>
        </footer>
      </div>
    `,
    css: `
      .restaurant-website { font-family: 'Cairo', sans-serif; }
      .hero-section { background: linear-gradient(135deg, #D97706, #F59E0B); color: white; padding: 80px 20px; text-align: center; }
      .hero-section h1 { font-size: 3rem; margin-bottom: 20px; }
      .cta-button { background: #FCD34D; color: #92400E; padding: 15px 30px; border: none; border-radius: 25px; font-weight: bold; cursor: pointer; }
      .menu-section, .about-section { padding: 60px 20px; max-width: 1200px; margin: 0 auto; }
      .menu-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-top: 40px; }
      .menu-item { background: white; border-radius: 15px; padding: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
      .menu-item img { width: 100%; height: 200px; object-fit: cover; border-radius: 10px; }
      .contact-section { background: #FEF3C7; padding: 40px 20px; text-align: center; }
    `,
    isActive: true
  },
  {
    id: 'shop-001',
    name: 'متجر الأناقة',
    category: 'shop',
    description: 'متجر إلكتروني عصري لعرض وبيع المنتجات مع سلة تسوق',
    preview: '/templates/shop-preview.jpg',
    thumbnail: '/templates/shop-thumb.jpg',
    sections: ['الرئيسية', 'المنتجات', 'العروض', 'من نحن', 'اتصل بنا', 'سلة التسوق'],
    features: ['عرض المنتجات', 'سلة التسوق', 'نظام البحث', 'تصنيف المنتجات', 'صفحة الدفع'],
    price: { basic: 75, advanced: 150, pro: 300 },
    colors: ['#7C3AED', '#A78BFA', '#8B5CF6', '#DDD6FE'],
    html: `
      <div class="shop-website">
        <header class="shop-header">
          <nav class="navbar">
            <h1>{{businessName}}</h1>
            <div class="nav-links">
              <a href="#products">المنتجات</a>
              <a href="#about">من نحن</a>
              <a href="#contact">اتصل بنا</a>
              <button class="cart-btn">🛒 السلة (0)</button>
            </div>
          </nav>
          <div class="hero-banner">
            <h2>{{businessDescription}}</h2>
            <button class="shop-now-btn">تسوق الآن</button>
          </div>
        </header>
        <section class="products-section" id="products">
          <h2>منتجاتنا المميزة</h2>
          <div class="products-grid">
            <div class="product-card">
              <img src="/placeholder-product.jpg" alt="منتج">
              <h3>اسم المنتج</h3>
              <p class="price">99 ريال</p>
              <button class="add-to-cart">أضف للسلة</button>
            </div>
          </div>
        </section>
      </div>
    `,
    css: `
      .shop-website { font-family: 'Cairo', sans-serif; }
      .navbar { display: flex; justify-content: space-between; align-items: center; padding: 20px; background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
      .nav-links { display: flex; gap: 30px; align-items: center; }
      .nav-links a { text-decoration: none; color: #374151; font-weight: 500; }
      .cart-btn { background: #7C3AED; color: white; border: none; padding: 10px 20px; border-radius: 20px; cursor: pointer; }
      .hero-banner { background: linear-gradient(135deg, #7C3AED, #A78BFA); color: white; padding: 100px 20px; text-align: center; }
      .products-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; padding: 60px 20px; max-width: 1200px; margin: 0 auto; }
      .product-card { background: white; border-radius: 15px; padding: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center; }
      .product-card img { width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 15px; }
      .add-to-cart { background: #7C3AED; color: white; border: none; padding: 10px 20px; border-radius: 20px; cursor: pointer; margin-top: 10px; }
    `,
    isActive: true
  },
  {
    id: 'clinic-001',
    name: 'عيادة الصحة',
    category: 'clinic',
    description: 'موقع عيادة طبية احترافي مع نظام حجز المواعيد',
    preview: '/templates/clinic-preview.jpg',
    thumbnail: '/templates/clinic-thumb.jpg',
    sections: ['الرئيسية', 'الخدمات', 'الأطباء', 'حجز موعد', 'من نحن', 'اتصل بنا'],
    features: ['نظام حجز المواعيد', 'معلومات الأطباء', 'الخدمات الطبية', 'معلومات التأمين', 'نصائح صحية'],
    price: { basic: 100, advanced: 200, pro: 400 },
    colors: ['#059669', '#10B981', '#34D399', '#A7F3D0'],
    html: `
      <div class="clinic-website">
        <header class="clinic-header">
          <h1>{{businessName}}</h1>
          <p>{{businessDescription}}</p>
          <button class="appointment-btn">احجز موعد</button>
        </header>
        <section class="services-section">
          <h2>خدماتنا الطبية</h2>
          <div class="services-grid">
            <div class="service-card">
              <div class="service-icon">🩺</div>
              <h3>الفحص العام</h3>
              <p>فحص طبي شامل للجسم</p>
            </div>
            <div class="service-card">
              <div class="service-icon">💊</div>
              <h3>العلاج الطبيعي</h3>
              <p>علاج طبيعي متخصص</p>
            </div>
          </div>
        </section>
        <section class="doctors-section">
          <h2>أطباؤنا المتميزون</h2>
          <div class="doctors-grid">
            <div class="doctor-card">
              <img src="/placeholder-doctor.jpg" alt="دكتور">
              <h3>د. محمد أحمد</h3>
              <p>طبيب عام - 15 سنة خبرة</p>
            </div>
          </div>
        </section>
      </div>
    `,
    css: `
      .clinic-website { font-family: 'Cairo', sans-serif; }
      .clinic-header { background: linear-gradient(135deg, #059669, #10B981); color: white; padding: 100px 20px; text-align: center; }
      .clinic-header h1 { font-size: 3rem; margin-bottom: 20px; }
      .appointment-btn { background: #34D399; color: #065F46; padding: 15px 30px; border: none; border-radius: 25px; font-weight: bold; cursor: pointer; font-size: 1.1rem; }
      .services-section, .doctors-section { padding: 60px 20px; max-width: 1200px; margin: 0 auto; }
      .services-grid, .doctors-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-top: 40px; }
      .service-card, .doctor-card { background: white; border-radius: 15px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center; }
      .service-icon { font-size: 3rem; margin-bottom: 20px; }
      .doctor-card img { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin-bottom: 20px; }
    `,
    isActive: true
  },
  {
    id: 'portfolio-001',
    name: 'معرض الأعمال',
    category: 'portfolio',
    description: 'موقع شخصي لعرض الأعمال والمهارات بتصميم عصري',
    preview: '/templates/portfolio-preview.jpg',
    thumbnail: '/templates/portfolio-thumb.jpg',
    sections: ['الرئيسية', 'من أنا', 'أعمالي', 'مهاراتي', 'تواصل معي'],
    features: ['معرض الأعمال', 'السيرة الذاتية', 'المهارات', 'شهادات العملاء', 'نموذج التواصل'],
    price: { basic: 40, advanced: 80, pro: 160 },
    colors: ['#EF4444', '#F87171', '#FCA5A5', '#FEE2E2'],
    html: `
      <div class="portfolio-website">
        <header class="portfolio-header">
          <div class="profile-section">
            <img src="/placeholder-avatar.jpg" alt="{{businessName}}" class="profile-img">
            <h1>{{businessName}}</h1>
            <p class="profession">{{businessDescription}}</p>
            <button class="contact-btn">تواصل معي</button>
          </div>
        </header>
        <section class="about-section">
          <h2>من أنا</h2>
          <p>أنا مصمم ومطور متخصص في إنشاء تجارب رقمية مميزة...</p>
        </section>
        <section class="portfolio-section">
          <h2>أعمالي المميزة</h2>
          <div class="portfolio-grid">
            <div class="portfolio-item">
              <img src="/placeholder-work.jpg" alt="عمل">
              <div class="portfolio-overlay">
                <h3>اسم المشروع</h3>
                <p>وصف مختصر للمشروع</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    `,
    css: `
      .portfolio-website { font-family: 'Cairo', sans-serif; }
      .portfolio-header { background: linear-gradient(135deg, #EF4444, #F87171); color: white; padding: 100px 20px; text-align: center; }
      .profile-img { width: 150px; height: 150px; border-radius: 50%; object-fit: cover; margin-bottom: 30px; border: 5px solid white; }
      .profile-section h1 { font-size: 2.5rem; margin-bottom: 10px; }
      .profession { font-size: 1.2rem; margin-bottom: 30px; opacity: 0.9; }
      .contact-btn { background: white; color: #EF4444; padding: 15px 30px; border: none; border-radius: 25px; font-weight: bold; cursor: pointer; }
      .about-section, .portfolio-section { padding: 60px 20px; max-width: 1200px; margin: 0 auto; }
      .portfolio-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-top: 40px; }
      .portfolio-item { position: relative; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
      .portfolio-item img { width: 100%; height: 250px; object-fit: cover; }
      .portfolio-overlay { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.8)); color: white; padding: 30px 20px 20px; }
    `,
    isActive: true
  }
];

export function getTemplateByCategory(category: string): Template[] {
  return websiteTemplates.filter(template => 
    template.category === category && template.isActive
  );
}

export function getTemplateById(id: string): Template | undefined {
  return websiteTemplates.find(template => template.id === id);
}

export function getAllActiveTemplates(): Template[] {
  return websiteTemplates.filter(template => template.isActive);
}