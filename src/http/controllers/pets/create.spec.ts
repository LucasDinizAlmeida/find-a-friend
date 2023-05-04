import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Create Pet test e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able org authenticate', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Cão amigo',
      email: 'caoamigo@example.com',
      password: '123456',
      address: 'Vila do Chaves',
      phone: '99552266445',
    })

    const authResponse = await request(app.server).post('/orgs/session').send({
      email: 'caoamigo@example.com',
      password: '123456',
    })

    const { token } = authResponse.body

    const response = await request(app.server)
      .post(`/pets`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Fido',
        type: 'DOG',
        state: 'SP',
        city: 'São Paulo',
        description: 'Cãozinho pequeno',
        size: 'AVARAGE',
        age: 'ADULT',
        image: ['https://example.com/fido.jpg'],
      })

    expect(response.statusCode).toEqual(201)
  })
})
