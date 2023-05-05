import { UserRepository } from '@/repositories/users-repository'
import { UserNotFound } from './errors/user-not-found'

interface DeleteUserUseCaseRequest {
  id: string
}

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute({ id }: DeleteUserUseCaseRequest): Promise<void> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new UserNotFound()
    }

    await this.userRepository.delete(id)
  }
}
