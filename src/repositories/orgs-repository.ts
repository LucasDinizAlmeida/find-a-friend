import { Org, Prisma } from '@prisma/client'

export interface OrgRepository {
  findByEmail(email: string): Promise<Org | null>
  findById(id: string): Promise<Org | null>
  delete(id: string): Promise<void>
  create(data: Prisma.OrgUncheckedCreateInput): Promise<Org>
}
