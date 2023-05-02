import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { PetNotFound } from './errors/pet-not-found'

interface GetPetProfileUseCaseRequest {
  petId: string
}

interface GetPetProfileUseCaseResponse {
  pet: Pet
}

export class GetPetProfileUseCase {
  constructor(private petRepository: PetsRepository) { }

  async execute({
    petId,
  }: GetPetProfileUseCaseRequest): Promise<GetPetProfileUseCaseResponse> {
    const pet = await this.petRepository.findById(petId)

    if (!pet) {
      throw new PetNotFound()
    }

    return { pet }
  }
}
