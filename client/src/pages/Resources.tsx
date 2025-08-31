import { useState } from "react";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Play, 
  BookOpen, 
  Code, 
  ExternalLink,
  Star,
  Clock,
  User,
  Filter,
  Heart
} from "lucide-react";

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Enhanced learning resources with real YouTube links
  const learningResources = [
    {
      id: 1,
      title: "Two Pointers Technique Explained",
      type: "video",
      category: "algorithms",
      difficulty: "Easy",
      duration: "18 min",
      author: "NeetCode",
      url: "https://www.youtube.com/watch?v=jzZsG8n2R9A",
      description: "Learn the two pointers technique with clear examples and practice problems.",
      rating: 4.9,
      views: "245K"
    },
    {
      id: 2,
      title: "Binary Search Algorithm",
      type: "video", 
      category: "algorithms",
      difficulty: "Medium",
      duration: "25 min",
      author: "Abdul Bari",
      url: "https://www.youtube.com/watch?v=j5uXyPJ0Pew",
      description: "Complete guide to binary search with implementation and complexity analysis.",
      rating: 4.8,
      views: "1.2M"
    },
    {
      id: 3,
      title: "Dynamic Programming Patterns",
      type: "video",
      category: "dynamic-programming",
      difficulty: "Hard", 
      duration: "45 min",
      author: "Back To Back SWE",
      url: "https://www.youtube.com/watch?v=oBt53YbR9Kk",
      description: "Master the most common dynamic programming patterns with real examples.",
      rating: 4.9,
      views: "892K"
    },
    {
      id: 4,
      title: "Graph Algorithms: BFS & DFS",
      type: "video",
      category: "graphs",
      difficulty: "Medium",
      duration: "32 min", 
      author: "William Fiset",
      url: "https://www.youtube.com/watch?v=09_LlHjoEiY",
      description: "Learn breadth-first search and depth-first search with visualization.",
      rating: 4.7,
      views: "567K"
    },
    {
      id: 5,
      title: "Sliding Window Technique",
      type: "video",
      category: "algorithms", 
      difficulty: "Easy",
      duration: "22 min",
      author: "Tushar Roy",
      url: "https://www.youtube.com/watch?v=MK-NZ4hN7rs",
      description: "Master the sliding window pattern for array and string problems.",
      rating: 4.6,
      views: "423K"
    },
    {
      id: 6,
      title: "Linked List Algorithms",
      type: "video",
      category: "data-structures",
      difficulty: "Easy",
      duration: "28 min",
      author: "CS Dojo", 
      url: "https://www.youtube.com/watch?v=WwfhLC16bis",
      description: "Complete guide to linked list operations and common interview problems.",
      rating: 4.5,
      views: "756K"
    },
    {
      id: 7,
      title: "Tree Traversal Algorithms", 
      type: "video",
      category: "trees",
      difficulty: "Medium",
      duration: "35 min",
      author: "Tech With Tim",
      url: "https://www.youtube.com/watch?v=6oL-0TdVy28",
      description: "Learn all tree traversal methods: inorder, preorder, postorder, level order.",
      rating: 4.4,
      views: "334K"
    },
    {
      id: 8,
      title: "Hash Table Implementation",
      type: "video",
      category: "data-structures", 
      difficulty: "Medium",
      duration: "40 min",
      author: "Abdul Bari",
      url: "https://www.youtube.com/watch?v=shs0KM3wKv8",
      description: "Understand how hash tables work internally with collision handling.",
      rating: 4.8,
      views: "987K"
    },
    {
      id: 9,
      title: "Backtracking Algorithm Patterns",
      type: "video",
      category: "algorithms",
      difficulty: "Hard",
      duration: "50 min",
      author: "NeetCode", 
      url: "https://www.youtube.com/watch?v=Zq4upTEaQyM",
      description: "Master backtracking with N-Queens, Sudoku, and combination problems.",
      rating: 4.9,
      views: "445K"
    },
    {
      id: 10,
      title: "System Design Basics",
      type: "video", 
      category: "system-design",
      difficulty: "Hard",
      duration: "60 min",
      author: "Tushar Roy",
      url: "https://www.youtube.com/watch?v=UzLMhqg3_Wc",
      description: "Learn system design fundamentals for coding interviews.",
      rating: 4.7,
      views: "1.5M"
    }
  ];

  const categories = [
    { id: "all", name: "All Resources", count: learningResources.length },
    { id: "algorithms", name: "Algorithms", count: learningResources.filter(r => r.category === "algorithms").length },
    { id: "data-structures", name: "Data Structures", count: learningResources.filter(r => r.category === "data-structures").length },
    { id: "dynamic-programming", name: "Dynamic Programming", count: learningResources.filter(r => r.category === "dynamic-programming").length },
    { id: "graphs", name: "Graphs", count: learningResources.filter(r => r.category === "graphs").length },
    { id: "trees", name: "Trees", count: learningResources.filter(r => r.category === "trees").length },
    { id: "system-design", name: "System Design", count: learningResources.filter(r => r.category === "system-design").length }
  ];

  const filteredResources = learningResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

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

  const openResource = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Learning Resources</h1>
          <p className="text-slate-600">Curated high-quality content to master coding interview topics</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                    data-testid={`button-category-${category.id}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Featured Channels */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Channels</h3>
              <div className="space-y-3">
                {[
                  { name: "NeetCode", subscribers: "500K", specialty: "LeetCode Solutions" },
                  { name: "Abdul Bari", subscribers: "2.1M", specialty: "Algorithms" },
                  { name: "Back To Back SWE", subscribers: "300K", specialty: "System Design" },
                  { name: "William Fiset", subscribers: "150K", specialty: "Graph Algorithms" }
                ].map((channel, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 hover:bg-slate-50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                      <Play className="text-white" size={14} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-800">{channel.name}</p>
                      <p className="text-xs text-slate-600">{channel.subscribers} subscribers</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search */}
            <Card className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                <Input
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-resources"
                />
              </div>
            </Card>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResources.map((resource, index) => (
                <Card key={resource.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <Play className="text-red-600" size={14} />
                      </div>
                      <Badge className={getDifficultyColor(resource.difficulty)}>
                        {resource.difficulty}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-red-500">
                      <Heart size={16} />
                    </Button>
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 mb-2" data-testid={`text-resource-title-${index}`}>
                    {resource.title}
                  </h3>

                  <p className="text-slate-600 text-sm mb-4" data-testid={`text-resource-description-${index}`}>
                    {resource.description}
                  </p>

                  <div className="flex items-center space-x-4 text-sm text-slate-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <User size={12} />
                      <span data-testid={`text-resource-author-${index}`}>{resource.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={12} />
                      <span data-testid={`text-resource-duration-${index}`}>{resource.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="text-yellow-500" size={12} />
                      <span data-testid={`text-resource-rating-${index}`}>{resource.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500" data-testid={`text-resource-views-${index}`}>
                      {resource.views} views
                    </span>
                    <Button 
                      onClick={() => openResource(resource.url)}
                      className="bg-red-600 hover:bg-red-700 text-white"
                      size="sm"
                      data-testid={`button-watch-${index}`}
                    >
                      <Play size={14} className="mr-1" />
                      Watch
                      <ExternalLink size={12} className="ml-1" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {filteredResources.length === 0 && (
              <Card className="p-12">
                <div className="text-center">
                  <BookOpen className="mx-auto text-slate-400 mb-4" size={48} />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No resources found</h3>
                  <p className="text-slate-600">
                    Try adjusting your search terms or browse different categories.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}