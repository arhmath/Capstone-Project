/*
  Warnings:

  - You are about to drop the `leaderboard_weekly` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "leaderboard_weekly" DROP CONSTRAINT "leaderboard_weekly_user_id_fkey";

-- DropTable
DROP TABLE "leaderboard_weekly";
