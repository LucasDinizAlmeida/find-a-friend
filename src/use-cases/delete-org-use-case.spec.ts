import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteOrgUseCase } from './delete-org-use-case'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { OrgNotFound } from './errors/org-not-found'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: DeleteOrgUseCase

describe('Delete Oeg Case', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    sut = new DeleteOrgUseCase(inMemoryOrgsRepository)
  })

  it('should able to delete org', async () => {
    await inMemoryOrgsRepository.create({
      id: 'org-01',
      name: 'Casa dos cachorros',
      address: 'Rua sem saida',
      phone: '219999999',
      email: 'chicquinhaandfrajola@example.com',
      password_hash: await hash('123456', 6),
    })

    await sut.execute({
      id: 'org-01',
    })

    expect(inMemoryOrgsRepository.items).toHaveLength(0)
  })

  it('should not able to org user id-not-found', async () => {
    await inMemoryOrgsRepository.create({
      id: 'org-01',
      name: 'Casa dos cachorros',
      address: 'Rua sem saida',
      phone: '219999999',
      email: 'chicquinhaandfrajola@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(async () => {
      await sut.execute({
        id: 'id-not-found',
      })
    }).rejects.toBeInstanceOf(OrgNotFound)
  })
})
