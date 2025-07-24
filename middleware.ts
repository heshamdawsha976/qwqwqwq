import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  // For now, allow all requests to pass through
  // TODO: Implement proper authentication system
  
  // Security headers
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set("x-pathname", req.nextUrl.pathname)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
    headers: {
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "origin-when-cross-origin",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    },
  })
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
