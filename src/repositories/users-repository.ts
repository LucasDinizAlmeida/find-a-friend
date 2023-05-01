import { User, Prisma } from '@prisma/client'

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  create(data: Prisma.UserUncheckedCreateInput): Promise<User>
}