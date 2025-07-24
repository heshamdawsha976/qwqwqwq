import { NextRequest, NextResponse } from 'next/server';
import { getAllActiveTemplates, getTemplateById, getTemplateByCategory } from '@/lib/templates';
import { templateCache } from '@/lib/cache-manager';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const id = searchParams.get('id');

    // Get specific template by ID
    if (id) {
      const cacheKey = `template_${id}`;
      let template = templateCache.get(cacheKey);
      
      if (!template) {
        template = getTemplateById(id);
        if (template) {
          templateCache.set(cacheKey, template);
        }
      }

      if (!template) {
        return NextResponse.json(
          { success: false, error: 'القالب غير موجود' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        template
      });
    }

    // Get templates by category
    if (category && category !== 'all') {
      const cacheKey = `templates_category_${category}`;
      let templates = templateCache.get(cacheKey);
      
      if (!templates) {
        templates = getTemplateByCategory(category as any);
        templateCache.set(cacheKey, templates);
      }

      return NextResponse.json({
        success: true,
        templates
      });
    }

    // Get all templates
    const cacheKey = 'templates_all';
    let templates = templateCache.get(cacheKey);
    
    if (!templates) {
      templates = getAllActiveTemplates();
      templateCache.set(cacheKey, templates);
    }

    return NextResponse.json({
      success: true,
      templates
    });
  } catch (error) {
    console.error('Templates API Error:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ في معالجة الطلب' },
      { status: 500 }
    );
  }
}