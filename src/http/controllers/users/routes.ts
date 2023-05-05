import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { refresh } from './refresh'
import { deleteUser } from './delete'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
// import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/session', authenticate)

  app.patch('/users/token/refreshToken', refresh)

  // app.get('/me', { onRequest: [verifyJwt] }, profile)
  app.delete('/users/delete', { onRequest: [verifyJwt] }, deleteUser)
}
