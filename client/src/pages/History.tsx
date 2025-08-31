import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Clock,
  Code,
  TrendingUp,
  Eye,
  Download
} from "lucide-react";

export default function History() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDifficulty, setFilterDifficulty] = useState("all");

  // Mock history data - would come from API
  const submissionHistory = [
    {
      id: 1,
      problemName: "Two Sum",
      difficulty: "Easy",
      language: "Python",
      status: "correct",
      correctnessScore: 95,
      date: "2024-01-15T10:30:00Z",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      codeQuality: 88,
      attemptNumber: 1
    },
    {
      id: 2,
      problemName: "Merge Two Sorted Lists",
      difficulty: "Easy",
      language: "JavaScript",
      status: "correct",
      correctnessScore: 92,
      date: "2024-01-14T15:45:00Z",
      timeComplexity: "O(n+m)",
      spaceComplexity: "O(1)",
      codeQuality: 85,
      attemptNumber: 2
    },
    {
      id: 3,
      problemName: "Three Sum",
      difficulty: "Medium",
      language: "Python",
      status: "incorrect",
      correctnessScore: 45,
      date: "2024-01-13T09:15:00Z",
      timeComplexity: "O(n³)",
      spaceComplexity: "O(1)",
      codeQuality: 60,
      attemptNumber: 3
    },
    {
      id: 4,
      problemName: "Valid Parentheses",
      difficulty: "Easy",
      language: "Java",
      status: "partially_correct",
      correctnessScore: 75,
      date: "2024-01-12T14:20:00Z",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      codeQuality: 70,
      attemptNumber: 1
    },
    {
      id: 5,
      problemName: "Reverse Linked List",
      difficulty: "Easy",
      language: "Python",
      status: "correct",
      correctnessScore: 98,
      date: "2024-01-11T11:30:00Z",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      codeQuality: 95,
      attemptNumber: 1
    }
  ];

  const filteredSubmissions = submissionHistory.filter(submission => {
    const matchesSearch = submission.problemName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || submission.status === filterStatus;
    const matchesDifficulty = filterDifficulty === "all" || submission.difficulty.toLowerCase() === filterDifficulty;
    
    return matchesSearch && matchesStatus && matchesDifficulty;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "correct":
        return <CheckCircle className="text-green-600" size={16} />;
      case "partially_correct":
        return <AlertTriangle className="text-amber-600" size={16} />;
      default:
        return <XCircle className="text-red-600" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "correct":
        return "bg-green-100 text-green-800";
      case "partially_correct":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Submission History</h1>
          <p className="text-slate-600">Review your coding journey and track improvements</p>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
              <Input
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search"
              />
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger data-testid="select-status">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="correct">Correct</SelectItem>
                <SelectItem value="partially_correct">Partially Correct</SelectItem>
                <SelectItem value="incorrect">Incorrect</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
              <SelectTrigger data-testid="select-difficulty">
                <SelectValue placeholder="Filter by difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex items-center space-x-2">
              <Download size={16} />
              <span>Export History</span>
            </Button>
          </div>
        </Card>

        {/* Statistics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Code className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900" data-testid="text-total-submissions">
                  {submissionHistory.length}
                </p>
                <p className="text-sm text-slate-600">Total Submissions</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900" data-testid="text-correct-submissions">
                  {submissionHistory.filter(s => s.status === "correct").length}
                </p>
                <p className="text-sm text-slate-600">Correct Solutions</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900" data-testid="text-avg-score">
                  {Math.round(submissionHistory.reduce((sum, s) => sum + s.correctnessScore, 0) / submissionHistory.length)}%
                </p>
                <p className="text-sm text-slate-600">Avg Score</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Clock className="text-amber-600" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {Math.round(submissionHistory.reduce((sum, s) => sum + s.attemptNumber, 0) / submissionHistory.length * 10) / 10}
                </p>
                <p className="text-sm text-slate-600">Avg Attempts</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Submissions List */}
        <Card className="p-6">
          <div className="space-y-4">
            {filteredSubmissions.map((submission, index) => (
              <div 
                key={submission.id} 
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                data-testid={`submission-${index}`}
              >
                <div className="flex items-center space-x-4 flex-1">
                  {getStatusIcon(submission.status)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-slate-900" data-testid={`text-problem-name-${index}`}>
                        {submission.problemName}
                      </h3>
                      <Badge 
                        className={getDifficultyColor(submission.difficulty)}
                        data-testid={`badge-difficulty-${index}`}
                      >
                        {submission.difficulty}
                      </Badge>
                      <Badge 
                        className={getStatusColor(submission.status)}
                        data-testid={`badge-status-${index}`}
                      >
                        {submission.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-slate-600">
                      <span data-testid={`text-language-${index}`}>{submission.language}</span>
                      <span data-testid={`text-date-${index}`}>{formatDate(submission.date)}</span>
                      <span data-testid={`text-complexity-${index}`}>
                        {submission.timeComplexity} time, {submission.spaceComplexity} space
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-lg font-semibold text-slate-900" data-testid={`text-score-${index}`}>
                      {submission.correctnessScore}%
                    </p>
                    <p className="text-sm text-slate-600" data-testid={`text-quality-${index}`}>
                      Quality: {submission.codeQuality}%
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" data-testid={`button-view-${index}`}>
                    <Eye size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredSubmissions.length === 0 && (
            <div className="text-center py-12">
              <Code className="mx-auto text-slate-400 mb-4" size={48} />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No submissions found</h3>
              <p className="text-slate-600">
                {searchQuery || filterStatus !== "all" || filterDifficulty !== "all" 
                  ? "Try adjusting your filters to see more results."
                  : "Start solving problems to see your submission history here."}
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}