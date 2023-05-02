import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface SearchPetsByCityUsecaseRequest {
  city: string
  page: number
}

interface SearchPetsByCityUsecaseResponse {
  pets: Pet[]
}

export class SearchPetsByCityUsecase {
  constructor(private petRepository: PetsRepository) { }

  async execute({
    city,
    page = 1,
  }: SearchPetsByCityUsecaseRequest): Promise<SearchPetsByCityUsecaseResponse> {
    const pets = await this.petRepository.searchManyByCity(city, page)

    return { pets }
  }
}
