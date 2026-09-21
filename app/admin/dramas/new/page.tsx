import { prisma } from '@/lib/prisma'
import { createDramaAction } from '@/app/actions/drama'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Tambah Drama | Admin Dramafy' }

const COUNTRIES = ['South Korea', 'China', 'Japan', 'Taiwan', 'Thailand', 'Indonesia', 'USA']

export default async function NewDramaPage() {
  const genres = await prisma.genre.findMany({ orderBy: { name: 'asc' } })

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Tambah Drama Baru</h1>
      </div>

      <div className="card" style={{ maxWidth: '800px' }}>
        <form action={createDramaAction}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1.5rem' }}>
            {/* Title */}
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="title" className="form-label">Judul *</label>
              <input id="title" name="title" className="form-input" required placeholder="Goblin" />
            </div>

            {/* Slug */}
            <div className="form-group">
              <label htmlFor="slug" className="form-label">Slug *</label>
              <input id="slug" name="slug" className="form-input" required placeholder="goblin" />
            </div>

            {/* Alternative Title */}
            <div className="form-group">
              <label htmlFor="alternativeTitle" className="form-label">Judul Alternatif</label>
              <input id="alternativeTitle" name="alternativeTitle" className="form-input" placeholder="Guardian: The Lonely and Great God" />
            </div>

            {/* Synopsis */}
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="synopsis" className="form-label">Sinopsis *</label>
              <textarea id="synopsis" name="synopsis" className="form-textarea" required rows={4} placeholder="Ceritakan sinopsis drama..." />
            </div>

            {/* Poster URL */}
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="posterUrl" className="form-label">URL Poster *</label>
              <input id="posterUrl" name="posterUrl" type="url" className="form-input" required placeholder="https://image.tmdb.org/t/p/w500/..." />
            </div>

            {/* Backdrop URL */}
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="backdropUrl" className="form-label">URL Backdrop</label>
              <input id="backdropUrl" name="backdropUrl" type="url" className="form-input" placeholder="https://image.tmdb.org/t/p/original/..." />
            </div>

            {/* Type */}
            <div className="form-group">
              <label htmlFor="type" className="form-label">Tipe *</label>
              <select id="type" name="type" className="form-select" required>
                <option value="DRAMA">Drama</option>
                <option value="MOVIE">Film</option>
              </select>
            </div>

            {/* Status */}
            <div className="form-group">
              <label htmlFor="status" className="form-label">Status *</label>
              <select id="status" name="status" className="form-select" required>
                <option value="ONGOING">Sedang Tayang</option>
                <option value="COMPLETED">Selesai</option>
                <option value="UPCOMING">Segera Hadir</option>
              </select>
            </div>

            {/* Country */}
            <div className="form-group">
              <label htmlFor="country" className="form-label">Negara *</label>
              <select id="country" name="country" className="form-select" required>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Release Year */}
            <div className="form-group">
              <label htmlFor="releaseYear" className="form-label">Tahun Rilis *</label>
              <input id="releaseYear" name="releaseYear" type="number" className="form-input" required defaultValue={new Date().getFullYear()} min={1990} max={new Date().getFullYear() + 2} />
            </div>

            {/* Rating */}
            <div className="form-group">
              <label htmlFor="rating" className="form-label">Rating (0-10)</label>
              <input id="rating" name="rating" type="number" className="form-input" step="0.1" min="0" max="10" placeholder="8.5" />
            </div>

            {/* Total Episodes */}
            <div className="form-group">
              <label htmlFor="totalEpisodes" className="form-label">Total Episode</label>
              <input id="totalEpisodes" name="totalEpisodes" type="number" className="form-input" min="1" placeholder="16" />
            </div>

            {/* Is Featured */}
            <div className="form-group" style={{ gridColumn: '1 / -1', flexDirection: 'row', alignItems: 'center', gap: '0.75rem' }}>
              <input id="isFeatured" name="isFeatured" type="checkbox" value="true" style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
              <label htmlFor="isFeatured" className="form-label" style={{ marginBottom: 0 }}>
                Tampilkan di Hero Banner (Featured)
              </label>
            </div>

            {/* Genres */}
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Genre</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {genres.map((genre) => (
                  <label key={genre.id} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <input type="checkbox" name="genreIds" value={genre.id} />
                    {genre.name}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="divider" />

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="submit" className="btn btn--primary" id="btn-submit-drama">
              💾 Simpan Drama
            </button>
            <a href="/admin/dramas" className="btn btn--ghost">Batal</a>
          </div>
        </form>
      </div>
    </div>
  )
}
