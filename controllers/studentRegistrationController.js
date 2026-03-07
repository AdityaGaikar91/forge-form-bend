import { registerStudentService } from '../services/studentRegistrationService.js';

/**
 * Controller to handle API requests for student registration.
 * @param {import('fastify').FastifyRequest} request Fastify Request Object
 * @param {import('fastify').FastifyReply} reply Fastify Reply Object
 */
export async function registerStudentController(request, reply) {
    try {
        const payload = request.body;
        
        // Pass the request to the service layer.
        // We pass request.server which is the FastifyInstance containing mongo
        const result = await registerStudentService(request.server, payload);

        return reply.code(201).send({
            success: true,
            message: 'Student Registration Successful',
            data: {
                insertedId: result.insertedId
            }
        });
    } catch (error) {
        request.log.error(error);
        
        // Simple error handling
        return reply.code(400).send({
            success: false,
            message: error.message || 'Failed to register student'
        });
    }
}
