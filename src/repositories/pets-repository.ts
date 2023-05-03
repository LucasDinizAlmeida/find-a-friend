import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  searchManyByCity(state: string, city: string, page: number): Promise<Pet[]>
  searchManyByState(state: string, page: number): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  save(data: Pet): Promise<Pet>
}
