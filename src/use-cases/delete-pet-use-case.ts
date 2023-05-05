import { PetsRepository } from '@/repositories/pets-repository'
import { PetNotFound } from './errors/pet-not-found'

interface DeletePetUseCaseRequest {
  id: string
}

export class DeletePetUseCase {
  constructor(private petsRepository: PetsRepository) { }

  async execute({ id }: DeletePetUseCaseRequest): Promise<void> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new PetNotFound()
    }

    await this.petsRepository.delete(id)
  }
}
