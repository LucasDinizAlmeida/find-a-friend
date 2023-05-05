import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'
import { hash } from 'bcryptjs'

describe('Search gyms test e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able search gyms by title', async () => {
    await prisma.org.create({
      data: {
        name: 'Cão amigo',
        email: 'caoamigo@example.com',
        password_hash: await hash('123456', 6),
        address: 'Vila do Chaves',
        phone: '99552266445',
      },
    })

    const org = await prisma.org.findFirstOrThrow()

    const { token } = await createAndAuthenticateUser(app)

    await prisma.pet.createMany({
      data: [
        {
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
        {
          org_id: org.id,
          name: 'Fedora',
          type: 'CAT',
          state: 'SP',
          city: 'Santos',
          description: 'Gatinho pequeno',
          size: 'AVARAGE',
          age: 'ADULT',
          image: ['https://example.com/fido.jpg'],
        },
      ],
    })

    const response = await request(app.server)
      .get('/pets/search')
      .query({
        state: 'SP',
        city: null,
        type: null,
        page: 1,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(2)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        state: 'SP',
      }),
      expect.objectContaining({
        state: 'SP',
      }),
    ])
  })
})
