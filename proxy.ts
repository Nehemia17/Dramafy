import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySession } from '@/lib/auth'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect /admin routes except /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('dramafy-admin-session')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    const session = await verifySession(token)
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
