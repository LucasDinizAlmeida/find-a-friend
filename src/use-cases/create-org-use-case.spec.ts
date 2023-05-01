import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { CreateOrgUseCase } from './create-org-use-case'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create Org Use Case', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(inMemoryOrgsRepository)
  })

  it('should able to create Org', async () => {
    const { org } = await sut.execute({
      name: 'Seu Cãopanheiro',
      email: 'caopanheiro@example.com',
      password: '123456',
      address: 'Rua das flores N: 10',
      phone: '219999999',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'Seu Cãopanheiro',
      email: 'caopanheiro@example.com',
      password: '123456',
      address: 'Rua das flores N: 10',
      phone: '219999999',
    })

    const isPasswordCorrectlyHashd = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashd).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'Seu Cãopanheiro',
      email,
      password: '123456',
      address: 'Rua das flores N: 10',
      phone: '219999999',
    })

    await expect(() =>
      sut.execute({
        name: 'Seu Cãopanheiro',
        email,
        password: '123456',
        address: 'Rua das flores N: 10',
        phone: '219999999',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
