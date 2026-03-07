import { registerStudentController } from '../controllers/studentRegistrationController.js';

/**
 * Encapsulates the registration routes
 * @param {import('fastify').FastifyInstance} fastify Encapsulated Fastify Instance
 * @param {Object} options plugin options
 */
export default async function studentRegistrationRoutes(fastify, options) {
    fastify.post('/api/student/register', registerStudentController);
}
