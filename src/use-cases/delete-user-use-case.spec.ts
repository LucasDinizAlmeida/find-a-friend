import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { DeleteUserUseCase } from './delete-user-use-case'
import { UserNotFound } from './errors/user-not-found'

let inMemoryUserRepository: InMemoryUsersRepository
let sut: DeleteUserUseCase

describe('Delete Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository()
    sut = new DeleteUserUseCase(inMemoryUserRepository)
  })

  it('should able to delete user', async () => {
    await inMemoryUserRepository.create({
      id: 'user-99',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    await sut.execute({
      id: 'user-99',
    })

    expect(inMemoryUserRepository.items).toHaveLength(0)
  })

  it('should not able to delete user id-not-found', async () => {
    await inMemoryUserRepository.create({
      id: 'user-99',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    await expect(async () => {
      await sut.execute({
        id: 'id-not-found',
      })
    }).rejects.toBeInstanceOf(UserNotFound)
  })
})
