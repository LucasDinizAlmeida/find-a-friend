import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUserUseCase } from '../autthenticate-user'

export function MakeAuthenticaUserteUseCase() {
  const userRepository = new PrismaUserRepository()
  const useCase = new AuthenticateUserUseCase(userRepository)

  return useCase
}
