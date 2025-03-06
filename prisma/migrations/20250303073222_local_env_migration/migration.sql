-- AlterTable
ALTER TABLE "borrow_records" ADD COLUMN     "location" TEXT;

-- CreateTable
CREATE TABLE "prisma_migrations" (
    "id" SERIAL NOT NULL,
    "migration_name" VARCHAR(255) NOT NULL,
    "applied_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prisma_migrations_pkey" PRIMARY KEY ("id")
);
