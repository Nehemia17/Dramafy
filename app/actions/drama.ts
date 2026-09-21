'use server'

import { prisma } from '@/lib/prisma'
import { DramaSchema } from '@/lib/validations'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export async function createDramaAction(formData: FormData) {
  const raw = Object.fromEntries(formData.entries())
  const genreIds = formData.getAll('genreIds') as string[]

  const data = DramaSchema.parse({
    ...raw,
    genreIds,
    backdropUrl: raw.backdropUrl || undefined,
    isFeatured: raw.isFeatured === 'true' || raw.isFeatured === 'on',
  })

  await prisma.drama.create({
    data: {
      title: data.title,
      slug: data.slug || slugify(data.title),
      alternativeTitle: data.alternativeTitle,
      synopsis: data.synopsis,
      posterUrl: data.posterUrl,
      backdropUrl: data.backdropUrl || null,
      type: data.type,
      status: data.status,
      country: data.country,
      releaseYear: data.releaseYear,
      rating: data.rating ?? null,
      totalEpisodes: data.totalEpisodes ?? null,
      isFeatured: data.isFeatured,
      genres: data.genreIds?.length ? { connect: data.genreIds.map((id) => ({ id })) } : undefined,
    },
  })

  revalidatePath('/admin/dramas')
  revalidatePath('/')
  redirect('/admin/dramas')
}

export async function updateDramaAction(id: string, formData: FormData) {
  const raw = Object.fromEntries(formData.entries())
  const genreIds = formData.getAll('genreIds') as string[]

  const data = DramaSchema.parse({
    ...raw,
    genreIds,
    backdropUrl: raw.backdropUrl || undefined,
    isFeatured: raw.isFeatured === 'true' || raw.isFeatured === 'on',
  })

  await prisma.drama.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      alternativeTitle: data.alternativeTitle,
      synopsis: data.synopsis,
      posterUrl: data.posterUrl,
      backdropUrl: data.backdropUrl || null,
      type: data.type,
      status: data.status,
      country: data.country,
      releaseYear: data.releaseYear,
      rating: data.rating ?? null,
      totalEpisodes: data.totalEpisodes ?? null,
      isFeatured: data.isFeatured,
      genres: {
        set: data.genreIds?.map((id) => ({ id })) ?? [],
      },
    },
  })

  revalidatePath('/admin/dramas')
  revalidatePath(`/drama/${data.slug}`)
  revalidatePath('/')
  redirect('/admin/dramas')
}

export async function deleteDramaAction(id: string) {
  await prisma.drama.delete({ where: { id } })
  revalidatePath('/admin/dramas')
  revalidatePath('/')
}
