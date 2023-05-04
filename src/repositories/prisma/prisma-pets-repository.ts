import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  searchManyByCity(state: string, city: string, page: number): Promise<Pet[]> {
    throw new Error('Method not implemented.')
  }

  searchManyByState(state: string, page: number): Promise<Pet[]> {
    throw new Error('Method not implemented.')
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async save(data: Pet): Promise<Pet> {
    const updatePet = await prisma.pet.update({
      where: {
        id: data.id,
      },
      data,
    })

    return updatePet
  }
}
