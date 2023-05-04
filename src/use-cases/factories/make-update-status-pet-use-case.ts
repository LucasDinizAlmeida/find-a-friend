import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { UpdateStatusPetUseCaseCase } from '../update-status-pet'

export function MakeUpdateStatusPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new UpdateStatusPetUseCaseCase(petsRepository)

  return useCase
}
