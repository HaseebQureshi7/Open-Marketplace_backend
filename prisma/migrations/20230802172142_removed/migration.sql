/*
  Warnings:

  - You are about to drop the column `ratings` on the `Business` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Business" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_Business" ("description", "email", "id", "location", "name", "password", "phone", "profilePicture") SELECT "description", "email", "id", "location", "name", "password", "phone", "profilePicture" FROM "Business";
DROP TABLE "Business";
ALTER TABLE "new_Business" RENAME TO "Business";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
