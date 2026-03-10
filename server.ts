import dotenv from 'dotenv';
import cors from '@fastify/cors';
import fastifyEnv from '@fastify/env';
import fastifyMiddie from '@fastify/middie';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import Fastify from 'fastify';
import morgan from 'morgan';
import dbconnector from './dbconnector.js';
import firstRoute from './routes/first.route.js';
import studentRegistrationRoutes from './routes/studentRegistrationRoutes.js';

dotenv.config();

const fastify = Fastify({
  logger: true
});

const envSchema = {
  type: 'object',
  required: ['DB_URL'],
  properties: {
    DB_URL: { type: 'string' }
  }
} as const;

await fastify.register(fastifyEnv, {
  schema: envSchema,
  dotenv: true
});

await fastify.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
});

await fastify.register(fastifyMiddie);
fastify.use(morgan('combined'));

await fastify.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Forge Form Backend API',
      description: 'API documentation for forge-form-bend',
      version: '1.0.0'
    }
  }
});

await fastify.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false
  }
});

await fastify.register(dbconnector);
await fastify.register(firstRoute);
await fastify.register(studentRegistrationRoutes);

const start = async (): Promise<void> => {
  try {
    const address = await fastify.listen({ port: 5001 });
    const baseUrl = address.includes('[::1]') ? address.replace('[::1]', 'localhost') : address;

    fastify.log.info(`Server is running at ${baseUrl}`);
    fastify.log.info(`GET  ${baseUrl}/`);
    fastify.log.info(`POST ${baseUrl}/api/student/register`);
    fastify.log.info(`GET  ${baseUrl}/docs`);
    fastify.log.info(`\n${fastify.printRoutes()}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

void start();