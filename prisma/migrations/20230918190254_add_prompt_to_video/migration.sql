/*
  Warnings:

  - You are about to drop the column `path` on the `Video` table. All the data in the column will be lost.
  - Made the column `transcription` on table `Video` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "path",
ADD COLUMN     "prompt" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "transcription" SET NOT NULL,
ALTER COLUMN "transcription" SET DEFAULT '';
