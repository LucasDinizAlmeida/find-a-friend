import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet-use-case'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgNotFound } from './errors/org-not-found'

let inMemoryPetsRepository: InMemoryPetsRepository
let inMemoryOrgsRepository: InMemoryOrgsRepository
let createPetUseCase: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    createPetUseCase = new CreatePetUseCase(
      inMemoryPetsRepository,
      inMemoryOrgsRepository,
    )
  })

  it('should create a new pet', async () => {
    await inMemoryOrgsRepository.create({
      id: 'org-01',
      name: 'Seu Cãopanheiro',
      email: 'caopanheiro@example.com',
      password_hash: '123456',
      address: 'Rua das flores N: 10',
      phone: '21999999',
    })

    const { pet } = await createPetUseCase.execute({
      name: 'Fido',
      type: 'DOG',
      state: 'SP',
      city: 'São Paulo',
      description: null,
      size: 'AVARAGE',
      age: 'ADULT',
      image: ['https://example.com/fido.jpg'],
      orgId: 'org-01',
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should throw OrgNotFound error if org does not exist', async () => {
    await expect(async () => {
      await createPetUseCase.execute({
        name: 'Fido',
        type: 'DOG',
        state: 'SP',
        city: 'São Paulo',
        description: null,
        size: 'AVARAGE',
        age: 'ADULT',
        image: ['https://example.com/fido.jpg'],
        orgId: 'org-not-found',
      })
    }).rejects.toBeInstanceOf(OrgNotFound)
  })
})
