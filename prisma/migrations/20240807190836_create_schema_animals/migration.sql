-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F');

-- CreateTable
CREATE TABLE "animals" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "date_birth" TIMESTAMP(3),
    "age" INTEGER DEFAULT 0,
    "weight" DOUBLE PRECISION DEFAULT 0.0,
    "height" DOUBLE PRECISION DEFAULT 0.0,
    "breed" VARCHAR(50),
    "gender" "Gender" NOT NULL,
    "photo" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "animals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "animals" ADD CONSTRAINT "animals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
