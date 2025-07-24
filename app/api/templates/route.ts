import { NextRequest, NextResponse } from 'next/server';
import { websiteTemplates, getTemplateByCategory, getTemplateById } from '@/lib/templates';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const id = searchParams.get('id');
    
    if (id) {
      // Get specific template by ID
      const template = getTemplateById(id);
      if (!template) {
        return NextResponse.json(
          { error: 'Template not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ template });
    }
    
    if (category && category !== 'all') {
      // Get templates by category
      const templates = getTemplateByCategory(category);
      return NextResponse.json({ templates });
    }
    
    // Get all templates
    return NextResponse.json({ templates: websiteTemplates });
    
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}
