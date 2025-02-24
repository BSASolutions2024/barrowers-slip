import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
})

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    // In development, we use a global variable to avoid multiple Prisma client instances.
    globalForPrisma.prisma = prisma;
}

export { prisma, pool }
