import Link from 'next/link'
import DramaCard from '@/components/DramaCard'

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

interface DramaCarouselProps {
  title: string
  dramas: Drama[]
  viewAllHref?: string
  accentColor?: string
}

export default function DramaCarousel({ title, dramas, viewAllHref }: DramaCarouselProps) {
  if (dramas.length === 0) return null

  return (
    <section className="content-section">
      <div className="section-header">
        <div className="section-header__left">
          <div className="section-accent-bar" aria-hidden="true" />
          <h2 className="section-title">{title}</h2>
        </div>
        {viewAllHref && (
          <Link href={viewAllHref} className="section-header__link" id={`view-all-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            Lihat Semua →
          </Link>
        )}
      </div>
      <div className="carousel-wrapper">
        <div className="carousel-track" role="list" aria-label={title}>
          {dramas.map((drama) => (
            <div key={drama.id} role="listitem">
              <DramaCard drama={drama} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
