import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface DramaDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: DramaDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const drama = await prisma.drama.findUnique({ where: { slug } })
  if (!drama) return {}
  return {
    title: drama.title,
    description: drama.synopsis.slice(0, 160),
    openGraph: {
      title: `${drama.title} | Dramafy`,
      description: drama.synopsis.slice(0, 160),
      images: [drama.posterUrl],
    },
  }
}

export default async function DramaDetailPage({ params }: DramaDetailPageProps) {
  const { slug } = await params

  const drama = await prisma.drama.findUnique({
    where: { slug },
    include: {
      genres: true,
      episodes: {
        orderBy: { episodeNumber: 'asc' },
        include: { servers: { orderBy: { orderPriority: 'asc' }, take: 1 } },
      },
    },
  })

  if (!drama) notFound()

  const statusLabel = drama.status === 'ONGOING' ? 'Tayang' : drama.status === 'COMPLETED' ? 'Selesai' : 'Segera'
  const statusClass = drama.status === 'ONGOING' ? 'badge--status-ongoing' : drama.status === 'COMPLETED' ? 'badge--status-completed' : 'badge--age'

  return (
    <div className="page-wrapper">
      {/* Backdrop Hero */}
      <div className="detail-hero">
        <Image
          src={drama.backdropUrl || drama.posterUrl}
          alt={drama.title}
          fill
          priority
          sizes="100vw"
          className="detail-hero__backdrop"
          style={{ objectFit: 'cover' }}
          unoptimized
        />
        <div className="detail-hero__gradient" aria-hidden="true" />
      </div>

      <div className="detail-content">
        <div className="detail-layout">
          {/* Poster */}
          <div className="detail-poster">
            <Image
              src={drama.posterUrl}
              alt={drama.title}
              width={200}
              height={300}
              unoptimized
            />
          </div>

          {/* Info */}
          <div className="detail-info" style={{ paddingTop: '1rem' }}>
            <h1 className="detail-info__title">{drama.title}</h1>
            {drama.alternativeTitle && (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                {drama.alternativeTitle}
              </p>
            )}

            <div className="detail-info__meta">
              {drama.rating && (
                <span className="badge badge--rating" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  {Number(drama.rating).toFixed(1)}
                </span>
              )}
              <span className={`badge ${statusClass}`}>{statusLabel}</span>
              <span className="badge badge--country">{drama.country}</span>
              <span className="badge badge--age">13+</span>
              {drama.genres.map((g) => (
                <Link key={g.id} href={`/browse?genre=${g.slug}`} className="badge badge--genre">
                  {g.name}
                </Link>
              ))}
            </div>

            <p className="detail-info__synopsis">{drama.synopsis}</p>

            {/* Stats */}
            <div className="detail-stats">
              <div className="detail-stat">
                <div className="detail-stat__label">Tahun</div>
                <div className="detail-stat__value">{drama.releaseYear}</div>
              </div>
              {drama.totalEpisodes && (
                <div className="detail-stat">
                  <div className="detail-stat__label">Episode</div>
                  <div className="detail-stat__value">{drama.totalEpisodes}</div>
                </div>
              )}
              <div className="detail-stat">
                <div className="detail-stat__label">Rating</div>
                <div className="detail-stat__value" style={{ color: '#fbbf24' }}>
                  {drama.rating ? `${Number(drama.rating).toFixed(1)}/10` : 'N/A'}
                </div>
              </div>
              <div className="detail-stat">
                <div className="detail-stat__label">Ditonton</div>
                <div className="detail-stat__value">{(drama.views / 1000).toFixed(0)}K</div>
              </div>
            </div>

            {/* Watch Button */}
            {drama.episodes.length > 0 && (
              <Link
                href={`/drama/${drama.slug}/episode/1`}
                className="btn btn--primary"
                id="detail-watch-btn"
                style={{ display: 'inline-flex' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Tonton Episode 1
              </Link>
            )}
          </div>
        </div>

        {/* Episode List */}
        {drama.episodes.length > 0 && (
          <section style={{ marginTop: '3rem', paddingBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div className="section-accent-bar" aria-hidden="true" />
              <h2 className="section-title">Daftar Episode</h2>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: '0.5rem',
              }}
            >
              {drama.episodes.map((ep) => (
                <Link
                  key={ep.id}
                  href={`/drama/${drama.slug}/episode/${ep.episodeNumber}`}
                  className="episode-item"
                  id={`ep-link-${ep.episodeNumber}`}
                >
                  <div className="episode-item__number">{ep.episodeNumber}</div>
                  <div className="episode-item__info">
                    <div className="episode-item__title">
                      {ep.title || `Episode ${ep.episodeNumber}`}
                    </div>
                    {ep.releaseDate && (
                      <div className="episode-item__date">
                        {new Date(ep.releaseDate).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
