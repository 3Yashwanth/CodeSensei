import { 
  type User, 
  type InsertUser, 
  type CodeSubmission, 
  type InsertCodeSubmission,
  type CodeAnalysis,
  type InsertCodeAnalysis,
  type LearningPlan,
  type InsertLearningPlan
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createCodeSubmission(submission: InsertCodeSubmission): Promise<CodeSubmission>;
  getCodeSubmission(id: string): Promise<CodeSubmission | undefined>;
  getCodeSubmissionsByUser(userId: string): Promise<CodeSubmission[]>;
  
  createCodeAnalysis(analysis: InsertCodeAnalysis): Promise<CodeAnalysis>;
  getCodeAnalysis(id: string): Promise<CodeAnalysis | undefined>;
  getCodeAnalysisBySubmissionId(submissionId: string): Promise<CodeAnalysis | undefined>;
  
  createLearningPlan(plan: InsertLearningPlan): Promise<LearningPlan>;
  getLearningPlan(id: string): Promise<LearningPlan | undefined>;
  getLearningPlanByAnalysisId(analysisId: string): Promise<LearningPlan | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private codeSubmissions: Map<string, CodeSubmission>;
  private codeAnalyses: Map<string, CodeAnalysis>;
  private learningPlans: Map<string, LearningPlan>;

  constructor() {
    this.users = new Map();
    this.codeSubmissions = new Map();
    this.codeAnalyses = new Map();
    this.learningPlans = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createCodeSubmission(insertSubmission: InsertCodeSubmission): Promise<CodeSubmission> {
    const id = randomUUID();
    const submission: CodeSubmission = {
      ...insertSubmission,
      id,
      userId: null, // Will be set when user auth is implemented
      createdAt: new Date(),
    };
    this.codeSubmissions.set(id, submission);
    return submission;
  }

  async getCodeSubmission(id: string): Promise<CodeSubmission | undefined> {
    return this.codeSubmissions.get(id);
  }

  async getCodeSubmissionsByUser(userId: string): Promise<CodeSubmission[]> {
    return Array.from(this.codeSubmissions.values()).filter(
      (submission) => submission.userId === userId,
    );
  }

  async createCodeAnalysis(insertAnalysis: InsertCodeAnalysis): Promise<CodeAnalysis> {
    const id = randomUUID();
    const analysis: CodeAnalysis = {
      id,
      submissionId: insertAnalysis.submissionId,
      createdAt: new Date(),
      isCorrect: insertAnalysis.isCorrect || "incorrect",
      correctnessScore: insertAnalysis.correctnessScore || null,
      strengths: insertAnalysis.strengths ? [...insertAnalysis.strengths] : null,
      improvements: insertAnalysis.improvements ? [...insertAnalysis.improvements] : null,
      criticalIssues: insertAnalysis.criticalIssues ? [...insertAnalysis.criticalIssues] : null,
      missingConcepts: insertAnalysis.missingConcepts ? [...insertAnalysis.missingConcepts] : null,
      correctSolution: insertAnalysis.correctSolution || null,
      correctSolutionExplanation: insertAnalysis.correctSolutionExplanation || null,
      timeComplexity: insertAnalysis.timeComplexity || null,
      spaceComplexity: insertAnalysis.spaceComplexity || null,
      optimalTimeComplexity: insertAnalysis.optimalTimeComplexity || null,
      optimalSpaceComplexity: insertAnalysis.optimalSpaceComplexity || null,
      readabilityScore: insertAnalysis.readabilityScore || null,
      efficiencyScore: insertAnalysis.efficiencyScore || null,
      bestPracticesScore: insertAnalysis.bestPracticesScore || null,
      overallFeedback: insertAnalysis.overallFeedback || null,
    };
    this.codeAnalyses.set(id, analysis);
    return analysis;
  }

  async getCodeAnalysis(id: string): Promise<CodeAnalysis | undefined> {
    return this.codeAnalyses.get(id);
  }

  async getCodeAnalysisBySubmissionId(submissionId: string): Promise<CodeAnalysis | undefined> {
    return Array.from(this.codeAnalyses.values()).find(
      (analysis) => analysis.submissionId === submissionId,
    );
  }

  async createLearningPlan(insertPlan: InsertLearningPlan): Promise<LearningPlan> {
    const id = randomUUID();
    const plan: LearningPlan = {
      id,
      analysisId: insertPlan.analysisId,
      createdAt: new Date(),
      weaknessAnalysis: insertPlan.weaknessAnalysis || null,
      focusAreas: insertPlan.focusAreas ? [...insertPlan.focusAreas] : null,
      nextChallenge: insertPlan.nextChallenge || null,
      conceptDeepDive: insertPlan.conceptDeepDive || null,
      studyPath: insertPlan.studyPath ? [...insertPlan.studyPath] : null,
      resources: insertPlan.resources ? [...insertPlan.resources] : null,
    };
    this.learningPlans.set(id, plan);
    return plan;
  }

  async getLearningPlan(id: string): Promise<LearningPlan | undefined> {
    return this.learningPlans.get(id);
  }

  async getLearningPlanByAnalysisId(analysisId: string): Promise<LearningPlan | undefined> {
    return Array.from(this.learningPlans.values()).find(
      (plan) => plan.analysisId === analysisId,
    );
  }
}

export const storage = new MemStorage();
