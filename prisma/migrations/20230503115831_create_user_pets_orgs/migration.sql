-- CreateEnum
CREATE TYPE "RoleUser" AS ENUM ('MEMBER');

-- CreateEnum
CREATE TYPE "RoleOrg" AS ENUM ('ADMIN');

-- CreateEnum
CREATE TYPE "AgePet" AS ENUM ('CUB', 'ADULT', 'ELDERLY');

-- CreateEnum
CREATE TYPE "SizePet" AS ENUM ('SMALL', 'AVARAGE', 'BIG');

-- CreateEnum
CREATE TYPE "AnimalType" AS ENUM ('DOG', 'CAT');

-- CreateEnum
CREATE TYPE "StatusPet" AS ENUM ('AVAILABLE', 'ADOPTED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "RoleUser" NOT NULL DEFAULT 'MEMBER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "AnimalType" NOT NULL DEFAULT 'DOG',
    "status" "StatusPet" NOT NULL DEFAULT 'AVAILABLE',
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "description" TEXT,
    "age" "AgePet" NOT NULL DEFAULT 'ADULT',
    "size" "SizePet" NOT NULL DEFAULT 'AVARAGE',
    "image" TEXT[],
    "org_id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "RoleOrg" NOT NULL DEFAULT 'ADMIN',
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
