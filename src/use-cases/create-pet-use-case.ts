import { AgePet, AnimalType, Pet, SizePet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrgNotFound } from './errors/org-not-found'
import { OrgRepository } from '@/repositories/orgs-repository'

interface CreatePetUseCaseRequest {
  id?: string
  name: string
  type: AnimalType
  state: string
  city: string
  description: string | null
  size: SizePet
  age: AgePet
  image: string[]
  orgId: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petRepository: PetsRepository,
    private orgsRepository: OrgRepository,
  ) { }

  async execute({
    name,
    age,
    city,
    image,
    orgId,
    size,
    state,
    type,
    description,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const orgExists = await this.orgsRepository.findById(orgId)

    if (!orgExists) {
      throw new OrgNotFound()
    }

    const pet = await this.petRepository.create({
      name,
      age: age ?? 'ADULT',
      city,
      image,
      org_id: orgId,
      size: size ?? 'AVARAGE',
      state,
      type: type ?? 'DOG',
      description,
    })

    return { pet }
  }
}
