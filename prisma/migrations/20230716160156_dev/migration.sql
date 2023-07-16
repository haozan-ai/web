-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "pwd" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "isAdmin" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Apps" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "APP_ID" TEXT NOT NULL,
    "API_KEY" TEXT NOT NULL,

    CONSTRAINT "Apps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
