import { MakeSearchPetsByFilter } from '@/use-cases/factories/make-search-pets-by-filter-use-case'
import { AnimalType } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

// const animalType = ['DOG', 'CAT', null]

export const search = async (request: FastifyRequest, reply: FastifyReply) => {
  const searchPetsQuerySchema = z.object({
    state: z.string(),
    city: z.string().nullable(),
    type: z.string().nullable(),
    page: z.coerce.number().min(1).default(1),
  })

  const { page, city, state, type } = searchPetsQuerySchema.parse(request.query)

  const searchGymsUseCase = MakeSearchPetsByFilter()

  const { pets } = await searchGymsUseCase.execute({
    state,
    city,
    type: type as AnimalType | null,
    page,
  })

  return reply.code(200).send({
    pets,
  })
}
