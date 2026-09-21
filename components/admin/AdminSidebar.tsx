'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const navItems = [
    {
      href: '/admin/dashboard',
      label: 'Dashboard',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="9" rx="1" />
          <rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="12" width="7" height="9" rx="1" />
          <rect x="3" y="16" width="7" height="5" rx="1" />
        </svg>
      ),
    },
    {
      href: '/admin/dramas',
      label: 'Drama & Film',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
          <line x1="7" y1="2" x2="7" y2="22" />
          <line x1="17" y1="2" x2="17" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <line x1="2" y1="7" x2="7" y2="7" />
          <line x1="2" y1="17" x2="7" y2="17" />
          <line x1="17" y1="17" x2="22" y2="17" />
          <line x1="17" y1="7" x2="22" y2="7" />
        </svg>
      ),
    },
    {
      href: '/admin/genres',
      label: 'Genre',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
      ),
    },
  ]

  return (
    <aside className="admin-sidebar">
      <Link href="/admin/dashboard" className="admin-sidebar__logo">
        Dramafy
      </Link>
      <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', padding: '0 1.25rem', marginBottom: '1rem', letterSpacing: '0.05em' }}>
        ADMIN PANEL
      </p>

      <nav>
        <ul className="admin-nav">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={pathname.startsWith(item.href) ? 'active' : ''}
                id={`admin-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center' }}>{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div style={{ position: 'absolute', bottom: '1.5rem', left: 0, right: 0, padding: '0 0.75rem' }}>
        <div className="divider" />
        <Link
          href="/"
          style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.5rem 0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)', borderRadius: '8px' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          Lihat Website
        </Link>
        <button
          onClick={handleLogout}
          id="admin-logout-btn"
          style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.5rem 0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)', borderRadius: '8px', width: '100%', textAlign: 'left', cursor: 'pointer', transition: 'color 0.15s', background: 'none', border: 'none' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Keluar
        </button>
      </div>
    </aside>
  )
}
