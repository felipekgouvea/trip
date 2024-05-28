-- CreateEnum
CREATE TYPE "TripStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELED');

-- AlterTable
ALTER TABLE "TripReservation" ADD COLUMN     "status" "TripStatus" NOT NULL DEFAULT 'PENDING';
