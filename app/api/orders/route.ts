import { NextRequest, NextResponse } from 'next/server';
import { createOrder, getOrders } from '@/lib/database';
import { z } from 'zod';

// Validation schema for orders
const orderSchema = z.object({
  customerName: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  websiteType: z.enum(['restaurant', 'shop', 'clinic', 'portfolio', 'business']),
  plan: z.enum(['basic', 'advanced', 'pro']),
  amount: z.number().positive(),
  currency: z.enum(['USD', 'SAR']).default('USD'),
  websiteData: z.object({
    title: z.string().min(1).max(200),
    description: z.string().min(10).max(1000),
    sections: z.array(z.string()),
    colors: z.array(z.string()),
    customizations: z.record(z.any()).default({}),
  })
});

export async function GET(request: NextRequest) {
  try {
    const orders = await getOrders();
    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request data
    const validatedData = orderSchema.parse(body);
    
    // Create the order
    const order = await createOrder({
      ...validatedData,
      status: 'pending'
    });
    
    return NextResponse.json({ 
      success: true, 
      order,
      message: 'تم إنشاء الطلب بنجاح'
    });
    
  } catch (error) {
    console.error('Error creating order:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        error: 'بيانات غير صحيحة',
        details: error.errors
      }, { status: 400 });
    }
    
    return NextResponse.json({
      error: 'حدث خطأ في إنشاء الطلب'
    }, { status: 500 });
  }
}