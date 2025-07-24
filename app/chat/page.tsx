"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, Bot, User, Eye, Code, Palette, Globe, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { getTemplateById } from "@/lib/templates"
import { ChatState } from "@/lib/ai-responses"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  websitePreview?: {
    title: string
    description: string
    template: string
    colors: string[]
  }
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "مرحباً! أنا مساعدك الذكي لإنشاء المواقع. دعني أساعدك في بناء موقع رائع. ما نوع الموقع الذي تريد إنشاءه؟",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [chatState, setChatState] = useState<ChatState>({
    step: 'welcome',
    businessType: '',
    businessName: '',
    description: '',
  })
  const [websitePreview, setWebsitePreview] = useState<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue("")
    setIsTyping(true)

    try {
      // Call our AI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          chatState: chatState
        })
      })

      const data = await response.json()
      
      if (data.success) {
        const aiResponse = data.response
        
        // Update chat state based on current step
        let newChatState = { ...chatState }
        let preview = null
        
        if (chatState.step === 'welcome' || chatState.step === 'business_type') {
          if (aiResponse.action === 'request_info' && aiResponse.templateType) {
            newChatState = {
              ...chatState,
              step: 'business_name',
              businessType: currentInput
            }
          }
        } else if (chatState.step === 'business_name') {
          newChatState = {
            ...chatState,
            step: 'description',
            businessName: currentInput
          }
        } else if (chatState.step === 'description') {
          newChatState = {
            ...chatState,
            step: 'customization',
            description: currentInput
          }
          
          // Show website preview
          if (aiResponse.action === 'show_template') {
            const templateId = getTemplateIdFromBusinessType(chatState.businessType)
            const template = getTemplateById(templateId)
            if (template) {
              preview = {
                title: chatState.businessName,
                description: currentInput,
                template: template.name,
                colors: template.colors,
                html: template.html,
                css: template.css
              }
              setWebsitePreview(preview)
            }
          }
        } else if (chatState.step === 'customization') {
          newChatState = {
            ...chatState,
            step: 'finalize'
          }
        }
        
        setChatState(newChatState)
        
        // Add AI response after delay
        setTimeout(() => {
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            content: aiResponse.message,
            timestamp: new Date(),
            websitePreview: preview,
          }

          setMessages((prev) => [...prev, botMessage])
          setIsTyping(false)
        }, aiResponse.delay)
        
      } else {
        throw new Error(data.error)
      }

    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: "عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
      setIsTyping(false)
    }
  }

  const handleQuickAction = async (action: string) => {
    setInputValue(action)
    await handleSendMessage()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getTemplateIdFromBusinessType = (businessType: string): string => {
    const typeMap: Record<string, string> = {
      'مطعم': 'restaurant-001',
      'متجر': 'shop-001',
      'عيادة': 'clinic-001',
      'معرض أعمال': 'portfolio-001',
      'شركة': 'business-001'
    }
    return typeMap[businessType] || 'restaurant-001'
  }

  const getCurrentStep = () => {
    const stepMap: Record<string, number> = {
      'welcome': 1,
      'business_type': 1,
      'business_name': 2,
      'description': 3,
      'customization': 4,
      'finalize': 4
    }
    return stepMap[chatState.step] || 1
  }

  const quickActions = ["موقع شركة", "متجر إلكتروني", "مدونة شخصية", "موقع مطعم", "معرض أعمال", "موقع خدمات"]

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold">Chat2Site</h1>
            </Link>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                متصل
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-120px)]">
          {/* Chat Section */}
          <Card className="flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-600" />
                مساعد إنشاء المواقع
              </CardTitle>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(getCurrentStep() / 4) * 100}%` }}
                ></div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  الخطوة {getCurrentStep()} من 4
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex gap-3 max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.type === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                          }`}
                        >
                          {message.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        </div>
                        <div
                          className={`rounded-2xl px-4 py-3 ${
                            message.type === "user" ? "bg-blue-600 text-white" : "bg-white border shadow-sm"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          {message.websitePreview && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg border">
                              <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="h-4 w-4 text-purple-600" />
                                <span className="text-sm font-medium">معاينة الموقع</span>
                              </div>
                              <div className="text-xs text-gray-600">
                                تم إنشاء معاينة أولية لموقعك - يمكنك مشاهدتها في القسم المجاور
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-white border rounded-2xl px-4 py-3 shadow-sm">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>

              {/* Quick Actions */}
              {(chatState.step === 'welcome' || chatState.step === 'business_type') && (
                <div className="p-4 border-t bg-gray-50">
                  <p className="text-sm text-gray-600 mb-3">أو اختر من الخيارات السريعة:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickAction(action)}
                        className="text-xs justify-start"
                      >
                        {action}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {chatState.step === 'finalize' && (
                <div className="p-4 border-t bg-blue-50">
                  <p className="text-sm text-blue-600 mb-3">موقعك جاهز! اختر الخطة المناسبة:</p>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/pricing">
                      <Button size="sm" className="text-xs bg-green-600 hover:bg-green-700">
                        اختر الخطة ودفع
                      </Button>
                    </Link>
                    <Button size="sm" variant="outline" className="text-xs bg-transparent">
                      تعديل التصميم
                    </Button>
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="اكتب رسالتك هنا..."
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card className="flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-green-600" />
                معاينة الموقع المباشرة
              </CardTitle>
              <div className="flex items-center gap-2 text-sm">
                <Button variant="outline" size="sm" className="flex items-center gap-1 bg-transparent">
                  <Code className="h-4 w-4" />
                  HTML/CSS
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1 bg-transparent">
                  <Palette className="h-4 w-4" />
                  تخصيص
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1 bg-transparent">
                  <Globe className="h-4 w-4" />
                  نشر
                </Button>
                <div className="mr-auto flex items-center gap-2">
                  <div className="flex border rounded-md">
                    <Button variant="ghost" size="sm" className="px-2">
                      📱
                    </Button>
                    <Button variant="ghost" size="sm" className="px-2 bg-blue-100">
                      💻
                    </Button>
                    <Button variant="ghost" size="sm" className="px-2">
                      🖥️
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 p-0">
              {websitePreview ? (
                <div className="h-full bg-white">
                  {/* Website Preview */}
                  <div className="h-full overflow-auto">
                    <div 
                      className="min-h-full"
                      dangerouslySetInnerHTML={{
                        __html: `
                          <style>${websitePreview.css}</style>
                          ${websitePreview.html
                            .replace(/\{\{businessName\}\}/g, chatState.businessName || 'موقعي')
                            .replace(/\{\{businessDescription\}\}/g, chatState.description || 'وصف الموقع')}
                        `
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Eye className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">معاينة الموقع</h3>
                    <p className="text-gray-500 max-w-sm">أكمل المحادثة مع المساعد الذكي لرؤية معاينة موقعك هنا</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
