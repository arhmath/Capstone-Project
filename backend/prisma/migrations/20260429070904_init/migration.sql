-- CreateEnum
CREATE TYPE "EducationLevel" AS ENUM ('primary', 'middle', 'high');

-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('email', 'google', 'school');

-- CreateEnum
CREATE TYPE "PageType" AS ENUM ('story', 'explanation', 'summary');

-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('in_progress', 'completed');

-- CreateEnum
CREATE TYPE "XpSourceType" AS ENUM ('quiz', 'module', 'streak_bonus', 'pretest');

-- CreateTable
CREATE TABLE "ai_recommendations" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "pretest_session_id" TEXT NOT NULL,
    "weak_topics" JSONB NOT NULL,
    "strong_topics" JSONB NOT NULL,
    "recommended_module_ids" JSONB NOT NULL,
    "generated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_recommendations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_xp" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "total_xp" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "xp_to_next_level" INTEGER NOT NULL DEFAULT 100,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_xp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "xp_transactions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "xp_amount" INTEGER NOT NULL,
    "source_type" "XpSourceType" NOT NULL,
    "source_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "xp_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_streaks" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "current_streak" INTEGER NOT NULL DEFAULT 0,
    "longest_streak" INTEGER NOT NULL DEFAULT 0,
    "last_activity_date" DATE NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_streaks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leaderboard_weekly" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "week_number" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "educationLevel" "EducationLevel" NOT NULL,
    "xp_this_week" INTEGER NOT NULL DEFAULT 0,
    "rank" INTEGER,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leaderboard_weekly_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modules" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "educationLevel" "EducationLevel" NOT NULL,
    "topic" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "xp_reward" INTEGER NOT NULL DEFAULT 50,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "module_pages" (
    "id" TEXT NOT NULL,
    "module_id" TEXT NOT NULL,
    "page_number" INTEGER NOT NULL,
    "scene_title" VARCHAR(200),
    "story_content" TEXT NOT NULL,
    "illustration_url" TEXT,
    "page_type" "PageType" NOT NULL DEFAULT 'story',

    CONSTRAINT "module_pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_module_progress" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "module_id" TEXT NOT NULL,
    "last_page" INTEGER NOT NULL DEFAULT 1,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "xp_earned" INTEGER NOT NULL DEFAULT 0,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "user_module_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pretest_questions" (
    "id" TEXT NOT NULL,
    "educationLevel" "EducationLevel" NOT NULL,
    "topic" VARCHAR(100) NOT NULL,
    "question_text" TEXT NOT NULL,
    "image_url" TEXT,
    "difficulty" VARCHAR(20) NOT NULL DEFAULT 'medium',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pretest_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pretest_question_options" (
    "id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "option_text" TEXT NOT NULL,
    "is_correct" BOOLEAN NOT NULL DEFAULT false,
    "explanation" TEXT,

    CONSTRAINT "pretest_question_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pretest_sessions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "educationLevel" "EducationLevel" NOT NULL,
    "total_score" INTEGER NOT NULL DEFAULT 0,
    "duration_seconds" INTEGER,
    "topic_scores" JSONB,
    "status" "SessionStatus" NOT NULL DEFAULT 'in_progress',
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "pretest_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pretest_answers" (
    "id" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "selected_option_id" TEXT,
    "is_correct" BOOLEAN NOT NULL DEFAULT false,
    "time_taken_seconds" INTEGER,

    CONSTRAINT "pretest_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quizzes" (
    "id" TEXT NOT NULL,
    "module_id" TEXT NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "time_limit_seconds" INTEGER NOT NULL DEFAULT 30,
    "passing_score" INTEGER NOT NULL DEFAULT 70,
    "max_xp" INTEGER NOT NULL DEFAULT 100,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quizzes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" TEXT NOT NULL,
    "quiz_id" TEXT NOT NULL,
    "question_text" TEXT NOT NULL,
    "image_url" TEXT,
    "time_limit_seconds" INTEGER NOT NULL DEFAULT 30,
    "base_xp" INTEGER NOT NULL DEFAULT 10,
    "order_index" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_options" (
    "id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "option_text" TEXT NOT NULL,
    "is_correct" BOOLEAN NOT NULL DEFAULT false,
    "explanation" TEXT,

    CONSTRAINT "question_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_sessions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "quiz_id" TEXT NOT NULL,
    "total_score" INTEGER NOT NULL DEFAULT 0,
    "total_xp_earned" INTEGER NOT NULL DEFAULT 0,
    "duration_seconds" INTEGER,
    "status" "SessionStatus" NOT NULL DEFAULT 'in_progress',
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "quiz_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_answers" (
    "id" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "selected_option_id" TEXT,
    "is_correct" BOOLEAN NOT NULL DEFAULT false,
    "time_taken_seconds" INTEGER NOT NULL DEFAULT 0,
    "xp_earned" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "quiz_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" TEXT,
    "avatar_url" TEXT,
    "auth_provider" "AuthProvider" NOT NULL DEFAULT 'email',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_login_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_education_levels" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "educationLevel" "EducationLevel" NOT NULL,
    "selected_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_education_levels_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ai_recommendations_pretest_session_id_key" ON "ai_recommendations"("pretest_session_id");

-- CreateIndex
CREATE INDEX "ai_recommendations_user_id_idx" ON "ai_recommendations"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_xp_user_id_key" ON "user_xp"("user_id");

-- CreateIndex
CREATE INDEX "xp_transactions_user_id_idx" ON "xp_transactions"("user_id");

-- CreateIndex
CREATE INDEX "xp_transactions_user_id_created_at_idx" ON "xp_transactions"("user_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "user_streaks_user_id_key" ON "user_streaks"("user_id");

-- CreateIndex
CREATE INDEX "leaderboard_weekly_week_number_year_educationLevel_xp_this__idx" ON "leaderboard_weekly"("week_number", "year", "educationLevel", "xp_this_week");

-- CreateIndex
CREATE UNIQUE INDEX "leaderboard_weekly_user_id_week_number_year_key" ON "leaderboard_weekly"("user_id", "week_number", "year");

-- CreateIndex
CREATE INDEX "modules_educationLevel_idx" ON "modules"("educationLevel");

-- CreateIndex
CREATE INDEX "modules_educationLevel_topic_order_index_idx" ON "modules"("educationLevel", "topic", "order_index");

-- CreateIndex
CREATE INDEX "module_pages_module_id_idx" ON "module_pages"("module_id");

-- CreateIndex
CREATE UNIQUE INDEX "module_pages_module_id_page_number_key" ON "module_pages"("module_id", "page_number");

-- CreateIndex
CREATE INDEX "user_module_progress_user_id_idx" ON "user_module_progress"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_module_progress_user_id_module_id_key" ON "user_module_progress"("user_id", "module_id");

-- CreateIndex
CREATE INDEX "pretest_questions_educationLevel_idx" ON "pretest_questions"("educationLevel");

-- CreateIndex
CREATE INDEX "pretest_questions_educationLevel_topic_idx" ON "pretest_questions"("educationLevel", "topic");

-- CreateIndex
CREATE INDEX "pretest_question_options_question_id_idx" ON "pretest_question_options"("question_id");

-- CreateIndex
CREATE INDEX "pretest_sessions_user_id_idx" ON "pretest_sessions"("user_id");

-- CreateIndex
CREATE INDEX "pretest_sessions_user_id_educationLevel_idx" ON "pretest_sessions"("user_id", "educationLevel");

-- CreateIndex
CREATE INDEX "pretest_answers_session_id_idx" ON "pretest_answers"("session_id");

-- CreateIndex
CREATE INDEX "quizzes_module_id_idx" ON "quizzes"("module_id");

-- CreateIndex
CREATE INDEX "questions_quiz_id_idx" ON "questions"("quiz_id");

-- CreateIndex
CREATE INDEX "questions_quiz_id_order_index_idx" ON "questions"("quiz_id", "order_index");

-- CreateIndex
CREATE INDEX "question_options_question_id_idx" ON "question_options"("question_id");

-- CreateIndex
CREATE INDEX "quiz_sessions_user_id_idx" ON "quiz_sessions"("user_id");

-- CreateIndex
CREATE INDEX "quiz_sessions_user_id_quiz_id_idx" ON "quiz_sessions"("user_id", "quiz_id");

-- CreateIndex
CREATE INDEX "quiz_answers_session_id_idx" ON "quiz_answers"("session_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "user_education_levels_user_id_idx" ON "user_education_levels"("user_id");

-- AddForeignKey
ALTER TABLE "ai_recommendations" ADD CONSTRAINT "ai_recommendations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_recommendations" ADD CONSTRAINT "ai_recommendations_pretest_session_id_fkey" FOREIGN KEY ("pretest_session_id") REFERENCES "pretest_sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_xp" ADD CONSTRAINT "user_xp_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "xp_transactions" ADD CONSTRAINT "xp_transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_streaks" ADD CONSTRAINT "user_streaks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leaderboard_weekly" ADD CONSTRAINT "leaderboard_weekly_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "module_pages" ADD CONSTRAINT "module_pages_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_module_progress" ADD CONSTRAINT "user_module_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_module_progress" ADD CONSTRAINT "user_module_progress_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pretest_question_options" ADD CONSTRAINT "pretest_question_options_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "pretest_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pretest_sessions" ADD CONSTRAINT "pretest_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pretest_answers" ADD CONSTRAINT "pretest_answers_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "pretest_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pretest_answers" ADD CONSTRAINT "pretest_answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "pretest_questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pretest_answers" ADD CONSTRAINT "pretest_answers_selected_option_id_fkey" FOREIGN KEY ("selected_option_id") REFERENCES "pretest_question_options"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quizzes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_options" ADD CONSTRAINT "question_options_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_sessions" ADD CONSTRAINT "quiz_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_sessions" ADD CONSTRAINT "quiz_sessions_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quizzes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_answers" ADD CONSTRAINT "quiz_answers_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "quiz_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_answers" ADD CONSTRAINT "quiz_answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_answers" ADD CONSTRAINT "quiz_answers_selected_option_id_fkey" FOREIGN KEY ("selected_option_id") REFERENCES "question_options"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_education_levels" ADD CONSTRAINT "user_education_levels_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
