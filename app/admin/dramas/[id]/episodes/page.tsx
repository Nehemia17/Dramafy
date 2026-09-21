import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { addEpisodeAction, deleteEpisodeAction, addServerAction, deleteServerAction } from '@/app/actions/episode'
import type { Metadata } from 'next'

interface EpisodesPageProps {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = { title: 'Kelola Episode | Admin Dramafy' }

export default async function AdminEpisodesPage({ params }: EpisodesPageProps) {
  const { id } = await params
  const drama = await prisma.drama.findUnique({
    where: { id },
    include: {
      episodes: {
        orderBy: { episodeNumber: 'asc' },
        include: { servers: { orderBy: { orderPriority: 'asc' } } },
      },
    },
  })

  if (!drama) notFound()

  const addEpisode = addEpisodeAction.bind(null, id)

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Episode Manager</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{drama.title} — {drama.episodes.length} episode</p>
        </div>
        <Link href="/admin/dramas" className="btn btn--ghost btn--sm">← Kembali</Link>
      </div>

      {/* Add Episode Form */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
          Tambah Episode
        </h2>
        <form action={addEpisode} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="ep-number" className="form-label">No. Episode *</label>
            <input id="ep-number" name="episodeNumber" type="number" className="form-input" required min="1" style={{ width: '120px' }} />
          </div>
          <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
            <label htmlFor="ep-title" className="form-label">Judul Episode</label>
            <input id="ep-title" name="title" className="form-input" placeholder="Judul opsional" />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="ep-date" className="form-label">Tanggal Rilis</label>
            <input id="ep-date" name="releaseDate" type="date" className="form-input" />
          </div>
          <button type="submit" className="btn btn--primary" id="btn-add-episode">+ Tambah</button>
        </form>
      </div>

      {/* Episodes List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {drama.episodes.map((episode) => {
          const addServer = addServerAction.bind(null, episode.id)
          return (
            <div key={episode.id} className="card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 600 }}>
                  Episode {episode.episodeNumber}
                  {episode.title && <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}> — {episode.title}</span>}
                </h3>
                <form action={deleteEpisodeAction}>
                  <input type="hidden" name="episodeId" value={episode.id} />
                  <button type="submit" className="btn btn--ghost btn--sm" style={{ color: '#ff6b8a' }} id={`btn-del-ep-${episode.id}`}>
                    Hapus
                  </button>
                </form>
              </div>

              {/* Servers */}
              <div style={{ marginBottom: '0.75rem' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Server Link</p>
                {episode.servers.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    {episode.servers.map((server) => (
                      <div key={server.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0.75rem', background: 'var(--bg-secondary)', borderRadius: '8px', fontSize: '0.85rem' }}>
                        <span className="badge badge--status-ongoing" style={{ fontSize: '0.7rem', flexShrink: 0 }}>{server.quality}</span>
                        <span style={{ fontWeight: 500, flexShrink: 0, color: 'var(--text-primary)' }}>{server.serverName}</span>
                        <span style={{ color: 'var(--text-muted)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{server.embedUrl}</span>
                        <form action={deleteServerAction}>
                          <input type="hidden" name="serverId" value={server.id} />
                          <button type="submit" style={{ color: '#ff6b8a', fontSize: '0.75rem', cursor: 'pointer', background: 'none', border: 'none' }}>✕</button>
                        </form>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Belum ada server</p>
                )}
              </div>

              {/* Add Server Form */}
              <form action={addServer} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <select name="serverName" className="form-select" style={{ width: 'auto', fontSize: '0.8rem', padding: '0.4rem 0.6rem' }} required>
                  <option value="Server VIP">Server VIP</option>
                  <option value="Server 1">Server 1</option>
                  <option value="Server 2">Server 2</option>
                  <option value="StreamSB">StreamSB</option>
                </select>
                <select name="quality" className="form-select" style={{ width: 'auto', fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}>
                  <option value="FHD">FHD</option>
                  <option value="HD">HD</option>
                  <option value="SD">SD</option>
                </select>
                <input name="embedUrl" className="form-input" required placeholder="https://..." style={{ flex: 1, fontSize: '0.8rem', padding: '0.4rem 0.6rem', minWidth: '200px' }} />
                <input name="orderPriority" type="number" className="form-input" defaultValue={episode.servers.length + 1} style={{ width: '60px', fontSize: '0.8rem', padding: '0.4rem 0.6rem' }} />
                <button type="submit" className="btn btn--secondary btn--sm" id={`btn-add-server-${episode.id}`}>+ Server</button>
              </form>
            </div>
          )
        })}

        {drama.episodes.length === 0 && (
          <div className="empty-state">
            <div className="empty-state__icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
                <polyline points="17 2 12 7 7 2" />
              </svg>
            </div>
            <h2 className="empty-state__title">Belum Ada Episode</h2>
            <p>Tambahkan episode di atas.</p>
          </div>
        )}
      </div>
    </div>
  )
}
