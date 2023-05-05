import { AnimalType, Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface SearchPetsByFilterUseCaseRequest {
  type?: AnimalType | null
  city?: string | null
  state: string
  page: number
}

interface SearchPetsByFilterUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsByFilterUseCase {
  constructor(private petRepository: PetsRepository) { }

  async execute({
    city = null,
    state,
    type = null,
    page = 1,
  }: SearchPetsByFilterUseCaseRequest): Promise<SearchPetsByFilterUseCaseResponse> {
    const pets = await this.petRepository.searchPetsByFilter({
      state,
      city,
      type,
      page,
    })

    return { pets }
  }
}
