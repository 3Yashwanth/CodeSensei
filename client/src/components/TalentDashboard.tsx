// components/TalentDashboard.tsx
import { useState, useEffect } from "react";
import { Brain, User, X, Filter, Search, ChevronDown, ChevronUp } from "lucide-react";
import SpatialAssessment from './SpatialAssessment';

interface Student {
  id: number;
  name: string;
  title: string;
  img: string;
  leetcodeScore: number;
  iqScore: number;
  commsScore: number;
  skills: string[];
  university: string;
  linkedin: string;
  leetcode: string;
  analysis: {
    problemSolving: number;
    consistency: number;
    communication: number;
    teamwork: number;
    leadership: number;
  };
  leetcodeProblems: {
    easy: number;
    medium: number;
    hard: number;
  };
}

interface AssessmentResults {
  candidateId: number;
  challenges: ChallengeResult[];
  overallScore: number;
  spatialIQ: number;
  algorithmicIntuition: number;
  completionTime: number;
}

interface ChallengeResult {
  challengeId: string;
  score: number;
  timeSpent: number;
  attempts: number;
  approach: string;
}

export default function TalentDashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    skills: [] as string[],
    leetcode: 50,
    comms: 5,
    university: [] as string[],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [showSpatialAssessment, setShowSpatialAssessment] = useState(false);
  const [spatialResults, setSpatialResults] = useState<AssessmentResults | null>(null);

  // Add spatial assessment handlers
  const handleSpatialAssessment = (student: Student) => {
    setSelectedStudent(student);
    setShowSpatialAssessment(true);
  };

  const handleAssessmentComplete = async (results: AssessmentResults) => {
    setSpatialResults(results);
    setShowSpatialAssessment(false);

    // Store results in backend
    try {
      await fetch('/api/spatial-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(results)
      });
    } catch (error) {
      console.error('Failed to save assessment results:', error);
    }
  };

  // Sample data
  useEffect(() => {
    const sampleStudents: Student[] = [
      {
        id: 1,
        name: "Alex Johnson",
        title: "CS Major, MIT",
        img: "https://randomuser.me/api/portraits/men/32.jpg",
        leetcodeScore: 92,
        iqScore: 88,
        commsScore: 8,
        skills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
        university: "MIT",
        linkedin: "#",
        leetcode: "#",
        analysis: {
          problemSolving: 95,
          consistency: 90,
          communication: 8,
          teamwork: 7,
          leadership: 6
        },
        leetcodeProblems: {
          easy: 120,
          medium: 85,
          hard: 30
        }
      },
      {
        id: 2,
        name: "Sofia Chen",
        title: "Software Eng, Stanford",
        img: "https://randomuser.me/api/portraits/women/44.jpg",
        leetcodeScore: 88,
        iqScore: 95,
        commsScore: 9,
        skills: ["JavaScript", "React", "Node.js", "AWS"],
        university: "Stanford",
        linkedin: "#",
        leetcode: "#",
        analysis: {
          problemSolving: 88,
          consistency: 85,
          communication: 9,
          teamwork: 8,
          leadership: 7
        },
        leetcodeProblems: {
          easy: 95,
          medium: 70,
          hard: 25
        }
      },
      {
        id: 3,
        name: "Marcus Brown",
        title: "Data Science, Waterloo",
        img: "https://randomuser.me/api/portraits/men/67.jpg",
        leetcodeScore: 75,
        iqScore: 82,
        commsScore: 6,
        skills: ["Java", "Python", "Data Analysis", "SQL"],
        university: "Waterloo",
        linkedin: "#",
        leetcode: "#",
        analysis: {
          problemSolving: 75,
          consistency: 70,
          communication: 6,
          teamwork: 8,
          leadership: 5
        },
        leetcodeProblems: {
          easy: 80,
          medium: 50,
          hard: 15
        }
      },
      {
        id: 4,
        name: "Zara Khan",
        title: "Full Stack Dev, MIT",
        img: "https://randomuser.me/api/portraits/women/68.jpg",
        leetcodeScore: 85,
        iqScore: 90,
        commsScore: 7,
        skills: ["JavaScript", "React", "Python", "Django"],
        university: "MIT",
        linkedin: "#",
        leetcode: "#",
        analysis: {
          problemSolving: 85,
          consistency: 80,
          communication: 7,
          teamwork: 9,
          leadership: 8
        },
        leetcodeProblems: {
          easy: 110,
          medium: 65,
          hard: 20
        }
      }
    ];
    
    setStudents(sampleStudents);
    setFilteredStudents(sampleStudents);
  }, []);

  // Filter students based on active filters and search
  useEffect(() => {
    const filtered = students.filter(student => {
      // Filter by skills
      const hasSkill = activeFilters.skills.length === 0 || 
        activeFilters.skills.some(skill => 
          student.skills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
        );
      
      // Filter by LeetCode score
      const hasLeetcode = student.leetcodeScore >= activeFilters.leetcode;
      
      // Filter by communication score
      const hasComms = student.commsScore >= activeFilters.comms;
      
      // Filter by university
      const hasUniversity = activeFilters.university.length === 0 || 
        activeFilters.university.includes(student.university);
      
      // Filter by search query
      const matchesSearch = searchQuery === "" || 
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
        student.university.toLowerCase().includes(searchQuery.toLowerCase());
      
      return hasSkill && hasLeetcode && hasComms && hasUniversity && matchesSearch;
    });
    
    setFilteredStudents(filtered);
  }, [activeFilters, students, searchQuery]);

  const toggleSkillFilter = (skill: string) => {
    setActiveFilters(prev => {
      if (prev.skills.includes(skill)) {
        return { ...prev, skills: prev.skills.filter(s => s !== skill) };
      } else {
        return { ...prev, skills: [...prev.skills, skill] };
      }
    });
  };

  const toggleUniversityFilter = (uni: string) => {
    setActiveFilters(prev => {
      if (prev.university.includes(uni)) {
        return { ...prev, university: prev.university.filter(u => u !== uni) };
      } else {
        return { ...prev, university: [...prev.university, uni] };
      }
    });
  };

  const resetFilters = () => {
    setActiveFilters({
      skills: [],
      leetcode: 50,
      comms: 5,
      university: []
    });
    setSearchQuery("");
  };

  const openStudentModal = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Talent hub- Hire The Best</h1>
          <p className="text-gray-600 mt-2">Find the best tech talent's from top universities</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold flex items-center">
                  <Filter className="mr-2" size={20} />
                  Filters
                </h2>
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="text-blue-600 flex items-center"
                >
                  {isFilterOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {isFilterOpen && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Python", "JavaScript", "React", "Java", "SQL", "AWS"].map(skill => (
                        <button
                          key={skill}
                          onClick={() => toggleSkillFilter(skill)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            activeFilters.skills.includes(skill) 
                              ? "bg-blue-600 text-white" 
                              : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">LeetCode Proficiency</h3>
                    <div className="flex items-center">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={activeFilters.leetcode}
                        onChange={(e) => setActiveFilters({...activeFilters, leetcode: parseInt(e.target.value)})}
                        className="w-full mr-2"
                      />
                      <span className="text-sm font-medium">{activeFilters.leetcode}+</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Communication Score</h3>
                    <div className="flex items-center">
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={activeFilters.comms}
                        onChange={(e) => setActiveFilters({...activeFilters, comms: parseInt(e.target.value)})}
                        className="w-full mr-2"
                      />
                      <span className="text-sm font-medium">{activeFilters.comms}+</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">University</h3>
                    <div className="space-y-2">
                      {["MIT", "Stanford", "Waterloo"].map(uni => (
                        <label key={uni} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={activeFilters.university.includes(uni)}
                            onChange={() => toggleUniversityFilter(uni)}
                            className="rounded text-blue-600 mr-2"
                          />
                          <span className="text-sm">{uni}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={resetFilters}
                    className="w-full py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for students by name, skill, or university..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Results Info */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">
                Showing {filteredStudents.length} of {students.length} students
              </span>
            </div>

            {/* Student Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents.map(student => (
                <div key={student.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-4 text-center">
                    <img
                      src={student.img}
                      alt={student.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="font-semibold text-lg">{student.name}</h3>
                    <p className="text-gray-600 text-sm">{student.title}</p>
                    
                    <div className="flex justify-between mt-4">
                      <div className="text-center">
                        <div className="font-bold text-blue-600">{student.leetcodeScore}</div>
                        <div className="text-xs text-gray-500">LeetCode</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-blue-600">{student.iqScore}</div>
                        <div className="text-xs text-gray-500">IQ</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-blue-600">{student.commsScore}/10</div>
                        <div className="text-xs text-gray-500">Communication</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap justify-center gap-1">
                      {student.skills.slice(0, 3).map(skill => (
                        <span key={skill} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                      {student.skills.length > 3 && (
                        <span className="text-xs text-gray-500">+{student.skills.length - 3} more</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 px-4 py-3 flex justify-between">
                    <a
                      href={student.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm font-medium"
                    >
                      LinkedIn
                    </a>
                    <a
                      href={student.leetcode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm font-medium"
                    >
                      LeetCode
                    </a>
                    <button
                      onClick={() => openStudentModal(student)}
                      className="text-blue-600 text-sm font-medium"
                    >
                      View Analysis
                    </button>
                    <button
                      onClick={() => handleSpatialAssessment(student)}
                      className="text-purple-600 text-sm font-medium"
                    >
                      Spatial Assessment
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredStudents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No students match your current filters.</p>
                <button 
                  onClick={resetFilters}
                  className="text-blue-600 font-medium mt-2"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Student Detail Modal */}
      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">{selectedStudent.name}'s Detailed Analysis</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 text-center">
                  <img
                    src={selectedStudent.img}
                    alt={selectedStudent.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-xl">{selectedStudent.name}</h3>
                  <p className="text-gray-600">{selectedStudent.title}</p>
                  
                  <div className="mt-4 space-y-2">
                    <a
                      href={selectedStudent.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 font-medium"
                    >
                      LinkedIn Profile
                    </a>
                    <a
                      href={selectedStudent.leetcode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 font-medium"
                    >
                      LeetCode Profile
                    </a>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Skills</h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {selectedStudent.skills.map(skill => (
                        <span key={skill} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h4 className="font-medium mb-4">LeetCode Analysis</h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600">{selectedStudent.leetcodeProblems.easy}</div>
                        <div className="text-sm text-gray-600">Easy Solved</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-yellow-600">{selectedStudent.leetcodeProblems.medium}</div>
                        <div className="text-sm text-gray-600">Medium Solved</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-600">{selectedStudent.leetcodeProblems.hard}</div>
                        <div className="text-sm text-gray-600">Hard Solved</div>
                      </div>
                    </div>
                  </div>

                  {/* Spatial Intelligence Results */}
                  {spatialResults && selectedStudent && spatialResults.candidateId === selectedStudent.id && (
                    <div className="bg-purple-50 p-4 rounded-lg mb-6">
                      <h4 className="font-medium mb-4 text-purple-900">Spatial Intelligence Results</h4>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-purple-600">{spatialResults.overallScore}</div>
                          <div className="text-sm text-gray-600">Overall Score</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-600">{spatialResults.spatialIQ}</div>
                          <div className="text-sm text-gray-600">Spatial IQ</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-600">{spatialResults.algorithmicIntuition}</div>
                          <div className="text-sm text-gray-600">Algorithmic Intuition</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mb-6">
                    <h4 className="font-medium mb-4">Skill Assessment</h4>
                    <div className="space-y-3">
                      {Object.entries(selectedStudent.analysis).map(([skill, score]) => (
                        <div key={skill}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium capitalize">
                              {skill.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <span className="text-sm font-medium">{score}/100</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${score}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium">
                      Save to Shortlist
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
                      Contact Candidate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spatial Assessment Modal */}
      {showSpatialAssessment && selectedStudent && (
        <SpatialAssessment
          student={selectedStudent}
          onComplete={handleAssessmentComplete}
          onClose={() => setShowSpatialAssessment(false)}
        />
      )}
    </div>
  );
}