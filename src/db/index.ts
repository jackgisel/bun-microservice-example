import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';
import {migrate} from "drizzle-orm/libsql/migrator";

export const client = createClient({
    url: "libsql://" + process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN!,
});

export async function getDb() {
    const db = drizzle(client, {
        schema,
        logger: true,
    });

    await migrate(db, { migrationsFolder: './src/db/migrations' })

    return db
}