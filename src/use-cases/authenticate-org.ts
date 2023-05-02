import { Org } from '@prisma/client'
import { InvalidCredentialsError } from './errors/invalidCredentialsError'
import { compare } from 'bcryptjs'
import { OrgRepository } from '@/repositories/orgs-repository'

interface AuthenticateOrgUseCaseRequest {
  email: string
  password: string
}
interface AuthenticateOrgUseCaseResponse {
  org: Org
}

export class AuthenticateOrgUseCase {
  constructor(private orgRepository: OrgRepository) { }

  async execute({
    email,
    password,
  }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
    const org = await this.orgRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const passwordIsCorrect = await compare(password, org.password_hash)

    if (!passwordIsCorrect) {
      throw new InvalidCredentialsError()
    }

    return { org }
  }
}
