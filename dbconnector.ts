import fastifyMongo from '@fastify/mongodb';
import { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

const dbconnector: FastifyPluginAsync = async (fastify): Promise<void> => {
    try {
        await fastify.register(fastifyMongo, {
            url: fastify.config.DB_URL,
            forceClose: true
        });
    } catch (error) {
        fastify.log.error(error);
    }
};

export default fastifyPlugin(dbconnector);