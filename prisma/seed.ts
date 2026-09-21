import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'
import 'dotenv/config'


const genres = [
  { name: 'Romance', slug: 'romance' },
  { name: 'Action', slug: 'action' },
  { name: 'Fantasy', slug: 'fantasy' },
  { name: 'Thriller', slug: 'thriller' },
  { name: 'Comedy', slug: 'comedy' },
  { name: 'Historical', slug: 'historical' },
  { name: 'Mystery', slug: 'mystery' },
  { name: 'Melodrama', slug: 'melodrama' },
  { name: 'Sci-Fi', slug: 'sci-fi' },
]

const dramas = [
  {
    title: 'Goblin',
    slug: 'goblin',
    alternativeTitle: 'Guardian: The Lonely and Great God',
    synopsis: 'A 939-year-old goblin seeks a human bride to end his immortal life. He meets a girl who claims to be his bride, and they fall into a love story that spans centuries. Featuring supernatural powers, reincarnation, and heart-wrenching moments.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/2yJzJiHcHRbz3mIRdmfJIeVPYjR.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/original/jPuPDFq3B49GJ3VcGcfEE3M3hkN.jpg',
    type: "DRAMA",
    status: "COMPLETED",
    country: 'South Korea',
    releaseYear: 2016,
    rating: 9.2,
    totalEpisodes: 16,
    views: 1250000,
    isFeatured: true,
    genres: ['romance', 'fantasy', 'melodrama'],
  },
  {
    title: 'Crash Landing on You',
    slug: 'crash-landing-on-you',
    alternativeTitle: '사랑의 불시착',
    synopsis: 'A South Korean heiress accidentally crash-lands in North Korea while paragliding during a storm. She falls in love with a North Korean army officer who decides to help her return home, risking everything for their forbidden romance.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/vbZCflAOcCqrO5AXUvnHPnpqJMx.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/original/8FqKMSXMGgVmMlFT0K36bQzKkgb.jpg',
    type: "DRAMA",
    status: "COMPLETED",
    country: 'South Korea',
    releaseYear: 2019,
    rating: 9.0,
    totalEpisodes: 16,
    views: 980000,
    isFeatured: true,
    genres: ['romance', 'comedy', 'melodrama'],
  },
  {
    title: 'Itaewon Class',
    slug: 'itaewon-class',
    alternativeTitle: '이태원 클라쓰',
    synopsis: 'An ex-convict and his diverse group of misfit employees start a small bar in Itaewon, working together to achieve their dreams and take revenge against the powerful food industry family that ruined their lives.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/kvCOFVXQ0r0xBVG8WF1a5Ln21jy.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/original/f6mkGBCVFQHbLGNMG3gWJdkTe0X.jpg',
    type: "DRAMA",
    status: "COMPLETED",
    country: 'South Korea',
    releaseYear: 2020,
    rating: 8.7,
    totalEpisodes: 16,
    views: 780000,
    isFeatured: false,
    genres: ['action', 'romance', 'thriller'],
  },
  {
    title: 'The Untamed',
    slug: 'the-untamed',
    alternativeTitle: '陈情令',
    synopsis: 'Two young men from rival clans become entangled in a mystery involving the dark cultivation world, forbidden love, and ancient secrets that threaten the entire realm. A classic tale of brotherhood, betrayal, and redemption.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/sJtWsMrHJRHYcNgKq5vHqH2yb5B.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/original/qr0ZRjLBHOobMH1DpzLm6OdcHmJ.jpg',
    type: "DRAMA",
    status: "COMPLETED",
    country: 'China',
    releaseYear: 2019,
    rating: 9.1,
    totalEpisodes: 50,
    views: 1100000,
    isFeatured: false,
    genres: ['action', 'fantasy', 'mystery'],
  },
  {
    title: 'Alchemy of Souls',
    slug: 'alchemy-of-souls',
    alternativeTitle: '환혼',
    synopsis: 'A powerful sorceress trapped in a weak body meets a noble young mage from a prestigious family. Their fates become intertwined as they unravel the forbidden secrets of alchemy of souls in the fictional kingdom of Daeho.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/5gNKFxjmUvJpFmGAzWBgEPbFTRE.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/original/wXsQvli6tWqja51pYxXNG1QLRMB.jpg',
    type: "DRAMA",
    status: "COMPLETED",
    country: 'South Korea',
    releaseYear: 2022,
    rating: 8.6,
    totalEpisodes: 30,
    views: 620000,
    isFeatured: true,
    genres: ['fantasy', 'romance', 'action'],
  },
  {
    title: 'Story of Yanxi Palace',
    slug: 'story-of-yanxi-palace',
    alternativeTitle: '延禧攻略',
    synopsis: 'An intelligent and determined young woman enters the Forbidden City as a palace maid seeking justice for her sister\'s death. She rises through the ranks of the imperial harem using wit and strategy to survive the dangerous court politics.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/lf7RbIXxw3Zf6Zy0Vz4Kt7f0K9.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/original/yXjYc0DFz37bEkRBJNUXCTl1Fnt.jpg',
    type: "DRAMA",
    status: "COMPLETED",
    country: 'China',
    releaseYear: 2018,
    rating: 8.9,
    totalEpisodes: 70,
    views: 750000,
    isFeatured: false,
    genres: ['historical', 'romance', 'thriller'],
  },
  {
    title: 'My Love from the Star',
    slug: 'my-love-from-the-star',
    alternativeTitle: '별에서 온 그대',
    synopsis: 'An alien who arrived on Earth 400 years ago falls in love with a top Hallyu star just three months before his scheduled return to his home planet. A timeless romance that blends supernatural elements with modern celebrity life.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/2rg0eHFwmIbIVEBDpgzJE6kXVqK.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/original/eqeyzVSgCUlFJi1LViOqEEVKY6S.jpg',
    type: "DRAMA",
    status: "COMPLETED",
    country: 'South Korea',
    releaseYear: 2013,
    rating: 8.8,
    totalEpisodes: 21,
    views: 890000,
    isFeatured: false,
    genres: ['romance', 'fantasy', 'comedy'],
  },
  {
    title: 'Moving',
    slug: 'moving',
    alternativeTitle: '무빙',
    synopsis: 'Children of superheroes try to hide their abilities as they navigate high school life, while their parents\' pasts catch up with them. A gripping action thriller that explores family secrets, government conspiracies, and extraordinary powers.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/jFJGnpzh5A2wj8vu1J1J4XJp1Bm.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/original/kXq9B4m4mWZmFjPzIJf2UKcKD1c.jpg',
    type: "DRAMA",
    status: "COMPLETED",
    country: 'South Korea',
    releaseYear: 2023,
    rating: 9.0,
    totalEpisodes: 20,
    views: 520000,
    isFeatured: false,
    genres: ['action', 'thriller', 'fantasy'],
  },
]

const serverTemplates = [
  { name: 'Server VIP', quality: 'FHD', priority: 1 },
  { name: 'Server 1', quality: 'HD', priority: 2 },
  { name: 'Server 2', quality: 'HD', priority: 3 },
]

// Placeholder embed URL (will be replaced with real URLs by admin)
const PLACEHOLDER_EMBED = 'https://www.youtube.com/embed/dQw4w9WgXcQ'

async function main() {
  console.log('🌱 Starting Dramafy seed...\n')

  // ─────────────────────────────────────────────────────────────────────────
  // 1. Seed Genres
  // ─────────────────────────────────────────────────────────────────────────
  console.log('📁 Seeding genres...')
  for (const genre of genres) {
    await prisma.genre.upsert({
      where: { slug: genre.slug },
      update: {},
      create: genre,
    })
  }
  console.log(`  ✅ ${genres.length} genres seeded\n`)

  // ─────────────────────────────────────────────────────────────────────────
  // 2. Seed Dramas + Episodes + Servers
  // ─────────────────────────────────────────────────────────────────────────
  console.log('🎬 Seeding dramas...')
  for (const drama of dramas) {
    const { genres: genreSlugs, ...dramaData } = drama

    const created = await prisma.drama.upsert({
      where: { slug: drama.slug },
      update: {
        isFeatured: dramaData.isFeatured,
        views: dramaData.views,
      },
      create: {
        ...dramaData,
        rating: dramaData.rating as any,
        genres: { connect: genreSlugs.map((slug) => ({ slug })) },
      },
    })

    // Seed 3 episodes per drama
    for (let i = 1; i <= 3; i++) {
      const episode = await prisma.episode.upsert({
        where: { dramaId_episodeNumber: { dramaId: created.id, episodeNumber: i } },
        update: {},
        create: {
          dramaId: created.id,
          episodeNumber: i,
          title: i === 1 ? 'Pilot' : `Episode ${i}`,
          releaseDate: new Date(dramaData.releaseYear, 0, i * 7),
        },
      })

      // Seed servers
      for (const srv of serverTemplates) {
        const exists = await prisma.episodeServer.findFirst({
          where: { episodeId: episode.id, serverName: srv.name },
        })
        if (!exists) {
          await prisma.episodeServer.create({
            data: {
              episodeId: episode.id,
              serverName: srv.name,
              embedUrl: PLACEHOLDER_EMBED,
              quality: srv.quality,
              orderPriority: srv.priority,
            },
          })
        }
      }
    }

    console.log(`  ✅ ${created.title}`)
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 3. Seed Admin User
  // ─────────────────────────────────────────────────────────────────────────
  console.log('\n👤 Seeding admin user...')
  const hashedPassword = await bcrypt.hash('admin123!', 12)
  await prisma.user.upsert({
    where: { email: 'admin@dramafy.id' },
    update: {},
    create: {
      email: 'admin@dramafy.id',
      password: hashedPassword,
      name: 'Admin Dramafy',
      role: 'ADMIN',
    },
  })

  console.log('\n════════════════════════════════════════')
  console.log('✅ Dramafy seed selesai!')
  console.log('════════════════════════════════════════')
  console.log('📧 Admin email   : admin@dramafy.id')
  console.log('🔑 Admin password: admin123!')
  console.log('🔗 Admin panel   : http://localhost:3000/admin/login')
  console.log('════════════════════════════════════════\n')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
