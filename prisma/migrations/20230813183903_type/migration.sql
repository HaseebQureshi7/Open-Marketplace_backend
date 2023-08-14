/*
  Warnings:

  - You are about to alter the column `availableUnits` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `cashOnDelivery` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.
  - You are about to alter the column `isReturnable` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "sellerId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "availableUnits" INTEGER NOT NULL,
    "productImage" TEXT NOT NULL,
    "deliveryRadius" TEXT NOT NULL DEFAULT '',
    "cashOnDelivery" BOOLEAN NOT NULL DEFAULT false,
    "isReturnable" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Product" ("availableUnits", "cashOnDelivery", "category", "deliveryRadius", "description", "id", "isReturnable", "name", "price", "productImage", "sellerId") SELECT "availableUnits", "cashOnDelivery", "category", "deliveryRadius", "description", "id", "isReturnable", "name", "price", "productImage", "sellerId" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
