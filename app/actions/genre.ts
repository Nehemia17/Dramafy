'use server'

import { prisma } from '@/lib/prisma'
import { GenreSchema } from '@/lib/validations'
import { revalidatePath } from 'next/cache'

export async function addGenreAction(formData: FormData) {
  const raw = Object.fromEntries(formData.entries())
  const data = GenreSchema.parse(raw)

  try {
    await prisma.genre.create({ data })
  } catch {
    // duplicate — ignore
  }

  revalidatePath('/admin/genres')
}

export async function deleteGenreAction(formData: FormData) {
  const genreId = formData.get('genreId') as string
  try {
    await prisma.genre.delete({ where: { id: genreId } })
  } catch {
    // has relations — ignore
  }
  revalidatePath('/admin/genres')
}
