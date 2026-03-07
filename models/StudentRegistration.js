/**
 * Data Access Layer for Student Registration
 */

/**
 * Inserts a dynamic student registration JSON document into the database.
 * @param {import('fastify').FastifyInstance} fastify Encapsulated Fastify Instance
 * @param {Object} document The unstructured JSON payload from the frontend
 */
export async function createStudent(fastify, document) {
    const db = fastify.mongo.db;
    const collection = db.collection('students');
    
    // Add server-side timestamp
    const record = {
        ...document,
        createdAt: new Date()
    };
    
    const result = await collection.insertOne(record);
    return result;
}
