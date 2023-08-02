/*
  Warnings:

  - You are about to drop the column `seller` on the `Product` table. All the data in the column will be lost.
  - Added the required column `sellerId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "availableUnits" TEXT NOT NULL,
    "productImage" TEXT NOT NULL
);
INSERT INTO "new_Product" ("availableUnits", "category", "description", "id", "name", "price", "productImage") SELECT "availableUnits", "category", "description", "id", "name", "price", "productImage" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
