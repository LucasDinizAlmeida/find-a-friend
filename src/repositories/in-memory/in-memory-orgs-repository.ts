import { Prisma, Org } from '@prisma/client'
import { OrgRepository } from '../orgs-repository'

export class InMemoryOrgsRepository implements OrgRepository {
  public items: Org[] = []

  async findByEmail(email: string): Promise<Org | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string): Promise<Org | null> {
    const org = this.items.find((item) => item.id === id)

    if (!org) return null

    return org
  }

  async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    const org: Org = {
      id: data.id ?? 'org-1',
      name: data.name,
      email: data.email,
      address: data.address,
      phone: data.phone,
      role: 'ADMIN',
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(org)

    return org
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id)
  }
}
