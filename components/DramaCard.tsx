import Link from 'next/link'
import Image from 'next/image'

interface Drama {
  id: string
  title: string
  slug: string
  posterUrl: string
  rating: number | null
  status: string
  country: string
  releaseYear: number
  totalEpisodes: number | null
}

interface DramaCardProps {
  drama: Drama
}

const countryCode: Record<string, string> = {
  'South Korea': 'KR',
  China: 'CN',
  Japan: 'JP',
  Taiwan: 'TW',
  Thailand: 'TH',
}

export default function DramaCard({ drama }: DramaCardProps) {
  const statusLabel = drama.status === 'ONGOING' ? 'Tayang' : drama.status === 'COMPLETED' ? 'Selesai' : 'Segera'
  const statusClass = drama.status === 'ONGOING' ? 'badge--status-ongoing' : drama.status === 'COMPLETED' ? 'badge--status-completed' : 'badge--age'
  const code = countryCode[drama.country] ?? drama.country.substring(0, 2).toUpperCase()

  return (
    <Link href={`/drama/${drama.slug}`} className="drama-card" id={`drama-card-${drama.slug}`}>
      <div className="drama-card__poster-wrap">
        <Image
          src={drama.posterUrl}
          alt={drama.title}
          fill
          sizes="(max-width: 640px) 160px, 185px"
          className="drama-card__poster"
          unoptimized
        />
        {drama.rating && (
          <div className="drama-card__rating">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="#fbbf24" style={{ display: 'inline-block', marginRight: '3px', verticalAlign: 'middle' }}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span>{Number(drama.rating).toFixed(1)}</span>
          </div>
        )}
        <div className="drama-card__status">
          <span className={`badge ${statusClass}`} style={{ fontSize: '0.65rem', padding: '0.2rem 0.45rem' }}>
            {statusLabel}
          </span>
        </div>
        <div className="drama-card__overlay">
          <div className="drama-card__play-btn" aria-label={`Tonton ${drama.title}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="drama-card__info">
        <h3 className="drama-card__title">{drama.title}</h3>
        <div className="drama-card__meta">
          <span style={{ fontSize: '0.65rem', padding: '0.1rem 0.35rem', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', fontWeight: 600, color: 'var(--text-secondary)' }}>
            {code}
          </span>
          <span>{drama.releaseYear}</span>
          {drama.totalEpisodes && (
            <>
              <span>·</span>
              <span>{drama.totalEpisodes} Eps</span>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}
