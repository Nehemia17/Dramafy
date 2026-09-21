'use server'

import { prisma } from '@/lib/prisma'
import { EpisodeSchema, EpisodeServerSchema } from '@/lib/validations'
import { revalidatePath } from 'next/cache'

export async function addEpisodeAction(dramaId: string, formData: FormData) {
  const raw = Object.fromEntries(formData.entries())
  const data = EpisodeSchema.parse({ ...raw, dramaId })

  try {
    await prisma.episode.create({
      data: {
        dramaId,
        episodeNumber: data.episodeNumber,
        title: data.title || null,
        releaseDate: data.releaseDate ? new Date(data.releaseDate) : null,
      },
    })
  } catch {
    // duplicate episode number — ignore
  }

  revalidatePath(`/admin/dramas/${dramaId}/episodes`)
}

export async function deleteEpisodeAction(formData: FormData) {
  const episodeId = formData.get('episodeId') as string
  const episode = await prisma.episode.findUnique({ where: { id: episodeId } })
  if (!episode) return

  await prisma.episode.delete({ where: { id: episodeId } })
  revalidatePath(`/admin/dramas/${episode.dramaId}/episodes`)
}

export async function addServerAction(episodeId: string, formData: FormData) {
  const raw = Object.fromEntries(formData.entries())
  const data = EpisodeServerSchema.parse({ ...raw, episodeId })

  await prisma.episodeServer.create({
    data: {
      episodeId,
      serverName: data.serverName,
      embedUrl: data.embedUrl,
      quality: data.quality,
      orderPriority: data.orderPriority,
    },
  })

  const episode = await prisma.episode.findUnique({ where: { id: episodeId } })
  if (episode) revalidatePath(`/admin/dramas/${episode.dramaId}/episodes`)
}

export async function deleteServerAction(formData: FormData) {
  const serverId = formData.get('serverId') as string
  const server = await prisma.episodeServer.findUnique({
    where: { id: serverId },
    include: { episode: true },
  })
  if (!server) return

  await prisma.episodeServer.delete({ where: { id: serverId } })
  revalidatePath(`/admin/dramas/${server.episode.dramaId}/episodes`)
}
