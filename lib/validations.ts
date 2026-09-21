import { z } from 'zod'

export const DramaSchema = z.object({
  title: z.string().min(1, 'Judul wajib diisi'),
  slug: z
    .string()
    .min(1, 'Slug wajib diisi')
    .regex(/^[a-z0-9-]+$/, 'Slug hanya boleh huruf kecil, angka, dan tanda hubung'),
  alternativeTitle: z.string().optional(),
  synopsis: z.string().min(10, 'Sinopsis minimal 10 karakter'),
  posterUrl: z.string().url('URL poster tidak valid'),
  backdropUrl: z.string().url('URL backdrop tidak valid').optional().or(z.literal('')),
  type: z.enum(['DRAMA', 'MOVIE']),
  status: z.enum(['ONGOING', 'COMPLETED', 'UPCOMING']),
  country: z.string().min(1, 'Negara wajib diisi'),
  releaseYear: z.coerce.number().int().min(1900).max(new Date().getFullYear() + 2),
  rating: z.coerce.number().min(0).max(10).optional(),
  totalEpisodes: z.coerce.number().int().positive().optional().nullable(),
  isFeatured: z.coerce.boolean().default(false),
  genreIds: z.array(z.string()).optional(),
})

export type DramaFormData = z.infer<typeof DramaSchema>

export const EpisodeSchema = z.object({
  dramaId: z.string().min(1),
  episodeNumber: z.coerce.number().int().positive(),
  title: z.string().optional(),
  releaseDate: z.string().optional(),
})

export type EpisodeFormData = z.infer<typeof EpisodeSchema>

export const EpisodeServerSchema = z.object({
  episodeId: z.string().min(1),
  serverName: z.string().min(1, 'Nama server wajib diisi'),
  embedUrl: z.string().min(1, 'URL embed wajib diisi'),
  quality: z.string().default('HD'),
  orderPriority: z.coerce.number().int().default(1),
})

export type EpisodeServerFormData = z.infer<typeof EpisodeServerSchema>

export const GenreSchema = z.object({
  name: z.string().min(1, 'Nama genre wajib diisi'),
  slug: z
    .string()
    .min(1, 'Slug wajib diisi')
    .regex(/^[a-z0-9-]+$/, 'Slug hanya boleh huruf kecil, angka, dan tanda hubung'),
})

export type GenreFormData = z.infer<typeof GenreSchema>

export const AdminLoginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
})

export type AdminLoginData = z.infer<typeof AdminLoginSchema>
