import { NextRequest, NextResponse } from 'next/server';
import { getAIResponse, quickActionResponses, ChatState } from '@/lib/ai-responses';

export async function POST(request: NextRequest) {
  try {
    const { message, chatState } = await request.json();
    
    // Check if it's a quick action
    if (quickActionResponses[message]) {
      const response = quickActionResponses[message];
      return NextResponse.json({
        success: true,
        response: response
      });
    }
    
    // Get AI response based on current state
    const aiResponse = getAIResponse(message, chatState);
    
    // Simulate the AI "thinking" time
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return NextResponse.json({
      success: true,
      response: aiResponse
    });
    
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json({
      error: 'حدث خطأ في معالجة الرسالة',
      success: false
    }, { status: 500 });
  }
}