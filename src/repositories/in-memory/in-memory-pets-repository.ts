import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) return null

    return pet
  }

  async searchManyByCity(city: string, page: number): Promise<Pet[]> {
    return this.items
      .filter((item) => item.city.includes(city))
      .slice((page - 1) * 10, page * 10)
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: data.id ?? 'pet-01',
      org_id: data.org_id,
      image: data.image ?? [],
      name: data.name,
      description: data.description ?? null,
      age: data.age ?? 'ADULT',
      state: data.state,
      city: data.city,
      size: data.size ?? 'AVARAGE',
      status: data.status ?? 'AVAILABLE',
      type: data.type ?? 'DOG',
    }

    this.items.push(pet as Pet)

    return pet as Pet
  }
}
