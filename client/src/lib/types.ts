export interface Problem {
  id: number;
  name: string;
  difficulty: string;
}

export interface AnalysisResponse {
  submission: {
    id: string;
    problemName: string;
    language: string;
    code: string;
    createdAt: Date;
  };
  analysis: {
    id: string;
    isCorrect: "correct" | "incorrect" | "partially_correct";
    correctnessScore: number;
    strengths: string[];
    improvements: Array<{title: string, description: string}>;
    criticalIssues: Array<{issue: string, explanation: string, impact: string}>;
    missingConcepts: Array<{concept: string, explanation: string, importance: string}>;
    correctSolution: string;
    correctSolutionExplanation: string;
    timeComplexity: string;
    spaceComplexity: string;
    optimalTimeComplexity: string;
    optimalSpaceComplexity: string;
    readabilityScore: number;
    efficiencyScore: number;
    bestPracticesScore: number;
    overallFeedback: string;
  };
  learningPlan?: {
    id: string;
    weaknessAnalysis: string;
    focusAreas: Array<{area: string, priority: string, explanation: string}>;
    nextChallenge: string;
    conceptDeepDive: string;
    studyPath: Array<{step: number, topic: string, description: string, estimatedTime: string}>;
    resources: Array<{title: string, type: string, url: string, duration?: string}>;
  };
}
