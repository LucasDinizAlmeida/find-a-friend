import { PetNotFound } from '@/use-cases/errors/pet-not-found'
import { MakeUpdateStatusPetUseCase } from '@/use-cases/factories/make-update-status-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const update = async (request: FastifyRequest, reply: FastifyReply) => {
  const parmasSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = parmasSchema.parse(request.params)

  try {
    const updateStatusPetUseCase = MakeUpdateStatusPetUseCase()

    await updateStatusPetUseCase.execute({
      petId,
    })
  } catch (error) {
    if (error instanceof PetNotFound) {
      return reply.code(409).send({ message: error.message })
    }

    throw error
  }

  return reply.code(204).send()
}
