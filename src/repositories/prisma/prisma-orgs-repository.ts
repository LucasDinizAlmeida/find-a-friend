import { Org, Prisma } from '@prisma/client'
import { OrgRepository } from '../orgs-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgsRepository implements OrgRepository {
  async findByEmail(email: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    return org
  }

  async findById(id: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    })

    return org
  }

  async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    const org = await prisma.org.create({
      data,
    })

    return org
  }
}
