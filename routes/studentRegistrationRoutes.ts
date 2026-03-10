import { FastifyPluginAsync } from 'fastify';
import { registerStudentController } from '../controllers/studentRegistrationController.js';

const studentRegistrationRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
    fastify.post('/api/student/register', registerStudentController);
};

export default studentRegistrationRoutes;
