import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchPetByStateUsecase } from './search-pets-by-state'

let inMemoryPetsRepository: InMemoryPetsRepository
let sut: SearchPetByStateUsecase

describe('Search Pets by city Use Case', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new SearchPetByStateUsecase(inMemoryPetsRepository)
  })

  it('should able to search for pets by state', async () => {
    await inMemoryPetsRepository.create({
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
    await inMemoryPetsRepository.create({
      name: 'Tião',
      type: 'DOG',
      state: 'SP',
      city: 'São Paulo',
      description: null,
      size: 'AVARAGE',
      age: 'ADULT',
      image: ['https://example.com/fido.jpg'],
      org_id: 'org-01',
    })

    await inMemoryPetsRepository.create({
      name: 'Fedora',
      type: 'DOG',
      state: 'SP',
      city: 'Santos',
      description: null,
      size: 'AVARAGE',
      age: 'ADULT',
      image: ['https://example.com/fido.jpg'],
      org_id: 'org-01',
    })
    await inMemoryPetsRepository.create({
      name: 'Madona',
      type: 'DOG',
      state: 'RJ',
      city: 'Rio de janeiro',
      description: null,
      size: 'AVARAGE',
      age: 'ADULT',
      image: ['https://example.com/fido.jpg'],
      org_id: 'org-01',
    })

    const { pets } = await sut.execute({
      state: 'SP',
      page: 1,
    })

    expect(pets).toHaveLength(3)
    expect(pets).toEqual([
      expect.objectContaining({ state: 'SP' }),
      expect.objectContaining({ state: 'SP' }),
      expect.objectContaining({ state: 'SP' }),
    ])
  })

  it('should able to paginated pets search', async () => {
    for (let i = 1; i <= 12; i++) {
      await inMemoryPetsRepository.create({
        id: `id-${i}`,
        name: `Doguinho-${i}`,
        type: 'DOG',
        state: 'SP',
        city: 'Santos',
        description: null,
        size: 'AVARAGE',
        age: 'ADULT',
        image: ['https://example.com/fido.jpg'],
        org_id: 'org-01',
      })
    }

    const { pets } = await sut.execute({
      state: 'SP',
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ state: 'SP' }),
      expect.objectContaining({ state: 'SP' }),
    ])
  })
})
