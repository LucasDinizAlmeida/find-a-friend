import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetProfileUseCase } from './get-pet-profile'
import { PetNotFound } from './errors/pet-not-found'

let inMemoryPetsRepository: InMemoryPetsRepository
let sut: GetPetProfileUseCase

describe('Fetch pet profile Use Case', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new GetPetProfileUseCase(inMemoryPetsRepository)
  })

  it('should able to fetch for pets by id', async () => {
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

    const { pet } = await sut.execute({ petId: petFake.id })

    expect(pet.id).toEqual(petFake.id)
  })

  it('should not able to get pet id-not-found', async () => {
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
