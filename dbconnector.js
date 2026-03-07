import fastifyPlugin from 'fastify-plugin'
import fastifyMongo from '@fastify/mongodb'

async function dbconnector(fastify, options){
    try {
        fastify.register(fastifyMongo, {
            url: fastify.config.DB_URL,
            forceClose: true
        })
    } catch (error) {
        fastify.log.error(error)
    }
}

export default fastifyPlugin(dbconnector)