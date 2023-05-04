import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await prisma.org.create({
    data: {
      name: 'Cão amigo',
      email: 'caoamigo@example.com',
      password_hash: await hash('123456', 6),
      address: 'Vila do Chaves',
      phone: '99552266445',
    },
  })

  const authResponse = await request(app.server).post('/orgs/session').send({
    email: 'caoamigo@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
