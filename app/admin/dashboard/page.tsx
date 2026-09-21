import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard Admin | Dramafy' }

export default async function AdminDashboardPage() {
  const [totalDramas, totalEpisodes, totalGenres, ongoingDramas] = await Promise.all([
    prisma.drama.count(),
    prisma.episode.count(),
    prisma.genre.count(),
    prisma.drama.count({ where: { status: 'ONGOING' } }),
  ])

  const recentDramas = await prisma.drama.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: { id: true, title: true, country: true, status: true, createdAt: true },
  })

  const statCards = [
    {
      label: 'Total Drama',
      value: totalDramas,
      color: 'rgba(229,23,63,0.15)',
      iconColor: '#e5173f',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e5173f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      ),
    },
    {
      label: 'Total Episode',
      value: totalEpisodes,
      color: 'rgba(124,58,237,0.15)',
      iconColor: '#7c3aed',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
          <polyline points="17 2 12 7 7 2" />
        </svg>
      ),
    },
    {
      label: 'Genre',
      value: totalGenres,
      color: 'rgba(16,185,129,0.15)',
      iconColor: '#10b981',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
      ),
    },
    {
      label: 'Sedang Tayang',
      value: ongoingDramas,
      color: 'rgba(245,158,11,0.15)',
      iconColor: '#f59e0b',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="10 8 16 12 10 16 10 8" />
        </svg>
      ),
    },
  ]

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Dashboard</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Selamat datang di Dramafy Admin Panel
        </p>
      </div>

      {/* Stat Cards */}
      <div className="stat-cards">
        {statCards.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="stat-card__icon" style={{ background: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {stat.icon}
            </div>
            <div className="stat-card__label">{stat.label}</div>
            <div className="stat-card__value" style={{ color: stat.iconColor }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Recent Dramas */}
      <div className="card">
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
          Drama Terbaru Ditambahkan
        </h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Judul</th>
              <th>Negara</th>
              <th>Status</th>
              <th>Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {recentDramas.map((drama) => (
              <tr key={drama.id}>
                <td>{drama.title}</td>
                <td>{drama.country}</td>
                <td>
                  <span className={`badge ${drama.status === 'ONGOING' ? 'badge--status-ongoing' : 'badge--status-completed'}`} style={{ fontSize: '0.7rem' }}>
                    {drama.status}
                  </span>
                </td>
                <td>
                  {new Date(drama.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
