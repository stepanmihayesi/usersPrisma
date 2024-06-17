-- CreateEnum
CREATE TYPE "TypeUser" AS ENUM ('admin', 'user');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "mdp" TEXT NOT NULL,
    "name" TEXT,
    "adrPost" TEXT,
    "comment" TEXT,
    "mailCheck" BOOLEAN NOT NULL DEFAULT false,
    "typeUser" "TypeUser" NOT NULL DEFAULT 'user',
    "hash" TEXT NOT NULL,
    "hashedRt" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
