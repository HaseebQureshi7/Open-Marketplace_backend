/*
  Warnings:

  - You are about to drop the column `orderDate` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `reviewDate` on the `BusinessReview` table. All the data in the column will be lost.
  - You are about to drop the column `reviewDate` on the `ProductReview` table. All the data in the column will be lost.

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
    "isReturnable" BOOLEAN NOT NULL DEFAULT false,
    "addedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Product" ("availableUnits", "cashOnDelivery", "category", "deliveryRadius", "description", "id", "isReturnable", "name", "price", "productImage", "sellerId") SELECT "availableUnits", "cashOnDelivery", "category", "deliveryRadius", "description", "id", "isReturnable", "name", "price", "productImage", "sellerId" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE TABLE "new_Business" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL DEFAULT '',
    "location" TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "addedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Business" ("address", "description", "email", "id", "location", "name", "password", "phone", "profilePicture") SELECT "address", "description", "email", "id", "location", "name", "password", "phone", "profilePicture" FROM "Business";
DROP TABLE "Business";
ALTER TABLE "new_Business" RENAME TO "Business";
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
    "addedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Order" ("businessId", "cashOnDelivery", "customerId", "deliveryTime", "id", "isReturnable", "orderAccepted", "orderStatus", "pinCode", "productId", "quantity", "shippingAddress") SELECT "businessId", "cashOnDelivery", "customerId", "deliveryTime", "id", "isReturnable", "orderAccepted", "orderStatus", "pinCode", "productId", "quantity", "shippingAddress" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE TABLE "new_BusinessReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ofBusiness" TEXT NOT NULL,
    "reviewBy" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "addedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_BusinessReview" ("id", "ofBusiness", "rating", "reviewBy") SELECT "id", "ofBusiness", "rating", "reviewBy" FROM "BusinessReview";
DROP TABLE "BusinessReview";
ALTER TABLE "new_BusinessReview" RENAME TO "BusinessReview";
CREATE TABLE "new_Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "addedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Customer" ("email", "firstName", "id", "lastName", "password", "phone") SELECT "email", "firstName", "id", "lastName", "password", "phone" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE TABLE "new_ProductReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ofProduct" TEXT NOT NULL,
    "reviewBy" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "addedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_ProductReview" ("id", "ofProduct", "rating", "reviewBy") SELECT "id", "ofProduct", "rating", "reviewBy" FROM "ProductReview";
DROP TABLE "ProductReview";
ALTER TABLE "new_ProductReview" RENAME TO "ProductReview";
CREATE TABLE "new_MonthSales" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ofBusiness" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "totalSales" REAL NOT NULL DEFAULT 0,
    "paymentDue" REAL NOT NULL DEFAULT 0,
    "chargedPercentage" REAL NOT NULL DEFAULT 2,
    "addedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_MonthSales" ("chargedPercentage", "id", "month", "ofBusiness", "paymentDue", "totalSales") SELECT "chargedPercentage", "id", "month", "ofBusiness", "paymentDue", "totalSales" FROM "MonthSales";
DROP TABLE "MonthSales";
ALTER TABLE "new_MonthSales" RENAME TO "MonthSales";
CREATE TABLE "new_Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "categoryImage" TEXT NOT NULL,
    "addedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Category" ("categoryImage", "description", "id", "name") SELECT "categoryImage", "description", "id", "name" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
