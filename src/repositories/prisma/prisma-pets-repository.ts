import { Prisma, Pet } from '@prisma/client'
import { FilterInputParams, PetsRepository } from '../pets-repository'
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

  async searchPetsByFilter({
    page,
    state,
    city,
    type,
  }: FilterInputParams): Promise<Pet[]> {
    if (city && !type) {
      return await prisma.pet.findMany({
        where: {
          state: {
            contains: state,
          },
          city: {
            contains: city,
          },
        },
        take: 10,
        skip: (page - 1) * 10,
      })
    }
    if (!!type && !city) {
      return await prisma.pet.findMany({
        where: {
          state: {
            contains: state,
          },
          type,
        },
        take: 20,
        skip: (page - 1) * 20,
      })
    }
    if (city && type) {
      return await prisma.pet.findMany({
        where: {
          state: {
            contains: state,
          },
          city: {
            contains: city,
          },
          type,
        },
        take: 20,
        skip: (page - 1) * 20,
      })
    }

    return await prisma.pet.findMany({
      where: {
        state: {
          contains: state,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })
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
