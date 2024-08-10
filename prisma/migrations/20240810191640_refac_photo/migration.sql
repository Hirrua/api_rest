/*
  Warnings:

  - A unique constraint covering the columns `[animal_id]` on the table `photos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "photos_animal_id_key" ON "photos"("animal_id");
