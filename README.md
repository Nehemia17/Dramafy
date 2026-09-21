# 🎬 Dramafy — Platform Streaming Drama Asia

**Dramafy** adalah aplikasi web streaming modern dan berkinerja tinggi yang dirancang khusus untuk menikmati berbagai tayangan **K-Drama (Korea)**, **C-Drama (China)**, **J-Drama (Jepang)**, serta **Film Asia** terbaru dengan tampilan antarmuka yang elegan, cepat, dan responsif.

![Next.js 16](https://img.shields.io/badge/Next.js-16_App_Router-black?style=for-the-badge&logo=nextdotjs)
![React 19](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Prisma 7](https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma)
![SQLite / Postgres](https://img.shields.io/badge/Database-SQLite%20%2F%20Postgres-003B57?style=for-the-badge&logo=sqlite)

---

## ✨ Fitur Utama

### 📺 1. Player Video & Multi-Server
- **Video Player Integration**: Tampilan pemutar video tanpa kendala dengan dukungan iframe embed.
- **Multi-Server Switcher**: Pengguna dapat berpindah antar server streaming (Server VIP, Server 1, Server 2, StreamSB) jika salah satu server bermasalah.
- **Indikator Kualitas**: Penanda kualitas video (*FHD*, *HD*, *SD*).

### 🔍 2. Katalog & Multi-Filter Pintar
- **Pencarian Real-Time**: Cari drama atau film berdasarkan judul.
- **Filter Berkelanjutan**: Filter tayangan berdasarkan **Negara** (South Korea, China, Japan, Taiwan, Thailand), **Status** (*Sedang Tayang*, *Selesai*), **Tipe** (*Drama* / *Film*), dan **Genre**.
- **Responsive Layout**: Tampilan grid poster yang rapi di layar ponsel, tablet, maupun desktop.

### 🛡️ 3. Dashboard Admin Lengkap
- **Statistik Ringkas**: Monitor total drama, episode, genre, dan drama yang sedang tayang.
- **Manajemen Drama & Film (CRUD)**: Tambah, edit, dan hapus judul drama beserta poster, backdrop, deskripsi, tahun rilis, dan status.
- **Episode & Server Link Manager**: Tambah episode baru dan kelola daftar embed URL server streaming dengan fleksibel.
- **Kelola Genre**: Tambah dan hapus kategori genre drama secara dinamis.
- **Keamanan Tingkat Tinggi**: Proteksi route `/admin/*` menggunakan JWT Session cookie & middleware proxy.

---

## 🛠️ Teknologi yang Digunakan

- **Framework**: [Next.js 16 (Turbopack)](https://nextjs.org/) dengan App Router
- **Library UI**: [React 19](https://react.dev/)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **ORM**: [Prisma 7](https://www.prisma.io/) dengan `@prisma/adapter-better-sqlite3` (SQLite) & Supabase PG (Production)
- **Autentikasi**: [Jose](https://github.com/panva/jose) (JWT Session management via HTTP-Only Cookies)
- **Desain & Styling**: Vanilla CSS kustom dengan Design Tokens modern (Dark Theme & Glassmorphism)

---

## 📁 Struktur Project

```
Dramafy/
├── app/
│   ├── page.tsx                  # Homepage (Hero Banner + Content Carousels)
│   ├── browse/page.tsx           # Katalog & Multi-filter
│   ├── drama/[slug]/
│   │   ├── page.tsx              # Detail Drama & Daftar Episode
│   │   └── episode/[ep]/page.tsx # Watch Page / Streaming Player
│   ├── admin/
│   │   ├── login/page.tsx        # Halaman Login Admin
│   │   ├── dashboard/page.tsx    # Dashboard Analytics
│   │   ├── dramas/               # CRUD Drama & Episode Manager
│   │   └── genres/page.tsx       # Kelola Genre
│   ├── actions/                  # Server Actions (Drama, Episode, Genre)
│   └── api/admin/auth/           # API Route Login & Logout Admin
├── components/
│   ├── Navbar.tsx                # Navigation Bar Utama
│   ├── Footer.tsx                # Footer Website
│   ├── DramaCard.tsx             # Card Komponen Drama
│   ├── DramaCarousel.tsx         # Carousel Slider Drama
│   ├── HeroSection.tsx           # Hero Featured Banner
│   ├── ServerSwitcher.tsx        # Multi-server Video Switcher
│   └── admin/AdminSidebar.tsx    # Sidebar Navigation Admin Panel
├── lib/
│   ├── auth.ts                   # Logika Autentikasi JWT & Cookies
│   ├── prisma.ts                 # Inisialisasi Prisma Client & Adapter
│   └── validations.ts            # Schema Validasi Zod
├── prisma/
│   ├── schema.prisma             # Skema Database Prisma
│   └── seed.ts                   # Data Awal (8 Drama, 9 Genre, Admin User)
├── proxy.ts                      # Route Guard & Middleware Protection
└── .env                          # Variables Lingkungan
```

---

## 🚀 Panduan Instalasi Lokal

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Nehemia17/Dramafy.git
cd Dramafy
npm install
```

### 2. Konfigurasi Environment Variables
Buat file `.env` di direktori utama (atau salin dari `.env.example`):
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="dramafy-dev-secret-please-change-in-production-32chars"
NEXT_PUBLIC_APP_URL="http://localhost:3005"
NEXT_PUBLIC_APP_NAME="Dramafy"
```

### 3. Generate & Push Database Schema (SQLite)
```bash
# Push schema ke SQLite lokal (dev.db)
npx prisma db push

# Seed data awal (8 Drama, Genre, dan Akun Admin)
npm run db:seed
```

### 4. Jalankan Development Server
```bash
npm run dev
```

Buka browser kamu:
- **Website Utama**: [http://localhost:3005](http://localhost:3005)
- **Katalog**: [http://localhost:3005/browse](http://localhost:3005/browse)
- **Admin Panel**: [http://localhost:3005/admin/login](http://localhost:3005/admin/login)

---

## 🔑 Kredensial Admin Default

Setelah menjalankan `npm run db:seed`, kamu dapat login ke Admin Panel menggunakan kredensial berikut:

- **Email**: `admin@dramafy.id`
- **Password**: `admin123!`

---

## 🌐 Panduan Deployment (Vercel + Supabase)

1. Push repository ini ke **GitHub**.
2. Buat database PostgreSQL di **[Supabase](https://supabase.com)**.
3. Di `prisma/schema.prisma`, ubah `provider = "sqlite"` menjadi `provider = "postgresql"`.
4. Import project ke **[Vercel](https://vercel.com)** dan tambahkan Environment Variables:
   - `DATABASE_URL` (Connection string Supabase Transaction Pooler)
   - `DIRECT_URL` (Connection string Direct Supabase)
   - `JWT_SECRET`
   - `NEXT_PUBLIC_APP_URL` (`https://namadomainkamu.vercel.app`)

---

## 📄 Lisensi

Project ini dibuat untuk tujuan pengembangan dan portofolio.
