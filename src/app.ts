import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.get('/', async (request, reply) => {
  return reply.send('ok')
})

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // usar um serviço de terceiro para log de erros com Datadog
  }

  return reply.code(500).send({ message: 'Internal error message' })
})
