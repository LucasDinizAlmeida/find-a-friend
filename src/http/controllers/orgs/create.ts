import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    address: z.string(),
    phone: z.string(),
  })

  const { address, phone, email, name, password } = bodySchema.parse(
    request.body,
  )

  try {
    const createGymUseCase = makeCreateOrgUseCase()

    await createGymUseCase.execute({
      address,
      email,
      name,
      password,
      phone,
    })
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.code(409).send({ message: error.message })
    }

    throw error
  }

  return reply.code(201).send()
}
