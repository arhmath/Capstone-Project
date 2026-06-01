/*
  Warnings:

  - You are about to drop the column `educationLevel` on the `leaderboard_weekly` table. All the data in the column will be lost.
  - You are about to drop the column `educationLevel` on the `modules` table. All the data in the column will be lost.
  - You are about to drop the column `educationLevel` on the `pretest_questions` table. All the data in the column will be lost.
  - You are about to drop the column `educationLevel` on the `pretest_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `educationLevel` on the `user_education_levels` table. All the data in the column will be lost.
  - Added the required column `education_level` to the `leaderboard_weekly` table without a default value. This is not possible if the table is not empty.
  - Added the required column `education_level` to the `modules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `education_level` to the `pretest_questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `education_level` to the `pretest_sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `education_level` to the `user_education_levels` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "leaderboard_weekly_week_number_year_educationLevel_xp_this__idx";

-- DropIndex
DROP INDEX "modules_educationLevel_idx";

-- DropIndex
DROP INDEX "modules_educationLevel_topic_order_index_idx";

-- DropIndex
DROP INDEX "pretest_questions_educationLevel_idx";

-- DropIndex
DROP INDEX "pretest_questions_educationLevel_topic_idx";

-- DropIndex
DROP INDEX "pretest_sessions_user_id_educationLevel_idx";

-- AlterTable
ALTER TABLE "leaderboard_weekly" RENAME COLUMN "educationLevel" TO "education_level";

-- AlterTable
ALTER TABLE "modules" RENAME COLUMN "educationLevel" TO "education_level";

-- AlterTable
ALTER TABLE "pretest_questions" RENAME COLUMN "educationLevel" TO "education_level";

-- AlterTable
ALTER TABLE "pretest_sessions" RENAME COLUMN "educationLevel" TO "education_level";

-- AlterTable
ALTER TABLE "user_education_levels" RENAME COLUMN "educationLevel" TO "education_level";

-- CreateIndex
CREATE INDEX "leaderboard_weekly_week_number_year_education_level_xp_this_idx" ON "leaderboard_weekly"("week_number", "year", "education_level", "xp_this_week");

-- CreateIndex
CREATE INDEX "modules_education_level_idx" ON "modules"("education_level");

-- CreateIndex
CREATE INDEX "modules_education_level_topic_order_index_idx" ON "modules"("education_level", "topic", "order_index");

-- CreateIndex
CREATE INDEX "pretest_questions_education_level_idx" ON "pretest_questions"("education_level");

-- CreateIndex
CREATE INDEX "pretest_questions_education_level_topic_idx" ON "pretest_questions"("education_level", "topic");

-- CreateIndex
CREATE INDEX "pretest_sessions_user_id_education_level_idx" ON "pretest_sessions"("user_id", "education_level");
