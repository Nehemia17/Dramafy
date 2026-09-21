import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ServerSwitcher from '@/components/ServerSwitcher'
import type { Metadata } from 'next'

interface WatchPageProps {
  params: Promise<{ slug: string; ep: string }>
}

export async function generateMetadata({ params }: WatchPageProps): Promise<Metadata> {
  const { slug, ep } = await params
  const drama = await prisma.drama.findUnique({ where: { slug }, select: { title: true } })
  if (!drama) return {}
  return {
    title: `${drama.title} Episode ${ep}`,
    description: `Tonton ${drama.title} Episode ${ep} di Dramafy dengan kualitas HD.`,
  }
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { slug, ep } = await params
  const epNumber = parseInt(ep, 10)

  if (isNaN(epNumber) || epNumber < 1) notFound()

  const drama = await prisma.drama.findUnique({
    where: { slug },
    include: {
      episodes: {
        orderBy: { episodeNumber: 'asc' },
        include: {
          servers: { orderBy: { orderPriority: 'asc' } },
        },
      },
    },
  })

  if (!drama) notFound()

  const currentEpisode = drama.episodes.find((e) => e.episodeNumber === epNumber)
  if (!currentEpisode) notFound()

  const prevEpisode = drama.episodes.find((e) => e.episodeNumber === epNumber - 1)
  const nextEpisode = drama.episodes.find((e) => e.episodeNumber === epNumber + 1)

  return (
    <div className="watch-page">
      <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '4rem' }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <Link href="/" style={{ color: 'var(--text-muted)' }}>Beranda</Link>
          <span style={{ margin: '0 0.4rem' }}>›</span>
          <Link href={`/drama/${drama.slug}`} style={{ color: 'var(--text-muted)' }}>{drama.title}</Link>
          <span style={{ margin: '0 0.4rem' }}>›</span>
          <span style={{ color: 'var(--text-primary)' }}>Episode {epNumber}</span>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem', alignItems: 'start' }}>
          {/* Left: Player + Controls */}
          <div>
            {/* Player */}
            <ServerSwitcher servers={currentEpisode.servers} />

            {/* Episode navigation */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem', gap: '0.75rem' }}>
              {prevEpisode ? (
                <Link
                  href={`/drama/${drama.slug}/episode/${prevEpisode.episodeNumber}`}
                  className="btn btn--secondary"
                  id="btn-prev-episode"
                >
                  ← Episode {prevEpisode.episodeNumber}
                </Link>
              ) : <div />}

              <Link
                href={`/drama/${drama.slug}`}
                className="btn btn--ghost btn--sm"
                id="btn-back-drama"
              >
                Info Drama
              </Link>

              {nextEpisode ? (
                <Link
                  href={`/drama/${drama.slug}/episode/${nextEpisode.episodeNumber}`}
                  className="btn btn--primary"
                  id="btn-next-episode"
                >
                  Episode {nextEpisode.episodeNumber} →
                </Link>
              ) : <div />}
            </div>

            {/* Drama Info Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginTop: '1.5rem',
                padding: '1rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--card-radius)',
              }}
            >
              <Image
                src={drama.posterUrl}
                alt={drama.title}
                width={48}
                height={72}
                style={{ borderRadius: '6px', objectFit: 'cover', flexShrink: 0 }}
                unoptimized
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {drama.title}
                </h1>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Episode {epNumber}
                  {currentEpisode.title ? ` — ${currentEpisode.title}` : ''}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Episode List */}
          <aside aria-label="Daftar Episode">
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--card-radius)',
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: '0.875rem 1rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div className="section-accent-bar" style={{ height: '1rem' }} aria-hidden="true" />
                <h2 style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                  Daftar Episode ({drama.episodes.length})
                </h2>
              </div>
              <div className="episode-list" style={{ padding: '0.5rem' }}>
                {drama.episodes.map((ep) => (
                  <Link
                    key={ep.id}
                    href={`/drama/${drama.slug}/episode/${ep.episodeNumber}`}
                    className={`episode-item ${ep.episodeNumber === epNumber ? 'active' : ''}`}
                    id={`sidebar-ep-${ep.episodeNumber}`}
                    aria-current={ep.episodeNumber === epNumber ? 'page' : undefined}
                  >
                    <div className="episode-item__number">{ep.episodeNumber}</div>
                    <div className="episode-item__info">
                      <div className="episode-item__title">
                        {ep.title || `Episode ${ep.episodeNumber}`}
                      </div>
                      {ep.releaseDate && (
                        <div className="episode-item__date">
                          {new Date(ep.releaseDate).toLocaleDateString('id-ID', {
                            day: 'numeric', month: 'short',
                          })}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
