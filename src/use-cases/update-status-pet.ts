import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { PetNotFound } from './errors/pet-not-found'

interface UpdateStatusPetUseCaseCaseRequest {
  petId: string
}

interface UpdateStatusPetUseCaseCaseResponse {
  updatePet: Pet
}

export class UpdateStatusPetUseCaseCase {
  constructor(private petRepository: PetsRepository) { }

  async execute({
    petId,
  }: UpdateStatusPetUseCaseCaseRequest): Promise<UpdateStatusPetUseCaseCaseResponse> {
    const pet = await this.petRepository.findById(petId)

    if (!pet) {
      throw new PetNotFound()
    }

    pet.status = pet.status === 'AVAILABLE' ? 'ADOPTED' : 'AVAILABLE'

    const updatePet = await this.petRepository.save(pet)

    return { updatePet }
  }
}
