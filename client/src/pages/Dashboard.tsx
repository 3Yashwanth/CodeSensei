import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  Award, 
  BarChart, 
  Trophy, 
  Zap, 
  Brain,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";

export default function Dashboard() {
  // Mock progress data - would come from API
  const progressData = {
    totalProblems: 47,
    correctSolutions: 32,
    currentStreak: 7,
    longestStreak: 14,
    skillLevel: "Intermediate",
    easyProblems: 25,
    mediumProblems: 18,
    hardProblems: 4,
    avgCodeQuality: 78,
    weeklyGoal: 10,
    thisWeekSolved: 6
  };

  const recentActivity = [
    { id: 1, problem: "Two Sum", difficulty: "Easy", status: "correct", score: 85, date: "2 hours ago" },
    { id: 2, problem: "Merge Two Sorted Lists", difficulty: "Easy", status: "correct", score: 92, date: "1 day ago" },
    { id: 3, problem: "Three Sum", difficulty: "Medium", status: "incorrect", score: 45, date: "2 days ago" },
    { id: 4, problem: "Valid Parentheses", difficulty: "Easy", status: "correct", score: 88, date: "3 days ago" },
  ];

  const suggestions = [
    { type: "progress", message: "Great streak! Try moving to medium-level problems now.", priority: "high" },
    { type: "improvement", message: "Your array skills are solid. Time to focus on linked lists.", priority: "medium" },
    { type: "consistency", message: "You're 4 problems away from your weekly goal!", priority: "high" }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">Track your coding progress and improvement journey</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Target className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900" data-testid="text-total-problems">
                      {progressData.totalProblems}
                    </p>
                    <p className="text-sm text-slate-600">Total Problems</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900" data-testid="text-correct-solutions">
                      {progressData.correctSolutions}
                    </p>
                    <p className="text-sm text-slate-600">Correct</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Zap className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900" data-testid="text-current-streak">
                      {progressData.currentStreak}
                    </p>
                    <p className="text-sm text-slate-600">Day Streak</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Brain className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900" data-testid="text-avg-quality">
                      {progressData.avgCodeQuality}%
                    </p>
                    <p className="text-sm text-slate-600">Avg Quality</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Progress Analytics */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Progress Analytics</h3>
                <Badge className="bg-blue-100 text-blue-800" data-testid="badge-skill-level">
                  {progressData.skillLevel}
                </Badge>
              </div>

              <Tabs defaultValue="difficulty" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="difficulty">By Difficulty</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly Goal</TabsTrigger>
                  <TabsTrigger value="trends">Trends</TabsTrigger>
                </TabsList>

                <TabsContent value="difficulty" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Easy Problems</span>
                        <span data-testid="text-easy-count">{progressData.easyProblems}</span>
                      </div>
                      <Progress value={(progressData.easyProblems / progressData.totalProblems) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Medium Problems</span>
                        <span data-testid="text-medium-count">{progressData.mediumProblems}</span>
                      </div>
                      <Progress value={(progressData.mediumProblems / progressData.totalProblems) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Hard Problems</span>
                        <span data-testid="text-hard-count">{progressData.hardProblems}</span>
                      </div>
                      <Progress value={(progressData.hardProblems / progressData.totalProblems) * 100} className="h-2" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="weekly" className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-slate-900 mb-2" data-testid="text-weekly-progress">
                      {progressData.thisWeekSolved}/{progressData.weeklyGoal}
                    </p>
                    <p className="text-slate-600">Problems solved this week</p>
                    <Progress value={(progressData.thisWeekSolved / progressData.weeklyGoal) * 100} className="h-3 mt-4" />
                  </div>
                </TabsContent>

                <TabsContent value="trends" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <TrendingUp className="mx-auto text-green-600 mb-2" size={24} />
                      <p className="text-lg font-semibold text-green-800">Improving</p>
                      <p className="text-sm text-green-600">Code quality up 15%</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <BarChart className="mx-auto text-blue-600 mb-2" size={24} />
                      <p className="text-lg font-semibold text-blue-800">Consistent</p>
                      <p className="text-sm text-blue-600">7 day solving streak</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        activity.status === 'correct' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <p className="font-medium text-slate-800" data-testid={`text-activity-problem-${index}`}>
                          {activity.problem}
                        </p>
                        <p className="text-sm text-slate-500" data-testid={`text-activity-date-${index}`}>
                          {activity.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        className={`mb-1 ${
                          activity.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                          activity.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800' :
                          'bg-red-100 text-red-800'
                        }`}
                        data-testid={`badge-activity-difficulty-${index}`}
                      >
                        {activity.difficulty}
                      </Badge>
                      <p className="text-sm text-slate-600" data-testid={`text-activity-score-${index}`}>
                        Score: {activity.score}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Suggestions */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="text-purple-600" size={20} />
                <h3 className="text-lg font-semibold text-slate-900">AI Suggestions</h3>
              </div>
              <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className={`p-3 rounded-lg border-l-4 ${
                    suggestion.priority === 'high' ? 'border-red-400 bg-red-50' :
                    suggestion.priority === 'medium' ? 'border-amber-400 bg-amber-50' :
                    'border-blue-400 bg-blue-50'
                  }`}>
                    <p className="text-sm text-slate-700" data-testid={`text-suggestion-${index}`}>
                      {suggestion.message}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Achievements */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Trophy className="text-yellow-600" size={20} />
                <h3 className="text-lg font-semibold text-slate-900">Achievements</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-2 bg-yellow-50 rounded-lg">
                  <Award className="text-yellow-600" size={16} />
                  <div>
                    <p className="text-sm font-medium text-slate-800">Week Warrior</p>
                    <p className="text-xs text-slate-600">Solved 7 problems this week</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
                  <Zap className="text-blue-600" size={16} />
                  <div>
                    <p className="text-sm font-medium text-slate-800">Streak Master</p>
                    <p className="text-xs text-slate-600">7 day solving streak</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
                  <CheckCircle className="text-green-600" size={16} />
                  <div>
                    <p className="text-sm font-medium text-slate-800">Quality Coder</p>
                    <p className="text-xs text-slate-600">78% average code quality</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Stats</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Success Rate</span>
                  <span className="font-medium" data-testid="text-success-rate">
                    {Math.round((progressData.correctSolutions / progressData.totalProblems) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Longest Streak</span>
                  <span className="font-medium" data-testid="text-longest-streak">
                    {progressData.longestStreak} days
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">This Month</span>
                  <span className="font-medium">23 problems</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Rank</span>
                  <span className="font-medium text-blue-600">#1,247</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}