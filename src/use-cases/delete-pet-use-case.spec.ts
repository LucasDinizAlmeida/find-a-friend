import { beforeEach, describe, expect, it } from 'vitest'
import { DeletePetUseCase } from './delete-pet-use-case'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { PetNotFound } from './errors/pet-not-found'

let inMemoryPetsRepository: InMemoryPetsRepository
let sut: DeletePetUseCase

describe('Delete Pet Use Case', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new DeletePetUseCase(inMemoryPetsRepository)
  })

  it('should able to delete pet', async () => {
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

    await sut.execute({
      id: 'pet-01',
    })

    expect(inMemoryPetsRepository.items).toHaveLength(0)
  })

  it('should not able to delete pet id-not-found', async () => {
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

    await expect(async () => {
      await sut.execute({
        id: 'id-not-found',
      })
    }).rejects.toBeInstanceOf(PetNotFound)
  })
})
