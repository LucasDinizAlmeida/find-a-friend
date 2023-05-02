import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { AuthenticateUserUseCase } from './autthenticate-user'
import { InvalidCredentialsError } from './errors/invalidCredentialsError'

let inMemoryUserRepository: InMemoryUsersRepository
let sut: AuthenticateUserUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUserUseCase(inMemoryUserRepository)
  })

  it('should be able to authenticate', async () => {
    await inMemoryUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await inMemoryUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(async () => {
      await sut.execute({
        email: 'johndoe@example.com',
        password: 'invalid-password',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
