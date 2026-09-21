import { prisma } from '@/lib/prisma'
import HeroSection from '@/components/HeroSection'
import DramaCarousel from '@/components/DramaCarousel'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dramafy — Nonton Drama Asia Online',
  description:
    'Platform streaming drama Asia terbaik. Nonton K-Drama, C-Drama, J-Drama terbaru dengan kualitas HD secara gratis.',
}

export const revalidate = 300 // revalidate every 5 mins

async function getFeaturedDrama() {
  return prisma.drama.findFirst({
    where: { isFeatured: true },
    include: { genres: true },
    orderBy: { views: 'desc' },
  })
}

async function getOngoingDramas() {
  return prisma.drama.findMany({
    where: { status: 'ONGOING' },
    orderBy: { updatedAt: 'desc' },
    take: 12,
  })
}

async function getPopularDramas() {
  return prisma.drama.findMany({
    orderBy: { views: 'desc' },
    take: 12,
  })
}

async function getRecentDramas() {
  return prisma.drama.findMany({
    orderBy: { createdAt: 'desc' },
    take: 12,
  })
}

async function getKDramas() {
  return prisma.drama.findMany({
    where: { country: 'South Korea' },
    orderBy: { rating: 'desc' },
    take: 12,
  })
}

async function getCDramas() {
  return prisma.drama.findMany({
    where: { country: 'China' },
    orderBy: { rating: 'desc' },
    take: 12,
  })
}

export default async function HomePage() {
  const [featured, ongoing, popular, recent, kdramas, cdramas] = await Promise.all([
    getFeaturedDrama(),
    getOngoingDramas(),
    getPopularDramas(),
    getRecentDramas(),
    getKDramas(),
    getCDramas(),
  ])

  const filterPills = [
    { label: 'Semua', href: '/browse' },
    { label: 'K-Drama', href: '/browse?country=South+Korea' },
    { label: 'C-Drama', href: '/browse?country=China' },
    { label: 'J-Drama', href: '/browse?country=Japan' },
    { label: 'Sedang Tayang', href: '/browse?status=ONGOING' },
    { label: 'Selesai', href: '/browse?status=COMPLETED' },
    { label: 'Film', href: '/browse?type=MOVIE' },
  ]

  return (
    <div className="page-wrapper" style={{ paddingTop: 0 }}>
      {/* Hero Section */}
      {featured && (
        <HeroSection drama={featured as any} />
      )}

      {/* Quick Filter Pills */}
      <div style={{ background: 'var(--bg-primary)', position: 'relative', zIndex: 1 }}>
        <div className="filter-pills" role="navigation" aria-label="Filter kategori">
          {filterPills.map((pill) => (
            <Link
              key={pill.href}
              href={pill.href}
              className="filter-pill"
              id={`filter-pill-${pill.label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
            >
              {pill.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Content Carousels */}
      <div style={{ background: 'var(--bg-primary)' }}>
        <DramaCarousel
          title="Sedang Tayang"
          dramas={ongoing as any}
          viewAllHref="/browse?status=ONGOING"
        />
        <DramaCarousel
          title="Populer Minggu Ini"
          dramas={popular as any}
          viewAllHref="/browse"
        />
        <DramaCarousel
          title="Baru Diupdate"
          dramas={recent as any}
          viewAllHref="/browse"
        />
        {kdramas.length > 0 && (
          <DramaCarousel
            title="K-Drama Terpopuler"
            dramas={kdramas as any}
            viewAllHref="/browse?country=South+Korea"
          />
        )}
        {cdramas.length > 0 && (
          <DramaCarousel
            title="C-Drama Pilihan"
            dramas={cdramas as any}
            viewAllHref="/browse?country=China"
          />
        )}
      </div>
    </div>
  )
}
