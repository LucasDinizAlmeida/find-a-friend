import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchPetsByCityUsecase } from './search-pets-by-city'

let inMemoryPetsRepository: InMemoryPetsRepository
let sut: SearchPetsByCityUsecase

describe('Search Pets by city Use Case', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsByCityUsecase(inMemoryPetsRepository)
  })

  it('should able to search for pets by city', async () => {
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
      name: 'Madona',
      type: 'DOG',
      state: 'SP',
      city: 'Rio de janeiro',
      description: null,
      size: 'AVARAGE',
      age: 'ADULT',
      image: ['https://example.com/fido.jpg'],
      org_id: 'org-01',
    })

    const { pets } = await sut.execute({
      city: 'São Paulo',
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ city: 'São Paulo' })])
  })

  // it('should throw OrgNotFound error if org does not exist', async () => {
  //   await expect(async () => {
  //     await createPetUseCase.execute({
  //       name: 'Fido',
  //       type: 'DOG',
  //       state: 'SP',
  //       city: 'São Paulo',
  //       description: null,
  //       size: 'AVARAGE',
  //       age: 'ADULT',
  //       image: ['https://example.com/fido.jpg'],
  //       orgId: 'org-not-found',
  //     })
  //   }).rejects.toBeInstanceOf(OrgNotFound)
  // })
})
