import 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      DB_URL: string;
    };
  }
}
