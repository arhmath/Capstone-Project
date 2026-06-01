/*
  Warnings:

  - You are about to drop the column `generated_at` on the `ai_recommendations` table. All the data in the column will be lost.
  - You are about to drop the column `recommended_module_ids` on the `ai_recommendations` table. All the data in the column will be lost.
  - You are about to drop the column `strong_topics` on the `ai_recommendations` table. All the data in the column will be lost.
  - You are about to drop the column `weak_topics` on the `ai_recommendations` table. All the data in the column will be lost.
  - Added the required column `confidence` to the `ai_recommendations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recommended_module_id` to the `ai_recommendations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ai_recommendations" DROP CONSTRAINT "ai_recommendations_pretest_session_id_fkey";

-- AlterTable
ALTER TABLE "ai_recommendations" DROP COLUMN "generated_at",
DROP COLUMN "recommended_module_ids",
DROP COLUMN "strong_topics",
DROP COLUMN "weak_topics",
ADD COLUMN     "recommended_module_id" TEXT NOT NULL,
ADD COLUMN     "confidence" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "ai_recommendations_pretest_session_id_idx" ON "ai_recommendations"("pretest_session_id");

-- AddForeignKey
ALTER TABLE "ai_recommendations" ADD CONSTRAINT "ai_recommendations_pretest_session_id_fkey" FOREIGN KEY ("pretest_session_id") REFERENCES "pretest_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_recommendations" ADD CONSTRAINT "ai_recommendations_recommended_module_id_fkey" FOREIGN KEY ("recommended_module_id") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
