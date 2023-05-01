import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { Org } from '@prisma/client'
import { OrgRepository } from '@/repositories/orgs-repository'

interface CreateOrgUseCaseRequest {
  name: string
  email: string
  password: string
  address: string
  phone: string
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgRepository: OrgRepository) { }

  async execute({
    name,
    email,
    password,
    address,
    phone,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const password_hash = await hash(password, 10)

    const orgWithSameEmail = await this.orgRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const org = await this.orgRepository.create({
      name,
      email,
      password_hash,
      address,
      phone,
    })

    return { org }
  }
}
