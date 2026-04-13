import mongoose from 'mongoose';
import dns from 'dns';

if (process.env.NODE_ENV !== 'production') {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: { conn: mongoose.Mongoose | null; promise: Promise<mongoose.Mongoose> | null };
}

if (!global.mongooseCache) {
  global.mongooseCache = { conn: null, promise: null };
}

async function connectDB(): Promise<mongoose.Mongoose> {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error(
      'MONGODB_URI is not defined. Please add it to your .env.local file.'
    );
  }

  if (global.mongooseCache.conn) {
    return global.mongooseCache.conn;
  }

  if (!global.mongooseCache.promise) {
    global.mongooseCache.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
  }

  try {
    global.mongooseCache.conn = await global.mongooseCache.promise;
    return global.mongooseCache.conn;
  } catch (error) {
    // Reset promise so next call retries
    global.mongooseCache.promise = null;
    throw error;
  }
}

export default connectDB;
