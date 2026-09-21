import Image from 'next/image'
import Link from 'next/link'

interface FeaturedDrama {
  id: string
  title: string
  slug: string
  alternativeTitle: string | null
  synopsis: string
  backdropUrl: string | null
  posterUrl: string
  rating: number | null
  status: string
  country: string
  releaseYear: number
  totalEpisodes: number | null
  genres: { name: string; slug: string }[]
}

interface HeroSectionProps {
  drama: FeaturedDrama
}

const countryMap: Record<string, string> = {
  'South Korea': 'K-Drama',
  China: 'C-Drama',
  Japan: 'J-Drama',
  Taiwan: 'T-Drama',
  Thailand: 'T-Drama',
}

export default function HeroSection({ drama }: HeroSectionProps) {
  const countryLabel = countryMap[drama.country] ?? drama.country
  const statusLabel = drama.status === 'ONGOING' ? 'Tayang' : 'Selesai'
  const statusClass = drama.status === 'ONGOING' ? 'badge--status-ongoing' : 'badge--status-completed'

  return (
    <section className="hero" aria-label={`Featured: ${drama.title}`}>
      {/* Backdrop image */}
      {drama.backdropUrl ? (
        <Image
          src={drama.backdropUrl}
          alt={drama.title}
          fill
          priority
          sizes="100vw"
          className="hero__backdrop"
          unoptimized
        />
      ) : (
        <Image
          src={drama.posterUrl}
          alt={drama.title}
          fill
          priority
          sizes="100vw"
          className="hero__backdrop"
          style={{ objectPosition: 'top center' }}
          unoptimized
        />
      )}

      {/* Gradients */}
      <div className="hero__gradient-right" aria-hidden="true" />
      <div className="hero__gradient-bottom" aria-hidden="true" />

      {/* Content */}
      <div className="hero__content animate-fade-in-up">
        {/* Meta badges */}
        <div className="hero__meta">
          {drama.rating && (
            <span className="badge badge--rating" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              {Number(drama.rating).toFixed(1)}
            </span>
          )}
          <span className="badge badge--country">{countryLabel}</span>
          <span className={`badge ${statusClass}`}>{statusLabel}</span>
          <span className="badge badge--age">13+</span>
          {drama.genres.slice(0, 2).map((g) => (
            <span key={g.slug} className="badge badge--genre">
              {g.name}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="hero__title">{drama.title}</h1>
        {drama.alternativeTitle && (
          <p className="hero__alt-title">{drama.alternativeTitle}</p>
        )}

        {/* Synopsis */}
        <p className="hero__synopsis">{drama.synopsis}</p>

        {/* Actions */}
        <div className="hero__actions">
          <Link
            href={`/drama/${drama.slug}/episode/1`}
            className="btn btn--primary"
            id="hero-watch-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
            Tonton Sekarang
          </Link>
          <Link
            href={`/drama/${drama.slug}`}
            className="btn btn--secondary"
            id="hero-detail-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            Detail
          </Link>
        </div>
      </div>
    </section>
  )
}
