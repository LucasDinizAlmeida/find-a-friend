import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { DeleteUserUseCase } from '../delete-user-use-case'

export function MakeDeleteUserUseCase() {
  const userRepository = new PrismaUserRepository()
  const useCase = new DeleteUserUseCase(userRepository)

  return useCase
}
