import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import type { Metadata } from 'next'
import { deleteDramaAction } from '@/app/actions/drama'

export const metadata: Metadata = { title: 'Kelola Drama | Admin Dramafy' }

export default async function AdminDramasPage() {
  const dramas = await prisma.drama.findMany({
    orderBy: { createdAt: 'desc' },
    include: { genres: true, _count: { select: { episodes: true } } },
  })

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Drama & Film</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            {dramas.length} judul terdaftar
          </p>
        </div>
        <Link href="/admin/dramas/new" className="btn btn--primary" id="btn-add-drama">
          + Tambah Drama
        </Link>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Judul</th>
                <th>Negara</th>
                <th>Status</th>
                <th>Episode</th>
                <th>Rating</th>
                <th>Featured</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dramas.map((drama) => (
                <tr key={drama.id}>
                  <td>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{drama.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/{drama.slug}</div>
                    </div>
                  </td>
                  <td>{drama.country}</td>
                  <td>
                    <span className={`badge ${drama.status === 'ONGOING' ? 'badge--status-ongoing' : drama.status === 'COMPLETED' ? 'badge--status-completed' : 'badge--age'}`} style={{ fontSize: '0.7rem' }}>
                      {drama.status}
                    </span>
                  </td>
                  <td>{drama._count.episodes} ep</td>
                  <td>{drama.rating ? `${Number(drama.rating).toFixed(1)}` : '-'}</td>
                  <td>
                    {drama.isFeatured ? (
                      <span style={{ color: '#fbbf24', fontSize: '0.875rem' }}>⭐</span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)' }}>—</span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <Link
                        href={`/admin/dramas/${drama.id}/edit`}
                        className="btn btn--ghost btn--sm"
                        id={`btn-edit-drama-${drama.id}`}
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/admin/dramas/${drama.id}/episodes`}
                        className="btn btn--secondary btn--sm"
                        id={`btn-episodes-drama-${drama.id}`}
                      >
                        Episode
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
