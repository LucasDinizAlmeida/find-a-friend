import { AnimalType, Pet, Prisma } from '@prisma/client'

export interface FilterInputParams {
  state: string
  city: string | null
  type: AnimalType | null
  page: number
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  searchPetsByFilter({
    page,
    state,
    city,
    type,
  }: FilterInputParams): Promise<Pet[]>
  searchManyByState(state: string, page: number): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  delete(id: string): Promise<void>
  save(data: Pet): Promise<Pet>
}
