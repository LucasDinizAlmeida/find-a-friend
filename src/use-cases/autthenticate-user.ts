import { UserRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { InvalidCredentialsError } from './errors/invalidCredentialsError'
import { compare } from 'bcryptjs'

interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}
interface AuthenticateUserUseCaseResponse {
  user: User
}

export class AuthenticateUserUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const passwordIsCorrect = await compare(password, user.password_hash)

    if (!passwordIsCorrect) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
