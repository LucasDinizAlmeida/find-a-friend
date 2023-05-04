import { OrgNotFound } from '@/use-cases/errors/org-not-found'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { AgePet, SizePet, AnimalType } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const agePet = ['CUB', 'ADULT', 'ELDERLY']
const sizePet = ['SMALL', 'AVARAGE', 'BIG']
const animalType = ['DOG', 'CAT']

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const bodySchema = z.object({
    name: z.string(),
    age: z.string().refine((value) => agePet.includes(value)),
    city: z.string().min(6),
    image: z.string().array(),
    size: z.string().refine((value) => sizePet.includes(value)),
    state: z.string(),
    type: z.string().refine((value) => animalType.includes(value)),
    description: z.string(),
  })

  const { age, city, description, image, name, size, state, type } =
    bodySchema.parse(request.body)

  try {
    const createPetUseCase = makeCreatePetUseCase()

    await createPetUseCase.execute({
      age: age as AgePet,
      city,
      description,
      image,
      name,
      orgId: request.user.sub,
      size: size as SizePet,
      state,
      type: type as AnimalType,
    })
  } catch (error) {
    if (error instanceof OrgNotFound) {
      return reply.code(409).send({ message: error.message })
    }

    throw error
  }

  return reply.code(201).send()
}
