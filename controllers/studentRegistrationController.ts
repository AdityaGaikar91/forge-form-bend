import { FastifyReply, FastifyRequest } from 'fastify';
import {
    RegisterStudentFailureResponse,
    RegisterStudentSuccessResponse
} from '../interfaces/data/student-response.interface.js';
import { StudentRegistrationPayload } from '../interfaces/data/student-registration.interface.js';
import { registerStudentService } from '../services/studentRegistrationService.js';

type RegisterStudentRequest = FastifyRequest<{
    Body: StudentRegistrationPayload;
}>;

export async function registerStudentController(
    request: RegisterStudentRequest,
    reply: FastifyReply
): Promise<FastifyReply> {
    try {
        const payload = request.body;
        const result = await registerStudentService(request.server, payload);

        const response: RegisterStudentSuccessResponse = {
            success: true,
            message: 'Student Registration Successful',
            data: {
                insertedId: result.insertedId
            }
        };

        return reply.code(201).send(response);
    } catch (error: unknown) {
        request.log.error(error);

        const message = error instanceof Error ? error.message : 'Failed to register student';
        const response: RegisterStudentFailureResponse = {
            success: false,
            message
        };

        return reply.code(400).send(response);
    }
}
