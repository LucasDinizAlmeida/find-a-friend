import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateUserUseCase } from '../create-user-use-case'

export function makeCreateUserUseCase() {
  const userRepository = new PrismaUserRepository()
  const useCase = new CreateUserUseCase(userRepository)

  return useCase
}
