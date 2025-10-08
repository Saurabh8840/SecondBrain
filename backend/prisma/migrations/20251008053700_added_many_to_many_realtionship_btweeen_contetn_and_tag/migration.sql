/*
  Warnings:

  - You are about to drop the column `contentId` on the `Tags` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hash]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Tags" DROP CONSTRAINT "Tags_contentId_fkey";

-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "contentId" INTEGER;

-- AlterTable
ALTER TABLE "Tags" DROP COLUMN "contentId";

-- CreateTable
CREATE TABLE "_ContentTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ContentTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ContentTags_B_index" ON "_ContentTags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Link_hash_key" ON "Link"("hash");

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentTags" ADD CONSTRAINT "_ContentTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentTags" ADD CONSTRAINT "_ContentTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
