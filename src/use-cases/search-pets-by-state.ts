import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface SearchPetByStateUsecaseRequest {
  state: string
  page: number
}

interface SearchPetByStateUsecaseResponse {
  pets: Pet[]
}

export class SearchPetByStateUsecase {
  constructor(private petRepository: PetsRepository) { }

  async execute({
    state,
    page = 1,
  }: SearchPetByStateUsecaseRequest): Promise<SearchPetByStateUsecaseResponse> {
    const pets = await this.petRepository.searchManyByState(state, page)

    return { pets }
  }
}
