import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Získajte aktuálnu cestu
  const path = request.nextUrl.pathname

  // Kontrola či ide o admin cestu
  if (path.startsWith("/admin")) {
    // Tu pridajte vašu vlastnú logiku autentifikácie
    // Napríklad kontrola session tokenu
    const isAuthenticated = false // Nahraďte vlastnou logikou

    if (!isAuthenticated) {
      // Presmerovanie na login stránku
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/admin/:path*",
}

