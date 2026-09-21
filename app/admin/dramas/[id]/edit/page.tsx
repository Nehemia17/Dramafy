import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { updateDramaAction } from '@/app/actions/drama'
import type { Metadata } from 'next'

interface EditPageProps {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = { title: 'Edit Drama | Admin Dramafy' }

const COUNTRIES = ['South Korea', 'China', 'Japan', 'Taiwan', 'Thailand', 'Indonesia', 'USA']

export default async function EditDramaPage({ params }: EditPageProps) {
  const { id } = await params
  const [drama, genres] = await Promise.all([
    prisma.drama.findUnique({ where: { id }, include: { genres: true } }),
    prisma.genre.findMany({ orderBy: { name: 'asc' } }),
  ])

  if (!drama) notFound()

  const updateAction = updateDramaAction.bind(null, id)
  const selectedGenreIds = drama.genres.map((g) => g.id)

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Edit Drama</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{drama.title}</p>
      </div>

      <div className="card" style={{ maxWidth: '800px' }}>
        <form action={updateAction}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1.5rem' }}>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="title" className="form-label">Judul *</label>
              <input id="title" name="title" className="form-input" required defaultValue={drama.title} />
            </div>
            <div className="form-group">
              <label htmlFor="slug" className="form-label">Slug *</label>
              <input id="slug" name="slug" className="form-input" required defaultValue={drama.slug} />
            </div>
            <div className="form-group">
              <label htmlFor="alternativeTitle" className="form-label">Judul Alternatif</label>
              <input id="alternativeTitle" name="alternativeTitle" className="form-input" defaultValue={drama.alternativeTitle ?? ''} />
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="synopsis" className="form-label">Sinopsis *</label>
              <textarea id="synopsis" name="synopsis" className="form-textarea" required rows={4} defaultValue={drama.synopsis} />
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="posterUrl" className="form-label">URL Poster *</label>
              <input id="posterUrl" name="posterUrl" type="url" className="form-input" required defaultValue={drama.posterUrl} />
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="backdropUrl" className="form-label">URL Backdrop</label>
              <input id="backdropUrl" name="backdropUrl" type="url" className="form-input" defaultValue={drama.backdropUrl ?? ''} />
            </div>
            <div className="form-group">
              <label htmlFor="type" className="form-label">Tipe *</label>
              <select id="type" name="type" className="form-select" required defaultValue={drama.type}>
                <option value="DRAMA">Drama</option>
                <option value="MOVIE">Film</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="status" className="form-label">Status *</label>
              <select id="status" name="status" className="form-select" required defaultValue={drama.status}>
                <option value="ONGOING">Sedang Tayang</option>
                <option value="COMPLETED">Selesai</option>
                <option value="UPCOMING">Segera Hadir</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="country" className="form-label">Negara *</label>
              <select id="country" name="country" className="form-select" required defaultValue={drama.country}>
                {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="releaseYear" className="form-label">Tahun Rilis *</label>
              <input id="releaseYear" name="releaseYear" type="number" className="form-input" required defaultValue={drama.releaseYear} />
            </div>
            <div className="form-group">
              <label htmlFor="rating" className="form-label">Rating (0-10)</label>
              <input id="rating" name="rating" type="number" className="form-input" step="0.1" min="0" max="10" defaultValue={drama.rating ? Number(drama.rating) : ''} />
            </div>
            <div className="form-group">
              <label htmlFor="totalEpisodes" className="form-label">Total Episode</label>
              <input id="totalEpisodes" name="totalEpisodes" type="number" className="form-input" defaultValue={drama.totalEpisodes ?? ''} />
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1', flexDirection: 'row', alignItems: 'center', gap: '0.75rem' }}>
              <input id="isFeatured" name="isFeatured" type="checkbox" value="true" defaultChecked={drama.isFeatured} style={{ width: '16px', height: '16px' }} />
              <label htmlFor="isFeatured" className="form-label" style={{ marginBottom: 0 }}>Tampilkan di Hero Banner</label>
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Genre</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {genres.map((genre) => (
                  <label key={genre.id} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <input type="checkbox" name="genreIds" value={genre.id} defaultChecked={selectedGenreIds.includes(genre.id)} />
                    {genre.name}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="divider" />
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="submit" className="btn btn--primary" id="btn-update-drama">
              💾 Simpan Perubahan
            </button>
            <a href="/admin/dramas" className="btn btn--ghost">Batal</a>
          </div>
        </form>
      </div>
    </div>
  )
}
