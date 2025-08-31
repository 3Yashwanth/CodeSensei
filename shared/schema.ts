import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const codeSubmissions = pgTable("code_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  problemName: text("problem_name").notNull(),
  language: text("language").notNull(),
  code: text("code").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const codeAnalyses = pgTable("code_analyses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  submissionId: varchar("submission_id").references(() => codeSubmissions.id).notNull(),
  isCorrect: text("is_correct").notNull(), // "correct" | "incorrect" | "partially_correct"
  correctnessScore: integer("correctness_score"), // 0-100
  strengths: jsonb("strengths").$type<string[]>(),
  improvements: jsonb("improvements").$type<Array<{title: string, description: string}>>(),
  criticalIssues: jsonb("critical_issues").$type<Array<{issue: string, explanation: string, impact: string}>>(),
  missingConcepts: jsonb("missing_concepts").$type<Array<{concept: string, explanation: string, importance: string}>>(),
  correctSolution: text("correct_solution"),
  correctSolutionExplanation: text("correct_solution_explanation"),
  timeComplexity: text("time_complexity"),
  spaceComplexity: text("space_complexity"),
  optimalTimeComplexity: text("optimal_time_complexity"),
  optimalSpaceComplexity: text("optimal_space_complexity"),
  readabilityScore: integer("readability_score"),
  efficiencyScore: integer("efficiency_score"),
  bestPracticesScore: integer("best_practices_score"),
  overallFeedback: text("overall_feedback"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const learningPlans = pgTable("learning_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  analysisId: varchar("analysis_id").references(() => codeAnalyses.id).notNull(),
  weaknessAnalysis: text("weakness_analysis"),
  focusAreas: jsonb("focus_areas").$type<Array<{area: string, priority: string, explanation: string}>>(),
  nextChallenge: text("next_challenge"),
  conceptDeepDive: text("concept_deep_dive"),
  studyPath: jsonb("study_path").$type<Array<{step: number, topic: string, description: string, estimatedTime: string}>>(),
  resources: jsonb("resources").$type<Array<{title: string, type: string, url: string, duration?: string}>>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userProgress = pgTable("user_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  totalProblems: integer("total_problems").default(0),
  correctSolutions: integer("correct_solutions").default(0),
  currentStreak: integer("current_streak").default(0),
  longestStreak: integer("longest_streak").default(0),
  lastSolvedAt: timestamp("last_solved_at"),
  skillLevel: text("skill_level").default("Beginner"), // Beginner, Intermediate, Advanced
  easyProblems: integer("easy_problems").default(0),
  mediumProblems: integer("medium_problems").default(0),
  hardProblems: integer("hard_problems").default(0),
  avgCodeQuality: integer("avg_code_quality").default(0),
  weeklyGoal: integer("weekly_goal").default(5),
  createdAt: timestamp("created_at").defaultNow(),
});

export const discussionPosts = pgTable("discussion_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  problemName: text("problem_name").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  likes: integer("likes").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const motivationFeed = pgTable("motivation_feed", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  message: text("message").notNull(),
  type: text("type").notNull(), // daily_tip, achievement, encouragement
  isRead: integer("is_read").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCodeSubmissionSchema = createInsertSchema(codeSubmissions).omit({
  id: true,
  userId: true,
  createdAt: true,
});

export const insertCodeAnalysisSchema = createInsertSchema(codeAnalyses).omit({
  id: true,
  createdAt: true,
});

export const insertLearningPlanSchema = createInsertSchema(learningPlans).omit({
  id: true,
  createdAt: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  createdAt: true,
});

export const insertDiscussionPostSchema = createInsertSchema(discussionPosts).omit({
  id: true,
  createdAt: true,
});

export const insertMotivationFeedSchema = createInsertSchema(motivationFeed).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCodeSubmission = z.infer<typeof insertCodeSubmissionSchema>;
export type CodeSubmission = typeof codeSubmissions.$inferSelect;

export type InsertCodeAnalysis = z.infer<typeof insertCodeAnalysisSchema>;
export type CodeAnalysis = typeof codeAnalyses.$inferSelect;

export type InsertLearningPlan = z.infer<typeof insertLearningPlanSchema>;
export type LearningPlan = typeof learningPlans.$inferSelect;

export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type UserProgress = typeof userProgress.$inferSelect;

export type InsertDiscussionPost = z.infer<typeof insertDiscussionPostSchema>;
export type DiscussionPost = typeof discussionPosts.$inferSelect;

export type InsertMotivationFeed = z.infer<typeof insertMotivationFeedSchema>;
export type MotivationFeed = typeof motivationFeed.$inferSelect;
