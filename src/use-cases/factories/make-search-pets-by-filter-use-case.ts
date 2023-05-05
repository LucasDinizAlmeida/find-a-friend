import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchPetsByFilterUseCase } from '../search-pets-by-filter'

export function MakeSearchPetsByFilter() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new SearchPetsByFilterUseCase(petsRepository)

  return useCase
}
