import { prisma } from '@/lib/prisma'
import { addGenreAction, deleteGenreAction } from '@/app/actions/genre'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Kelola Genre | Admin Dramafy' }

export default async function AdminGenresPage() {
  const genres = await prisma.genre.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { dramas: true } } },
  })

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Genre</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{genres.length} genre terdaftar</p>
      </div>

      {/* Add Genre Form */}
      <div className="card" style={{ maxWidth: '480px', marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
          Tambah Genre
        </h2>
        <form action={addGenreAction} style={{ display: 'flex', gap: '0.75rem' }}>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <input id="genre-name" name="name" className="form-input" required placeholder="Romance" />
          </div>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <input id="genre-slug" name="slug" className="form-input" required placeholder="romance" />
          </div>
          <button type="submit" className="btn btn--primary" id="btn-add-genre">+ Tambah</button>
        </form>
      </div>

      {/* Genres Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Slug</th>
              <th>Jumlah Drama</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {genres.map((genre) => (
              <tr key={genre.id}>
                <td>{genre.name}</td>
                <td><code style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{genre.slug}</code></td>
                <td>{genre._count.dramas}</td>
                <td>
                  <form action={deleteGenreAction} style={{ display: 'inline' }}>
                    <input type="hidden" name="genreId" value={genre.id} />
                    <button
                      type="submit"
                      className="btn btn--ghost btn--sm"
                      style={{ color: '#ff6b8a' }}
                      id={`btn-del-genre-${genre.id}`}
                      disabled={genre._count.dramas > 0}
                      title={genre._count.dramas > 0 ? 'Genre ini masih digunakan' : 'Hapus genre'}
                    >
                      Hapus
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
