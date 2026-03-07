import { createStudent } from '../models/StudentRegistration.js';

/**
 * Service to handle business logic for student registration.
 * @param {import('fastify').FastifyInstance} fastify Encapsulated Fastify Instance
 * @param {Object} payload The dynamic JSON payload from the frontend
 */
export async function registerStudentService(fastify, payload) {
    // Top-level custom validation logic can optionally go here
    if (!payload.identificationDetails || !payload.identificationDetails.row1 || !payload.identificationDetails.row1.udid) {
        throw new Error('UDID is required inside identificationDetails.row1');
    }

    // Call the model to save the data
    const result = await createStudent(fastify, payload);
    return result;
}
