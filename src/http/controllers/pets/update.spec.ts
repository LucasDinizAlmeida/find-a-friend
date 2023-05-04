import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Update Pet test e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able update pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const org = await prisma.org.findFirstOrThrow()

    let pet = await prisma.pet.create({
      data: {
        org_id: org.id,
        name: 'Fido',
        type: 'DOG',
        state: 'SP',
        city: 'São Paulo',
        description: 'Cãozinho pequeno',
        size: 'AVARAGE',
        age: 'ADULT',
        image: ['https://example.com/fido.jpg'],
      },
    })

    await request(app.server)
      .patch(`/pets/${pet.id}/update`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    const response = await request(app.server)
      .patch(`/pets/${pet.id}/update`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)

    pet = await prisma.pet.findFirstOrThrow({
      where: {
        id: pet.id,
      },
    })

    expect(pet.status).toEqual('AVAILABLE')
  })
})
