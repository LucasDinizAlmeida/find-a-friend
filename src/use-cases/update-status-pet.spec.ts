import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { UpdateStatusPetUseCaseCase } from './update-status-pet'
import { PetNotFound } from './errors/pet-not-found'

let inMemoryPetsRepository: InMemoryPetsRepository
let sut: UpdateStatusPetUseCaseCase

describe('Update status pet Use Case', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new UpdateStatusPetUseCaseCase(inMemoryPetsRepository)
  })

  it('should be possible to update the status of a pet', async () => {
    const petFake = await inMemoryPetsRepository.create({
      id: 'pet-01',
      name: 'Fido',
      type: 'DOG',
      state: 'SP',
      city: 'São Paulo',
      description: null,
      size: 'AVARAGE',
      age: 'ADULT',
      image: ['https://example.com/fido.jpg'],
      org_id: 'org-01',
    })

    const { updatePet } = await sut.execute({ petId: petFake.id })

    expect(updatePet.status).toEqual('ADOPTED')
  })

  it('it should be possible to update the status of a pet with non-existent id', async () => {
    await inMemoryPetsRepository.create({
      id: 'pet-01',
      name: 'Fido',
      type: 'DOG',
      state: 'SP',
      city: 'São Paulo',
      description: null,
      size: 'AVARAGE',
      age: 'ADULT',
      image: ['https://example.com/fido.jpg'],
      org_id: 'org-01',
    })

    expect(async () => {
      await sut.execute({ petId: 'id-not-found' })
    }).rejects.toBeInstanceOf(PetNotFound)
  })
})
