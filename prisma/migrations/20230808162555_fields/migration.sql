-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Business" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL DEFAULT '',
    "location" TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_Business" ("description", "email", "id", "location", "name", "password", "phone", "profilePicture") SELECT "description", "email", "id", "location", "name", "password", "phone", "profilePicture" FROM "Business";
DROP TABLE "Business";
ALTER TABLE "new_Business" RENAME TO "Business";
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "availableUnits" TEXT NOT NULL,
    "productImage" TEXT NOT NULL,
    "deliveryRadius" TEXT NOT NULL DEFAULT '',
    "cashOnDelivery" TEXT NOT NULL DEFAULT '',
    "isReturnable" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Product" ("availableUnits", "category", "description", "id", "name", "price", "productImage", "sellerId") SELECT "availableUnits", "category", "description", "id", "name", "price", "productImage", "sellerId" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
