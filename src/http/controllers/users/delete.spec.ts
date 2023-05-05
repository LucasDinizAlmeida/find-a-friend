import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Delete user test e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to user', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const deleteUserResponse = await request(app.server)
      .delete(`/users/delete`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(deleteUserResponse.statusCode).toEqual(204)

    const userDeleted = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    })
    expect(userDeleted).toEqual(null)
  })
})
