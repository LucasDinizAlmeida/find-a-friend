import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Refresh Org test e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able refreshToken Org', async () => {
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

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/orgs/token/refreshToken')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })

    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
