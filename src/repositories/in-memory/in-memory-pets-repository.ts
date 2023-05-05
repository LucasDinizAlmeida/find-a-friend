import { Pet, Prisma } from '@prisma/client'
import { FilterInputParams, PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) return null

    return pet
  }

  async searchPetsByFilter({
    page,
    state,
    city,
    type,
  }: FilterInputParams): Promise<Pet[]> {
    return this.items
      .filter((item) => {
        if (city && !type) {
          return item.state.includes(state) && item.city.includes(city)
        }
        if (type && !city) {
          return item.state.includes(state) && item.type.includes(type)
        }
        if (city && type) {
          return (
            item.state.includes(state) &&
            item.city.includes(city) &&
            item.type.includes(type)
          )
        }
        return item.state.includes(state)
      })
      .slice((page - 1) * 10, page * 10)
  }

  async searchManyByState(state: string, page: number): Promise<Pet[]> {
    return this.items
      .filter((item) => item.state.includes(state))
      .slice((page - 1) * 10, page * 10)
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: data.id ?? 'pet-01',
      org_id: data.org_id,
      image: data.image,
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

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id)
  }

  async save(data: Pet): Promise<Pet> {
    const petIndex = this.items.findIndex((item) => item.id === data.id)

    if (petIndex >= 0) {
      this.items[petIndex] = data
    }

    return data
  }
}
