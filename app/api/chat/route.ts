import { NextRequest, NextResponse } from 'next/server';
import { getAIResponse, ChatState } from '@/lib/ai-responses';

export async function POST(request: NextRequest) {
  try {
    const { message, chatState } = await request.json();

    if (!message || !chatState) {
      return NextResponse.json(
        { success: false, error: 'البيانات المطلوبة مفقودة' },
        { status: 400 }
      );
    }

    // Simulate AI processing delay
    const aiResponse = getAIResponse(message, chatState as ChatState);

    return NextResponse.json({
      success: true,
      response: aiResponse
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ في معالجة الطلب' },
      { status: 500 }
    );
  }
}