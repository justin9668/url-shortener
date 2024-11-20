import { Collection, Db, MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is undefined');
}

const uri = process.env.MONGODB_URI;
const db_name = 'url-shortener';
export const urls_collection = 'urls';

let client: MongoClient;
let db: Db;

async function connect(): Promise<Db> {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
    }
    return client.db(db_name);
}

export default async function getCollection(
    collectionName: string,
): Promise<Collection> {
    if (!db) {
        db = await connect();
    }
    return db.collection(collectionName);
}