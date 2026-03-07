// ESM
import dotenv from 'dotenv'
dotenv.config()
import Fastify from 'fastify'
import firstRoute from './routes/first.route.js'
import studentRegistrationRoutes from './routes/studentRegistrationRoutes.js';
import dbconnector from './dbconnector.js'
import fastifyEnv from '@fastify/env'

/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = Fastify({
  logger: true
})

await fastify.register(fastifyEnv, {
  schema: {
    type: 'object',
    required: ['DB_URL'],
    properties: {
      DB_URL: { type: 'string' }
    }
  },
  dotenv: true
})

fastify.register(dbconnector)
fastify.register(firstRoute)
fastify.register(studentRegistrationRoutes)

fastify.listen({ port: 5001 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})