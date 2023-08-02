/*
  Warnings:

  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Review";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "BusinessReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ofBusiness" TEXT NOT NULL,
    "reviewBy" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "reviewDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ProductReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ofBusiness" TEXT NOT NULL,
    "reviewBy" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "reviewDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
