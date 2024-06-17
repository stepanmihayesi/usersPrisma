/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
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

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
