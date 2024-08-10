/*
  Warnings:

  - You are about to drop the column `created_ate` on the `photos` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "photos_animal_id_key";

-- AlterTable
ALTER TABLE "photos" DROP COLUMN "created_ate",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
