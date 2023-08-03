/*
  Warnings:

  - Added the required column `deliveryTime` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "shippingAddress" TEXT NOT NULL,
    "pinCode" INTEGER NOT NULL,
    "orderAccepted" BOOLEAN NOT NULL DEFAULT false,
    "deliveryTime" TEXT NOT NULL,
    "orderStatus" TEXT NOT NULL DEFAULT 'Incomplete',
    "cashOnDelivery" BOOLEAN NOT NULL,
    "isReturnable" BOOLEAN NOT NULL,
    "orderDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Order" ("businessId", "cashOnDelivery", "customerId", "id", "isReturnable", "orderDate", "orderStatus", "pinCode", "productId", "quantity", "shippingAddress") SELECT "businessId", "cashOnDelivery", "customerId", "id", "isReturnable", "orderDate", "orderStatus", "pinCode", "productId", "quantity", "shippingAddress" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
