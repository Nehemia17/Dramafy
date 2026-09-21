import { prisma } from '@/lib/prisma'
import DramaCard from '@/components/DramaCard'
import Link from 'next/link'
import type { Metadata } from 'next'

interface BrowsePageProps {
  searchParams: Promise<{
    q?: string
    genre?: string
    status?: string
    country?: string
    type?: string
    year?: string
  }>
}

export async function generateMetadata({ searchParams }: BrowsePageProps): Promise<Metadata> {
  const params = await searchParams
  const title = params.q ? `Hasil pencarian "${params.q}"` : 'Jelajahi Drama & Film Asia'
  return {
    title,
    description: 'Jelajahi ribuan judul K-Drama, C-Drama, J-Drama, dan film Asia.',
  }
}

const GENRES_FILTER = [
  { name: 'Romance', slug: 'romance' },
  { name: 'Action', slug: 'action' },
  { name: 'Fantasy', slug: 'fantasy' },
  { name: 'Thriller', slug: 'thriller' },
  { name: 'Comedy', slug: 'comedy' },
  { name: 'Historical', slug: 'historical' },
  { name: 'Mystery', slug: 'mystery' },
]

export default async function BrowsePage({ searchParams }: BrowsePageProps) {
  const params = await searchParams
  const { q, genre, status, country, type } = params

  const dramas = await prisma.drama.findMany({
    where: {
      ...(q ? { title: { contains: q } } : {}),
      ...(status ? { status: status as any } : {}),
      ...(country ? { country } : {}),
      ...(type ? { type: type as any } : {}),
      ...(genre ? { genres: { some: { slug: genre } } } : {}),
    },
    include: { genres: true },
    orderBy: { views: 'desc' },
    take: 60,
  })

  const filterPills = [
    { label: 'Semua', href: '/browse', active: !status && !country && !type && !genre },
    { label: 'K-Drama', href: '/browse?country=South+Korea', active: country === 'South Korea' },
    { label: 'C-Drama', href: '/browse?country=China', active: country === 'China' },
    { label: 'J-Drama', href: '/browse?country=Japan', active: country === 'Japan' },
    { label: 'Sedang Tayang', href: '/browse?status=ONGOING', active: status === 'ONGOING' },
    { label: 'Selesai', href: '/browse?status=COMPLETED', active: status === 'COMPLETED' },
    { label: 'Film', href: '/browse?type=MOVIE', active: type === 'MOVIE' },
  ]

  return (
    <div className="page-wrapper">
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Page Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 className="font-heading" style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem' }}>
            {q ? `Hasil pencarian: "${q}"` : 'Jelajahi Semua Drama'}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {dramas.length} judul ditemukan
          </p>
        </div>

        {/* Filter Pills */}
        <div className="filter-pills" style={{ padding: '0 0 1.25rem' }} role="navigation" aria-label="Filter">
          {filterPills.map((pill) => (
            <Link
              key={pill.href}
              href={pill.href}
              className={`filter-pill ${pill.active ? 'active' : ''}`}
              id={`browse-filter-${pill.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            >
              {pill.label}
            </Link>
          ))}
        </div>

        {/* Genre filter row */}
        <div className="filter-pills" style={{ padding: '0 0 1.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginRight: '0.25rem', fontWeight: 500 }}>Genre:</span>
          {GENRES_FILTER.map((g) => (
            <Link
              key={g.slug}
              href={`/browse?genre=${g.slug}`}
              className={`filter-pill ${genre === g.slug ? 'active' : ''}`}
              id={`genre-filter-${g.slug}`}
            >
              {g.name}
            </Link>
          ))}
        </div>

        {/* Drama Grid */}
        {dramas.length > 0 ? (
          <div className="browse-grid">
            {dramas.map((drama) => (
              <DramaCard key={drama.id} drama={drama as any} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state__icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <h2 className="empty-state__title">Tidak Ada Hasil</h2>
            <p>Coba ubah filter atau kata kunci pencarian kamu.</p>
            <Link href="/browse" className="btn btn--secondary" style={{ marginTop: '1rem', display: 'inline-flex' }}>
              Reset Filter
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
