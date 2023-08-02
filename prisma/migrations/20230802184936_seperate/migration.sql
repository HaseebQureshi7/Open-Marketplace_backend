/*
  Warnings:

  - You are about to drop the column `ofBusiness` on the `ProductReview` table. All the data in the column will be lost.
  - Added the required column `ofProduct` to the `ProductReview` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ofProduct" TEXT NOT NULL,
    "reviewBy" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "reviewDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_ProductReview" ("id", "rating", "reviewBy", "reviewDate") SELECT "id", "rating", "reviewBy", "reviewDate" FROM "ProductReview";
DROP TABLE "ProductReview";
ALTER TABLE "new_ProductReview" RENAME TO "ProductReview";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
