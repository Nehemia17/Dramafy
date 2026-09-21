'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Login gagal')
      } else {
        router.push('/admin/dashboard')
      }
    } catch {
      setError('Terjadi kesalahan. Coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)',
        padding: '1.5rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '2rem',
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.75rem',
              fontWeight: 800,
              background: 'var(--gradient-accent)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Dramafy
          </span>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Admin Panel
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="admin-email" className="form-label">Email</label>
            <input
              id="admin-email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@dramafy.id"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="admin-password" className="form-label">Password</label>
            <input
              id="admin-password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div
              role="alert"
              style={{
                color: '#ff6b8a',
                fontSize: '0.85rem',
                padding: '0.6rem 0.875rem',
                background: 'rgba(229,23,63,0.1)',
                border: '1px solid rgba(229,23,63,0.2)',
                borderRadius: '8px',
                marginBottom: '1rem',
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn--primary"
            id="admin-login-submit"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Memproses...' : 'Masuk ke Admin'}
          </button>
        </form>
      </div>
    </div>
  )
}
