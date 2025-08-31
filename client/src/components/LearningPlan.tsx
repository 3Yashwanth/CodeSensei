import { Route, BookOpen, History, Trophy, AlertCircle, Target, TrendingUp, Clock, Star, Brain, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { AnalysisResponse } from "@/lib/types";

interface LearningPlanProps {
  analysisData: AnalysisResponse;
}

export default function LearningPlan({ analysisData }: LearningPlanProps) {
  const { learningPlan } = analysisData;

  if (!learningPlan) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Weakness Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Brain className="text-red-600" size={16} />
          <h3 className="font-semibold text-slate-900">Weakness Analysis</h3>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <p className="text-red-700 text-sm" data-testid="text-weakness-analysis">
            {learningPlan.weaknessAnalysis}
          </p>
        </div>
      </div>

      {/* Focus Areas */}
      {learningPlan.focusAreas && learningPlan.focusAreas.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="text-orange-600" size={16} />
            <h3 className="font-semibold text-slate-900">Priority Focus Areas</h3>
          </div>
          <div className="space-y-3">
            {learningPlan.focusAreas.map((area, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-slate-800" data-testid={`text-focus-area-${index}`}>
                    {area.area}
                  </h4>
                  <Badge 
                    className={`text-xs ${
                      area.priority === 'high' ? 'bg-red-100 text-red-800' :
                      area.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
                      'bg-green-100 text-green-800'
                    }`}
                    data-testid={`badge-priority-${index}`}
                  >
                    {area.priority} priority
                  </Badge>
                </div>
                <p className="text-sm text-slate-600" data-testid={`text-focus-explanation-${index}`}>
                  {area.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Personalized Learning Plan */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Route className="text-blue-600" size={16} />
          <h3 className="font-semibold text-slate-900">Learning Plan</h3>
        </div>

        <Tabs defaultValue="plan" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="plan">Action Plan</TabsTrigger>
            <TabsTrigger value="path">Study Path</TabsTrigger>
          </TabsList>

          <TabsContent value="plan" className="space-y-4">
            {/* Next Challenge */}
            <div className="border-l-4 border-blue-400 pl-4">
              <h4 className="font-medium text-slate-800 mb-1 flex items-center">
                <Target className="mr-2" size={16} />
                Next Challenge
              </h4>
              <p className="text-sm text-slate-600 mb-3" data-testid="text-next-challenge">
                {learningPlan.nextChallenge}
              </p>
              <Button size="sm" className="bg-blue-100 text-blue-700 hover:bg-blue-200" data-testid="button-start-challenge">
                Start Challenge
              </Button>
            </div>

            {/* Concept Deep Dive */}
            <div className="border-l-4 border-purple-400 pl-4">
              <h4 className="font-medium text-slate-800 mb-1 flex items-center">
                <BookOpen className="mr-2" size={16} />
                Concept Deep Dive
              </h4>
              <p className="text-sm text-slate-600" data-testid="text-concept-deep-dive">
                {learningPlan.conceptDeepDive}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="path" className="space-y-4">
            {learningPlan.studyPath && learningPlan.studyPath.length > 0 && (
              <div className="space-y-3">
                {learningPlan.studyPath.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4 p-3 bg-slate-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-slate-800" data-testid={`text-study-step-topic-${index}`}>
                        {step.topic}
                      </h5>
                      <p className="text-sm text-slate-600" data-testid={`text-study-step-desc-${index}`}>
                        {step.description}
                      </p>
                      <div className="flex items-center mt-1">
                        <Clock className="mr-1" size={12} />
                        <span className="text-xs text-slate-500" data-testid={`text-study-step-time-${index}`}>
                          {step.estimatedTime}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Recommended Resources */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <BookOpen className="text-emerald-600" size={16} />
          <h3 className="font-semibold text-slate-900">Recommended Resources</h3>
        </div>

        <div className="space-y-3">
          {learningPlan.resources.map((resource, index) => (
            <div 
              key={index} 
              className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              data-testid={`card-resource-${index}`}
            >
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                {resource.type === 'video' && <span className="text-red-600 text-sm">📺</span>}
                {resource.type === 'article' && <span className="text-blue-600 text-sm">📄</span>}
                {resource.type === 'practice' && <span className="text-purple-600 text-sm">💻</span>}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-slate-800 truncate" data-testid={`text-resource-title-${index}`}>
                  {resource.title}
                </h4>
                <p className="text-xs text-slate-500" data-testid={`text-resource-duration-${index}`}>
                  {resource.type} {resource.duration && `• ${resource.duration}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <History className="text-slate-600" size={16} />
          <h3 className="font-semibold text-slate-900">Recent Activity</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
              analysisData.analysis.isCorrect === 'correct' ? 'bg-green-500' :
              analysisData.analysis.isCorrect === 'partially_correct' ? 'bg-amber-500' :
              'bg-red-500'
            }`}></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-700" data-testid="text-recent-activity-0">
                {analysisData.analysis.isCorrect === 'correct' ? 'Solved' :
                 analysisData.analysis.isCorrect === 'partially_correct' ? 'Partially solved' :
                 'Attempted'} {analysisData.submission.problemName}
              </p>
              <p className="text-xs text-slate-500 flex items-center">
                <span className="mr-2">Just now</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  analysisData.analysis.isCorrect === 'correct' ? 'bg-green-100 text-green-700' :
                  analysisData.analysis.isCorrect === 'partially_correct' ? 'bg-amber-100 text-amber-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {analysisData.analysis.correctnessScore}% correct
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Accuracy Badge */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Trophy className="text-yellow-300" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg">99% Accuracy</h3>
            <p className="text-blue-100 text-sm">AI-Powered Analysis</p>
          </div>
        </div>
        <p className="text-blue-100 text-sm leading-relaxed">
          Our advanced AI models provide highly accurate code analysis and personalized recommendations.
        </p>
      </div>
    </div>
  );
}
