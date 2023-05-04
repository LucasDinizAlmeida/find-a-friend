import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Authenticate Org test e2e', () => {
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

    const response = await request(app.server).post('/orgs/session').send({
      email: 'caoamigo@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
