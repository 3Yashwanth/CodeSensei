// Home.tsx - CORRECTED
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "@/components/Header";
import CodeEditor from "@/components/CodeEditor";
import AnalysisResults from "@/components/AnalysisResults";
import LearningPlan from "@/components/LearningPlan";
import Chatbot from "@/components/Chatbot";
import PhoneCall from "@/components/PhoneCall";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { AnalysisResponse } from "@/lib/types";
import { Loader2, Brain } from "lucide-react";

// ElevenLabs Widget Component - KEEP ONLY THIS
function ElevenLabsWidget() {
  useEffect(() => {
    if (!document.querySelector('script[src*="elevenlabs.io"]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;
      script.type = 'text/javascript';
      document.body.appendChild(script);

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, []);

  return <elevenlabs-convai agent-id="agent_4301k3vc1a01ekxtfbk04x1s5qn2"></elevenlabs-convai>;
}

export default function Home() {
  const [analysisData, setAnalysisData] = useState<AnalysisResponse | null>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isPhoneCallOpen, setIsPhoneCallOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const analyzeCodeMutation = useMutation({
    mutationFn: async (codeData: { problemName: string; language: string; code: string }) => {
      const response = await apiRequest("POST", "/api/code/submit", codeData);
      return response.json() as Promise<AnalysisResponse>;
    },
    onSuccess: (data) => {
      setAnalysisData(data);
      toast({
        title: "Analysis Complete",
        description: "Your code has been successfully analyzed!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/problems"] });
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze code. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleCodeSubmit = (codeData: { problemName: string; language: string; code: string }) => {
    analyzeCodeMutation.mutate(codeData);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header 
        chatbot={{ 
          isOpen: isChatbotOpen, 
          onToggle: () => setIsChatbotOpen(!isChatbotOpen) 
        }}
        onPhoneCall={() => setIsPhoneCallOpen(true)}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Brain className="text-white" size={20} />
                </div>
                <div className="flex-1">
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <p className="text-slate-700 leading-relaxed">
                      <span className="font-semibold text-blue-800">AI Coach:</span> 
                      "Hello! I'm your personalized coding mentor. Let me analyze your recent code submissions to create a tailored learning plan. Upload your solution below to get started!"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Upload Section */}
            <CodeEditor 
              onSubmit={handleCodeSubmit}
              isAnalyzing={analyzeCodeMutation.isPending}
            />

            {/* Analysis Results */}
            {analysisData && <AnalysisResults analysisData={analysisData} />}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {analysisData ? (
              <LearningPlan analysisData={analysisData} />
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
                <Brain className="mx-auto text-slate-400 mb-4" size={48} />
                <h3 className="font-semibold text-slate-900 mb-2">Ready to Analyze</h3>
                <p className="text-slate-600 text-sm">
                  Submit your code to get personalized analysis and learning recommendations.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {analyzeCodeMutation.isPending && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-testid="loading-overlay">
          <div className="bg-white rounded-xl p-8 flex flex-col items-center space-y-4">
            <Loader2 className="w-16 h-16 animate-spin text-blue-600" />
            <p className="text-slate-700 font-medium">Analyzing your code...</p>
            <p className="text-slate-500 text-sm">This may take a few seconds</p>
          </div>
        </div>
      )}
      
      <Chatbot 
        isOpen={isChatbotOpen} 
        onClose={() => setIsChatbotOpen(false)} 
      />
      
      <PhoneCall 
        isOpen={isPhoneCallOpen} 
        onClose={() => setIsPhoneCallOpen(false)} 
      />
      
      {/* REMOVE THE DUPLICATE LINES AND KEEP ONLY THIS */}
      <ElevenLabsWidget />
    </div>
  );
}