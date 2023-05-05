import { OrgNotFound } from './errors/org-not-found'
import { OrgRepository } from '@/repositories/orgs-repository'

interface DeleteOrgUseCaseRequest {
  id: string
}

export class DeleteOrgUseCase {
  constructor(private orgsRepository: OrgRepository) { }

  async execute({ id }: DeleteOrgUseCaseRequest): Promise<void> {
    const org = await this.orgsRepository.findById(id)

    if (!org) {
      throw new OrgNotFound()
    }

    await this.orgsRepository.delete(id)
  }
}
