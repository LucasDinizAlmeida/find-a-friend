import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { AuthenticateOrgUseCase } from '../authenticate-org'

export function MakeAuthenticaOrgteUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new AuthenticateOrgUseCase(orgsRepository)

  return useCase
}
