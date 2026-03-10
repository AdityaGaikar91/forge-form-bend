import { FastifyInstance } from 'fastify';
import { Document, InsertOneResult } from 'mongodb';
import { StudentRegistrationPayload } from '../interfaces/data/student-registration.interface.js';
import { createStudent } from '../models/StudentRegistration.js';

export async function registerStudentService(
    fastify: FastifyInstance,
    payload: StudentRegistrationPayload
): Promise<InsertOneResult<Document>> {
    const udid = payload.identificationDetails?.row1?.udid
        ?? payload.identificationDetails?.idRow1?.udid
        ?? payload.identificationDetails?.udid;

    if (!udid) {
        throw new Error('UDID is required inside identificationDetails.udid or nested row1/idRow1');
    }

    return createStudent(fastify, payload);
}
