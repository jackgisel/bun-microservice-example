import type { Config } from 'drizzle-kit';

export default {
    schema: './src/db/schema/task.ts',
    out: './src/db/migrations',
    driver: 'turso',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
        authToken: process.env.DATABASE_AUTH_TOKEN!,
    },
    verbose: true,
    strict: true,
} satisfies Config;