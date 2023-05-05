import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { create } from './create'
import { update } from './update'
import { search } from './search'

export async function petRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/pets', { onRequest: [verifyUserRole('ADMIN')] }, create)
  app.patch(
    '/pets/:petId/update',
    { onRequest: [verifyUserRole('ADMIN')] },
    update,
  )
  app.get('/pets/search', search)
}
