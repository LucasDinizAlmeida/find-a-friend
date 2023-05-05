import { UserNotFound } from '@/use-cases/errors/user-not-found'
import { MakeDeleteUserUseCase } from '@/use-cases/factories/make-delete-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const deletUserUseCase = MakeDeleteUserUseCase()

    await deletUserUseCase.execute({
      id: request.user.sub,
    })
  } catch (error) {
    if (error instanceof UserNotFound) {
      return reply.code(404).send({ message: error.message })
    }
    console.log(error)

    throw error
  }
  return reply.code(204).send()
}
