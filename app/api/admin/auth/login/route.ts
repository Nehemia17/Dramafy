import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSession, setSessionCookie } from '@/lib/auth'
import { AdminLoginSchema } from '@/lib/validations'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = AdminLoginSchema.parse(body)

    const user = await prisma.user.findUnique({ where: { email: data.email } })

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 })
    }

    const isValid = await bcrypt.compare(data.password, user.password)
    if (!isValid) {
      return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 })
    }

    const token = await createSession({ userId: user.id, email: user.email, role: user.role })
    await setSessionCookie(token)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}
