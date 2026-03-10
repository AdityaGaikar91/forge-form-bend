import { FastifyInstance } from 'fastify';
import { Document, InsertOneResult } from 'mongodb';
import {
    StudentRegistrationPayload,
    StudentRegistrationRecord
} from '../interfaces/data/student-registration.interface.js';

export async function createStudent(
    fastify: FastifyInstance,
    document: StudentRegistrationPayload
): Promise<InsertOneResult<Document>> {
    const db = fastify.mongo.db;

    if (!db) {
        throw new Error('Database connection is not available.');
    }

    const collection = db.collection('students');
    const record: StudentRegistrationRecord = {
        ...document,
        createdAt: new Date()
    };

    return collection.insertOne(record);
}
