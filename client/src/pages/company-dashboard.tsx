import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import type { StudentProfile } from "@shared/schema";

type CandidateWithUser = StudentProfile & { firstName: string | null; lastName: string | null; email: string | null };

export default function CompanyDashboard() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [skillFilter, setSkillFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");

  const { data: candidates = [], isLoading } = useQuery<CandidateWithUser[]>({
    queryKey: ["/api/company/candidates"],
  });

  const handleBackToHome = () => {
    setLocation("/");
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch = candidate.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.skills?.some((skill: string) => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSkill = skillFilter === "all" || 
                        candidate.skills?.some((skill: string) => skill.toLowerCase().includes(skillFilter.toLowerCase()));
    
    return matchesSearch && matchesSkill;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" data-testid="page-company-dashboard">
      {/* Dashboard Header */}
      <header className="border-b border-border p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Top Candidates</h1>
              <p className="text-muted-foreground">Discover talented developers ready for your team</p>
            </div>
            <Button 
              onClick={handleBackToHome}
              variant="outline"
              className="px-4 py-2 bg-muted hover:bg-accent rounded-lg transition-colors"
              data-testid="button-back-home"
            >
              <i className="fas fa-home mr-2"></i>
              Back to Home
            </Button>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input 
                type="text" 
                placeholder="Search candidates..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                data-testid="input-search-candidates"
              />
            </div>
            <div className="flex gap-2">
              <Select value={skillFilter} onValueChange={setSkillFilter}>
                <SelectTrigger className="w-48" data-testid="select-skills">
                  <SelectValue placeholder="All Skills" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Skills</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                </SelectContent>
              </Select>
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-48" data-testid="select-level">
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="junior">Junior</SelectItem>
                  <SelectItem value="mid">Mid-level</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Ranking Criteria Legend */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
              <i className="fas fa-calendar-check text-primary text-xl mb-2"></i>
              <div className="font-semibold">Consistency</div>
              <div className="text-sm text-muted-foreground">Daily practice habit</div>
            </div>
            <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 text-center">
              <i className="fas fa-puzzle-piece text-secondary text-xl mb-2"></i>
              <div className="font-semibold">Problem Solving</div>
              <div className="text-sm text-muted-foreground">Algorithm efficiency</div>
            </div>
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-center">
              <i className="fas fa-trending-up text-accent-foreground text-xl mb-2"></i>
              <div className="font-semibold">Growth Rate</div>
              <div className="text-sm text-muted-foreground">Learning velocity</div>
            </div>
            <div className="bg-muted border border-border rounded-lg p-4 text-center">
              <i className="fas fa-code text-foreground text-xl mb-2"></i>
              <div className="font-semibold">Code Quality</div>
              <div className="text-sm text-muted-foreground">Clean, readable code</div>
            </div>
          </div>
        </div>
      </header>

      {/* Candidate Cards */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="space-y-6">
          {filteredCandidates.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <i className="fas fa-users text-4xl mb-4 opacity-50"></i>
              <p>No candidates found matching your criteria.</p>
            </div>
          ) : (
            filteredCandidates.map((candidate, index: number) => (
              <Card 
                key={candidate.id} 
                className={`glass-effect rounded-xl hover:scale-[1.02] transition-transform duration-300 border-l-4 ${
                  index === 0 ? 'border-primary' : index === 1 ? 'border-secondary' : 'border-accent'
                }`}
                data-testid={`candidate-card-${index}`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Candidate Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl ${
                            index === 0 ? 'bg-primary/20 text-primary' : 
                            index === 1 ? 'bg-secondary/20 text-secondary' : 
                            'bg-accent/20 text-accent-foreground'
                          }`}>
                            #{index + 1}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold" data-testid={`text-candidate-name-${index}`}>
                              {candidate.firstName} {candidate.lastName}
                            </h3>
                            <p className="text-muted-foreground">Full Stack Developer</p>
                            <div className="flex items-center mt-1 space-x-4">
                              <span className="text-sm text-muted-foreground" data-testid={`text-candidate-location-${index}`}>
                                📍 {candidate.location || "Remote"}
                              </span>
                              <span className="text-sm text-muted-foreground" data-testid={`text-candidate-university-${index}`}>
                                🎓 {candidate.university || "Various"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${
                            index === 0 ? 'text-primary' : 
                            index === 1 ? 'text-secondary' : 
                            'text-accent-foreground'
                          }`} data-testid={`text-candidate-score-${index}`}>
                            {parseFloat(candidate.finalScore || "0").toFixed(1)}
                          </div>
                          <div className="text-sm text-muted-foreground">Final Score</div>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="mb-4">
                        <div className="text-sm font-medium mb-2">Key Skills</div>
                        <div className="flex flex-wrap gap-2">
                          {candidate.skills?.map((skill: string, skillIndex: number) => (
                            <span 
                              key={skillIndex}
                              className={`px-3 py-1 text-sm rounded-full ${
                                skillIndex % 4 === 0 ? 'bg-primary/20 text-primary' :
                                skillIndex % 4 === 1 ? 'bg-secondary/20 text-secondary' :
                                skillIndex % 4 === 2 ? 'bg-accent/20 text-accent-foreground' :
                                'bg-muted text-muted-foreground'
                              }`}
                              data-testid={`skill-${index}-${skillIndex}`}
                            >
                              {skill}
                            </span>
                          )) || (
                            <span className="text-muted-foreground text-sm">No skills listed</span>
                          )}
                        </div>
                      </div>

                      {/* Scores Breakdown */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary" data-testid={`score-consistency-${index}`}>
                            {parseFloat(candidate.consistencyScore || "0").toFixed(0)}
                          </div>
                          <div className="text-xs text-muted-foreground">Consistency</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-secondary" data-testid={`score-problem-solving-${index}`}>
                            {parseFloat(candidate.problemSolvingScore || "0").toFixed(0)}
                          </div>
                          <div className="text-xs text-muted-foreground">Problem Solving</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-accent-foreground" data-testid={`score-growth-${index}`}>
                            {parseFloat(candidate.growthRate || "0").toFixed(0)}
                          </div>
                          <div className="text-xs text-muted-foreground">Growth Rate</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-foreground" data-testid={`score-code-quality-${index}`}>
                            {parseFloat(candidate.codeQualityScore || "0").toFixed(0)}
                          </div>
                          <div className="text-xs text-muted-foreground">Code Quality</div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-3 lg:w-48">
                      <Button 
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                        data-testid={`button-view-resume-${index}`}
                      >
                        <i className="fas fa-file-alt mr-2"></i>
                        View Resume
                      </Button>
                      <Button 
                        className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
                        data-testid={`button-linkedin-${index}`}
                      >
                        <i className="fab fa-linkedin mr-2"></i>
                        LinkedIn
                      </Button>
                      <Button 
                        variant="outline"
                        className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-accent transition-colors"
                        data-testid={`button-contact-${index}`}
                      >
                        <i className="fas fa-envelope mr-2"></i>
                        Contact
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}

          {/* Load More Button */}
          {candidates.length > 0 && (
            <div className="text-center mt-8">
              <Button 
                variant="outline"
                className="px-6 py-3 bg-muted hover:bg-accent rounded-lg transition-colors"
                data-testid="button-load-more"
              >
                <i className="fas fa-chevron-down mr-2"></i>
                Load More Candidates
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
