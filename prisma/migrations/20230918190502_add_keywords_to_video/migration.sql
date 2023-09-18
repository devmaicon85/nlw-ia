/*
  Warnings:

  - You are about to drop the column `prompt` on the `Video` table. All the data in the column will be lost.
  - Added the required column `keywords` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "prompt",
ADD COLUMN     "keywords" TEXT NOT NULL,
ALTER COLUMN "transcription" DROP DEFAULT;
