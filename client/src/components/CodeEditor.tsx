import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Upload, Copy, Download } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Problem } from "@/lib/types";

interface CodeEditorProps {
  onSubmit: (data: { problemName: string; language: string; code: string }) => void;
  isAnalyzing: boolean;
}

export default function CodeEditor({ onSubmit, isAnalyzing }: CodeEditorProps) {
  const [selectedProblem, setSelectedProblem] = useState("");
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(`def twoSum(nums, target):
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []`);

  const { data: problems, isLoading: problemsLoading } = useQuery<Problem[]>({
    queryKey: ["/api/problems"],
  });

  const handleSubmit = () => {
    if (!selectedProblem || !code.trim()) return;
    
    onSubmit({
      problemName: selectedProblem,
      language,
      code: code.trim()
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt,.py,.js,.java,.cpp,.c,.ts';
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setCode(content);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Upload Your Code Solution</h2>
        <div className="flex items-center space-x-2">
          <Upload className="text-blue-600" size={16} />
          <span className="text-sm text-slate-600">Supports Python, JavaScript, Java</span>
        </div>
      </div>

      {/* Problem Selection */}
      <div className="mb-4">
        <Label htmlFor="problem-select" className="block text-sm font-medium text-slate-700 mb-2">
          Select Problem
        </Label>
        <Select value={selectedProblem} onValueChange={setSelectedProblem} disabled={problemsLoading}>
          <SelectTrigger data-testid="select-problem">
            <SelectValue placeholder="Choose a problem..." />
          </SelectTrigger>
          <SelectContent>
            {problems?.map((problem) => (
              <SelectItem key={problem.id} value={problem.name}>
                {problem.name} (LeetCode #{problem.id})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Language Selection */}
      <div className="mb-4">
        <Label className="block text-sm font-medium text-slate-700 mb-2">Programming Language</Label>
        <div className="flex space-x-3">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="language"
              value="python"
              checked={language === "python"}
              onChange={(e) => setLanguage(e.target.value)}
              className="text-blue-600 focus:ring-blue-500"
              data-testid="radio-python"
            />
            <span className="text-sm text-slate-700">Python</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="language"
              value="javascript"
              checked={language === "javascript"}
              onChange={(e) => setLanguage(e.target.value)}
              className="text-blue-600 focus:ring-blue-500"
              data-testid="radio-javascript"
            />
            <span className="text-sm text-slate-700">JavaScript</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="language"
              value="java"
              checked={language === "java"}
              onChange={(e) => setLanguage(e.target.value)}
              className="text-blue-600 focus:ring-blue-500"
              data-testid="radio-java"
            />
            <span className="text-sm text-slate-700">Java</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="language"
              value="C++"
              checked={language === "C++"}
              onChange={(e) => setLanguage(e.target.value)}
              className="text-blue-600 focus:ring-blue-500"
              data-testid="radio-javascript"
            />
            <span className="text-sm text-slate-700">C++</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="language"
              value="C"
              checked={language === "c"}
              onChange={(e) => setLanguage(e.target.value)}
              className="text-blue-600 focus:ring-blue-500"
              data-testid="radio-javascript"
            />
            <span className="text-sm text-slate-700">C</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="language"
              value="Rust"
              checked={language === "Rust"}
              onChange={(e) => setLanguage(e.target.value)}
              className="text-blue-600 focus:ring-blue-500"
              data-testid="radio-javascript"
            />
            <span className="text-sm text-slate-700">Rust</span>
          </label>
        </div>
      </div>

      {/* Code Editor */}
      <div className="mb-4">
        <Label className="block text-sm font-medium text-slate-700 mb-2">Your Solution</Label>
        <div className="relative">
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 font-mono text-sm bg-slate-900 text-green-400 resize-none border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Paste your code here..."
            data-testid="textarea-code"
          />
          <div className="absolute top-2 right-2 flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="text-xs bg-slate-700 text-slate-300 hover:bg-slate-600"
              data-testid="button-copy"
            >
              <Copy size={12} className="mr-1" />
              Copy
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleImport}
              className="text-xs bg-slate-700 text-slate-300 hover:bg-slate-600"
              data-testid="button-import"
            >
              <Download size={12} className="mr-1" />
              Import
            </Button>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={!selectedProblem || !code.trim() || isAnalyzing}
        className="w-full bg-blue-600 text-white py-3 px-4 hover:bg-blue-700 font-medium"
        data-testid="button-analyze"
      >
        <Brain className="mr-2" size={16} />
        {isAnalyzing ? "Analyzing..." : "Analyze My Code"}
      </Button>
    </div>
  );
}
