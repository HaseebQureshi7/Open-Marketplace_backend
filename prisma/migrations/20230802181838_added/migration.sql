/*
  Warnings:

  - Added the required column `businessId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "shippingAddress" TEXT NOT NULL,
    "pinCode" INTEGER NOT NULL,
    "orderStatus" TEXT NOT NULL DEFAULT 'Incomplete',
    "cashOnDelivery" BOOLEAN NOT NULL,
    "isReturnable" BOOLEAN NOT NULL,
    "orderDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Order" ("cashOnDelivery", "customerId", "id", "isReturnable", "orderDate", "orderStatus", "pinCode", "productId", "quantity", "shippingAddress") SELECT "cashOnDelivery", "customerId", "id", "isReturnable", "orderDate", "orderStatus", "pinCode", "productId", "quantity", "shippingAddress" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
