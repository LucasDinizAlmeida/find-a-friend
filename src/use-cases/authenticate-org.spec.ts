import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalidCredentialsError'
import { AuthenticateOrgUseCase } from './authenticate-org'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: AuthenticateOrgUseCase

describe('Authenticate Org Use Case', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgUseCase(inMemoryOrgsRepository)
  })

  it('should be able to authenticate Org', async () => {
    await inMemoryOrgsRepository.create({
      name: 'Casa dos cachorros',
      address: 'Rua sem saida',
      phone: '219999999',
      email: 'chicquinhaandfrajola@example.com',
      password_hash: await hash('123456', 6),
    })

    const { org } = await sut.execute({
      email: 'chicquinhaandfrajola@example.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(
      sut.execute({
        email: 'chicquinhaandfrajola@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await inMemoryOrgsRepository.create({
      name: 'Casa dos cachorros',
      address: 'Rua sem saida',
      phone: '219999999',
      email: 'chicquinhaandfrajola@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(async () => {
      await sut.execute({
        email: 'chicquinhaandfrajola@example.com',
        password: 'invalid-password',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
