import 'server-only';
import { MongoClient, MongoClientOptions } from 'mongodb';

/**
 * MongoDB singleton client for Next.js.
 *
 * Throws at call-time (not module init time) when MONGODB_URI is absent,
 * so the app can still boot without a DB connection in development.
 */

const uri = process.env.MONGODB_URI ?? '';
const options: MongoClientOptions = {};

let clientPromise: Promise<MongoClient>;

declare global {
  // Allow augmenting globalThis in Node.js
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function createClientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error(
      'MongoDB URI is not configured. Add MONGODB_URI to your .env.local file.'
    );
  }
  const client = new MongoClient(uri, options);
  return client.connect();
}

if (process.env.NODE_ENV === 'development') {
  // Reuse the connection across HMR reloads in development
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = createClientPromise();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = createClientPromise();
}

export default clientPromise;
