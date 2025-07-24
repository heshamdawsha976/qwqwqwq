// AI Response simulation system
export interface AIResponse {
  message: string;
  action?: 'show_template' | 'request_info' | 'finalize' | 'customize';
  templateType?: string;
  delay: number; // milliseconds
}

export interface ChatState {
  step: 'welcome' | 'business_type' | 'business_name' | 'description' | 'customization' | 'finalize';
  businessType: string;
  businessName: string;
  description: string;
  selectedTemplate?: string;
}

// AI responses for different business types
const businessTypeResponses: Record<string, string[]> = {
  'مطعم': [
    'ممتاز! سأبني لك موقع مطعم احترافي مع قائمة طعام تفاعلية ونظام حجز الطاولات.',
    'رائع! المطاعم تحتاج تصميم جذاب لعرض الأطباق اللذيذة.',
    'سأضيف قسم خاص لقائمة الطعام ومعلومات المطعم ونظام الحجز.',
  ],
  'متجر': [
    'عظيم! سأنشئ لك متجر إلكتروني مميز لعرض منتجاتك بشكل احترافي.',
    'ممتاز! المتاجر الإلكترونية تحتاج تصميم جذاب لزيادة المبيعات.',
    'سأضيف سلة تسوق ونظام عرض المنتجات وصفحات الدفع.',
  ],
  'عيادة': [
    'رائع! سأبني لك موقع عيادة طبية احترافي مع نظام حجز المواعيد.',
    'ممتاز! العيادات تحتاج موقع يبعث الثقة والمهنية للمرضى.',
    'سأضيف معلومات الأطباء والخدمات الطبية ونظام حجز المواعيد.',
  ],
  'معرض أعمال': [
    'عظيم! سأنشئ لك موقع شخصي مميز لعرض أعمالك ومهاراتك.',
    'رائع! معارض الأعمال تحتاج تصميم إبداعي يعكس شخصيتك المهنية.',
    'سأضيف معرض للأعمال وسيرة ذاتية ونموذج للتواصل.',
  ],
  'شركة': [
    'ممتاز! سأبني لك موقع شركة احترافي يعكس قوة علامتك التجارية.',
    'رائع! مواقع الشركات تحتاج تصميم مهني يبني الثقة مع العملاء.',
    'سأضيف معلومات الشركة والخدمات وفريق العمل ونموذج التواصل.',
  ]
};

const stepResponses = {
  business_name: [
    'اسم رائع! الآن أخبرني وصف مختصر عن {businessType} أو الخدمات التي تقدمها؟',
    'اسم مميز! ما هو وصف مختصر لـ {businessType} الخاص بك؟',
    'اسم جميل! أريد أن أعرف المزيد عن {businessType} - ما الخدمات التي تقدمها؟',
  ],
  description: [
    'ممتاز! الآن سأبدأ في إنشاء موقعك. ستظهر المعاينة على اليمين.',
    'رائع! دعني أبني لك موقع احترافي. شاهد النتيجة على اليمين.',
    'عظيم! سأنشئ موقعك الآن. يمكنك مشاهدة التقدم في المعاينة.',
  ],
  customization: [
    'يمكنني تخصيص موقعك أكثر. ما رأيك في تغيير الألوان أو إضافة أقسام جديدة؟',
    'هل تريد تعديل شيء في التصميم؟ يمكنني تغيير الألوان أو ترتيب الأقسام.',
    'موقعك جاهز! هل تحتاج أي تعديلات على الألوان أو المحتوى؟',
  ],
  finalize: [
    'موقعك جاهز بنسبة 100%! يمكنك الآن المتابعة للدفع والحصول على الموقع كاملاً.',
    'تم الانتهاء من إنشاء موقعك الاحترافي! المرحلة التالية هي اختيار الخطة المناسبة.',
    'موقعك الرائع جاهز للنشر! اختر خطة الاشتراك للحصول على موقعك.',
  ]
};

export function getAIResponse(userMessage: string, currentState: ChatState): AIResponse {
  const message = userMessage.toLowerCase().trim();
  
  // Step 1: Business Type Detection
  if (currentState.step === 'welcome' || currentState.step === 'business_type') {
    let detectedType = '';
    let templateType = '';
    
    if (message.includes('مطعم') || message.includes('restaurant') || message.includes('طعام')) {
      detectedType = 'مطعم';
      templateType = 'restaurant';
    } else if (message.includes('متجر') || message.includes('shop') || message.includes('تسوق') || message.includes('بيع')) {
      detectedType = 'متجر';
      templateType = 'shop';
    } else if (message.includes('عيادة') || message.includes('طبي') || message.includes('دكتور') || message.includes('clinic')) {
      detectedType = 'عيادة';
      templateType = 'clinic';
    } else if (message.includes('معرض') || message.includes('أعمال') || message.includes('portfolio') || message.includes('تصميم')) {
      detectedType = 'معرض أعمال';
      templateType = 'portfolio';
    } else if (message.includes('شركة') || message.includes('أعمال') || message.includes('company') || message.includes('مؤسسة')) {
      detectedType = 'شركة';
      templateType = 'business';
    }
    
    if (detectedType && businessTypeResponses[detectedType]) {
      const responses = businessTypeResponses[detectedType];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      return {
        message: randomResponse + '\n\nالآن، ما اسم ' + detectedType.toLowerCase() + ' الخاص بك؟',
        action: 'request_info',
        templateType,
        delay: Math.floor(Math.random() * 2000) + 1500 // 1.5-3.5 seconds
      };
    }
    
    // If no business type detected
    return {
      message: 'أهلاً وسهلاً! أنا مساعدك الذكي لإنشاء المواقع. أخبرني، ما نوع الموقع الذي تريد إنشاءه؟ (مطعم، متجر، عيادة، معرض أعمال، شركة)',
      delay: 1000
    };
  }
  
  // Step 2: Business Name
  if (currentState.step === 'business_name') {
    const responses = stepResponses.business_name;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      .replace('{businessType}', currentState.businessType);
    
    return {
      message: randomResponse,
      action: 'request_info',
      delay: Math.floor(Math.random() * 1500) + 1000 // 1-2.5 seconds
    };
  }
  
  // Step 3: Description
  if (currentState.step === 'description') {
    const responses = stepResponses.description;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    return {
      message: randomResponse,
      action: 'show_template',
      delay: Math.floor(Math.random() * 2000) + 2000 // 2-4 seconds
    };
  }
  
  // Step 4: Customization
  if (currentState.step === 'customization') {
    const responses = stepResponses.customization;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    return {
      message: randomResponse,
      action: 'customize',
      delay: Math.floor(Math.random() * 1500) + 1000
    };
  }
  
  // Step 5: Finalize
  if (currentState.step === 'finalize') {
    const responses = stepResponses.finalize;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    return {
      message: randomResponse,
      action: 'finalize',
      delay: Math.floor(Math.random() * 1500) + 1000
    };
  }
  
  // Default response
  return {
    message: 'شكراً لك! دعني أساعدك في إنشاء موقع رائع. ما نوع الموقع الذي تحتاجه؟',
    delay: 1000
  };
}

// Quick action responses for common business types
export const quickActionResponses: Record<string, AIResponse> = {
  'موقع شركة': {
    message: 'ممتاز! سأبني لك موقع شركة احترافي. ما اسم شركتك؟',
    action: 'request_info',
    templateType: 'business',
    delay: 1500
  },
  'متجر إلكتروني': {
    message: 'رائع! سأنشئ لك متجر إلكتروني مميز. ما اسم متجرك؟',
    action: 'request_info',
    templateType: 'shop',
    delay: 1500
  },
  'مدونة شخصية': {
    message: 'عظيم! سأبني لك موقع شخصي لعرض أعمالك. ما اسمك أو اسم مدونتك؟',
    action: 'request_info',
    templateType: 'portfolio',
    delay: 1500
  },
  'موقع مطعم': {
    message: 'ممتاز! سأنشئ لك موقع مطعم احترافي. ما اسم مطعمك؟',
    action: 'request_info',
    templateType: 'restaurant',
    delay: 1500
  },
  'معرض أعمال': {
    message: 'رائع! سأبني لك معرض أعمال يعكس إبداعك. ما اسمك أو اسم معرضك؟',
    action: 'request_info',
    templateType: 'portfolio',
    delay: 1500
  },
  'موقع خدمات': {
    message: 'عظيم! سأنشئ لك موقع خدمات مهني. ما اسم شركتك أو مؤسستك؟',
    action: 'request_info',
    templateType: 'business',
    delay: 1500
  }
};

// Helper function to simulate typing delay
export function simulateTyping(text: string): number {
  const wordsCount = text.split(' ').length;
  const baseDelay = 1000;
  const perWordDelay = 50;
  return baseDelay + (wordsCount * perWordDelay);
}