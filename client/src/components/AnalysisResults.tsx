import { CheckCircle, XCircle, AlertTriangle, Lightbulb, Clock, Star, Code, BookOpen, Target, Brain } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { AnalysisResponse } from "@/lib/types";

interface AnalysisResultsProps {
  analysisData: AnalysisResponse;
}

export default function AnalysisResults({ analysisData }: AnalysisResultsProps) {
  const { analysis } = analysisData;

  const getCorrectnessIcon = () => {
    switch (analysis.isCorrect) {
      case "correct":
        return <CheckCircle className="text-green-600" size={20} />;
      case "partially_correct":
        return <AlertTriangle className="text-amber-600" size={20} />;
      default:
        return <XCircle className="text-red-600" size={20} />;
    }
  };

  const getCorrectnessColor = () => {
    switch (analysis.isCorrect) {
      case "correct":
        return "bg-green-100 text-green-800";
      case "partially_correct":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  const getCorrectnessText = () => {
    switch (analysis.isCorrect) {
      case "correct":
        return "Code is Correct";
      case "partially_correct":
        return "Partially Correct";
      default:
        return "Incorrect Approach";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      {/* Correctness Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <Brain className="text-white" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">AI Deep Analysis</h3>
            <div className="flex items-center space-x-2">
              {getCorrectnessIcon()}
              <Badge className={`text-sm font-medium ${getCorrectnessColor()}`} data-testid="badge-correctness">
                {getCorrectnessText()}
              </Badge>
              <span className="text-sm text-slate-500" data-testid="text-correctness-score">
                {analysis.correctnessScore}/100
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-sm text-slate-500">
          <Clock size={12} />
          <span data-testid="text-analysis-time">Analysis Complete</span>
        </div>
      </div>

      {/* AI Response */}
      <div className="flex items-start space-x-4 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <Star className="text-white" size={16} />
        </div>
        <div className="flex-1 bg-blue-50 rounded-lg p-4">
          <p className="text-slate-700">
            <span className="font-semibold text-blue-800">AI Coach:</span> 
            {analysis.overallFeedback}
          </p>
        </div>
      </div>

      <Tabs defaultValue="analysis" className="mb-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="solution">Correct Solution</TabsTrigger>
          <TabsTrigger value="concepts">Missing Concepts</TabsTrigger>
          <TabsTrigger value="complexity">Complexity</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="mt-4">

      {/* Strengths Section */}
      {analysis.strengths && analysis.strengths.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Star className="text-emerald-600" size={16} />
            <h4 className="font-semibold text-slate-900">Strengths</h4>
          </div>
          <div className="space-y-2 pl-6">
            {analysis.strengths.map((strength, index) => (
              <div key={index} className="flex items-start space-x-2">
                <CheckCircle className="text-emerald-500 mt-1" size={14} />
                <p className="text-slate-700" data-testid={`text-strength-${index}`}>{strength}</p>
              </div>
            ))}
          </div>
        </div>
      )}

          {/* Critical Issues */}
          {analysis.criticalIssues && analysis.criticalIssues.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <XCircle className="text-red-600" size={16} />
                <h4 className="font-semibold text-slate-900">Critical Issues</h4>
              </div>
              <div className="space-y-3 pl-6">
                {analysis.criticalIssues.map((issue, index) => (
                  <div key={index} className="border-l-4 border-red-400 pl-4 bg-red-50 rounded-r-lg p-3">
                    <h5 className="font-medium text-red-800" data-testid={`text-critical-issue-${index}`}>
                      ❌ {issue.issue}
                    </h5>
                    <p className="text-red-700 text-sm mb-2" data-testid={`text-critical-explanation-${index}`}>
                      {issue.explanation}
                    </p>
                    <p className="text-red-600 text-xs font-medium" data-testid={`text-critical-impact-${index}`}>
                      Impact: {issue.impact}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Areas for Improvement */}
          {analysis.improvements && analysis.improvements.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <Lightbulb className="text-amber-600" size={16} />
                <h4 className="font-semibold text-slate-900">Areas for Improvement</h4>
              </div>
              <div className="space-y-3 pl-6">
                {analysis.improvements.map((improvement, index) => (
                  <div key={index} className="border-l-4 border-amber-400 pl-4">
                    <h5 className="font-medium text-slate-800" data-testid={`text-improvement-title-${index}`}>
                      {improvement.title}
                    </h5>
                    <p className="text-slate-600 text-sm" data-testid={`text-improvement-desc-${index}`}>
                      {improvement.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </TabsContent>

        <TabsContent value="solution" className="mt-4">
          {analysis.correctSolution && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-3">
                <Code className="text-green-600" size={16} />
                <h4 className="font-semibold text-slate-900">Optimal Solution</h4>
              </div>
              <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm font-mono" data-testid="text-correct-solution">
                  <code>{analysis.correctSolution}</code>
                </pre>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h5 className="font-medium text-green-800 mb-2">Explanation:</h5>
                <p className="text-green-700 text-sm" data-testid="text-solution-explanation">
                  {analysis.correctSolutionExplanation}
                </p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="concepts" className="mt-4">
          {analysis.missingConcepts && analysis.missingConcepts.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-3">
                <BookOpen className="text-purple-600" size={16} />
                <h4 className="font-semibold text-slate-900">Concepts You Need to Learn</h4>
              </div>
              <div className="space-y-3">
                {analysis.missingConcepts.map((concept, index) => (
                  <div key={index} className="border-l-4 border-purple-400 pl-4 bg-purple-50 rounded-r-lg p-3">
                    <h5 className="font-medium text-purple-800" data-testid={`text-missing-concept-${index}`}>
                      📚 {concept.concept}
                    </h5>
                    <p className="text-purple-700 text-sm mb-2" data-testid={`text-concept-explanation-${index}`}>
                      {concept.explanation}
                    </p>
                    <p className="text-purple-600 text-xs font-medium" data-testid={`text-concept-importance-${index}`}>
                      Why it matters: {concept.importance}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="complexity" className="mt-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-3">
              <Target className="text-blue-600" size={16} />
              <h4 className="font-semibold text-slate-900">Complexity Comparison</h4>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h5 className="font-medium text-slate-700">Your Solution</h5>
                <div className="text-center bg-slate-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-orange-600" data-testid="text-time-complexity">
                    {analysis.timeComplexity}
                  </div>
                  <div className="text-sm text-slate-600">Time Complexity</div>
                </div>
                <div className="text-center bg-slate-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-orange-600" data-testid="text-space-complexity">
                    {analysis.spaceComplexity}
                  </div>
                  <div className="text-sm text-slate-600">Space Complexity</div>
                </div>
              </div>
              <div className="space-y-4">
                <h5 className="font-medium text-slate-700">Optimal Solution</h5>
                <div className="text-center bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600" data-testid="text-optimal-time-complexity">
                    {analysis.optimalTimeComplexity}
                  </div>
                  <div className="text-sm text-slate-600">Time Complexity</div>
                </div>
                <div className="text-center bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600" data-testid="text-optimal-space-complexity">
                    {analysis.optimalSpaceComplexity}
                  </div>
                  <div className="text-sm text-slate-600">Space Complexity</div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Code Quality Metrics */}
      <div className="bg-slate-50 rounded-lg p-4">
        <h4 className="font-semibold text-slate-900 mb-3">Code Quality Metrics</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Correctness</span>
            <div className="flex items-center space-x-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    analysis.correctnessScore >= 80 ? 'bg-green-500' : 
                    analysis.correctnessScore >= 50 ? 'bg-amber-500' : 'bg-red-500'
                  }`} 
                  style={{ width: `${analysis.correctnessScore}%` }}
                />
              </div>
              <span className="text-sm font-medium text-slate-700" data-testid="text-correctness-score-bar">
                {analysis.correctnessScore}%
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Readability</span>
            <div className="flex items-center space-x-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${analysis.readabilityScore}%` }}
                />
              </div>
              <span className="text-sm font-medium text-slate-700" data-testid="text-readability-score">
                {analysis.readabilityScore}%
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Efficiency</span>
            <div className="flex items-center space-x-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${analysis.efficiencyScore}%` }}
                />
              </div>
              <span className="text-sm font-medium text-slate-700" data-testid="text-efficiency-score">
                {analysis.efficiencyScore}%
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Best Practices</span>
            <div className="flex items-center space-x-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-amber-500 h-2 rounded-full" 
                  style={{ width: `${analysis.bestPracticesScore}%` }}
                />
              </div>
              <span className="text-sm font-medium text-slate-700" data-testid="text-best-practices-score">
                {analysis.bestPracticesScore}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
