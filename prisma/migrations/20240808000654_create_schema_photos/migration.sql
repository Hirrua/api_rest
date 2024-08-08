/*
  Warnings:

  - You are about to drop the column `photo` on the `animals` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "animals" DROP COLUMN "photo";

-- CreateTable
CREATE TABLE "photos" (
    "id" SERIAL NOT NULL,
    "originalname" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "created_ate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "animal_id" INTEGER NOT NULL,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "photos_animal_id_key" ON "photos"("animal_id");

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "animals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
