import { MongoClient, Db } from 'mongodb';
import { env } from './env';
import { logger } from '../utils/logger';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectDatabase(): Promise<Db> {
  if (db) return db;

  try {
    client = new MongoClient(env.MONGODB_URI);
    await client.connect();
    db = client.db(env.MONGODB_DATABASE);
    logger.info(`✅ Connected to MongoDB: ${env.MONGODB_DATABASE}`);
    return db;
  } catch (error) {
    logger.error('❌ MongoDB connection failed:', error);
    throw error;
  }
}

export function getDb(): Db {
  if (!db) {
    throw new Error('Database not initialized. Call connectDatabase() first.');
  }
  return db;
}

export async function disconnectDatabase(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
    logger.info('MongoDB disconnected');
  }
}
