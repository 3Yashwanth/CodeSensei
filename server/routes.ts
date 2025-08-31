import dotenv from "dotenv";
dotenv.config();
console.log("DEBUG: OPENAI_API_KEY loaded?", process.env.OPENAI_API_KEY?.slice(0, 5));

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCodeSubmissionSchema } from "@shared/schema";
import { analyzeCode, generateLearningPlan } from "./services/aiAnalyzer";
import { OpenAI } from "openai";
// Add this to your existing routes.ts
import twilioRoutes from "./services/twilio";  

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Submit code for analysis
  app.use(twilioRoutes);

  app.post("/api/code/submit", async (req, res) => {
    try {
      const validatedData = insertCodeSubmissionSchema.parse(req.body);
      
      // Create code submission
      const submission = await storage.createCodeSubmission(validatedData);
      
      // Analyze the code using AI
      const analysisResult = await analyzeCode(
        validatedData.code,
        validatedData.language,
        validatedData.problemName
      );
      
      // Store analysis results
      const analysis = await storage.createCodeAnalysis({
        submissionId: submission.id,
        ...analysisResult
      });
      
      // Generate learning plan
      const learningPlanResult = await generateLearningPlan(
        validatedData.code,
        validatedData.language,
        validatedData.problemName,
        analysisResult
      );
      
      // Store learning plan
      const learningPlan = await storage.createLearningPlan({
        analysisId: analysis.id,
        ...learningPlanResult
      });
      
      res.json({
        submission,
        analysis,
        learningPlan
      });
    } catch (error) {
      console.error("Code submission error:", error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to analyze code" 
      });
    }
  });
  
  // Get analysis results by submission ID
  app.get("/api/analysis/:submissionId", async (req, res) => {
    try {
      const { submissionId } = req.params;
      
      const submission = await storage.getCodeSubmission(submissionId);
      if (!submission) {
        return res.status(404).json({ message: "Submission not found" });
      }
      
      const analysis = await storage.getCodeAnalysisBySubmissionId(submissionId);
      if (!analysis) {
        return res.status(404).json({ message: "Analysis not found" });
      }
      
      const learningPlan = await storage.getLearningPlanByAnalysisId(analysis.id);
      
      res.json({
        submission,
        analysis,
        learningPlan
      });
    } catch (error) {
      console.error("Get analysis error:", error);
      res.status(500).json({ 
        message: "Failed to retrieve analysis" 
      });
    }
  });

  // Get mock problems for dropdown (since we don't have a real LeetCode API)
  app.get("/api/problems", async (req, res) => {
    const problems = [
      { id: 1, name: "Two Sum", difficulty: "Easy" },
      { id: 15, name: "Three Sum", difficulty: "Medium" },
      { id: 20, name: "Valid Parentheses", difficulty: "Easy" },
      { id: 21, name: "Merge Two Sorted Lists", difficulty: "Easy" },
      { id: 53, name: "Maximum Subarray", difficulty: "Medium" },
      { id: 121, name: "Best Time to Buy and Sell Stock", difficulty: "Easy" },
      { id: 206, name: "Reverse Linked List", difficulty: "Easy" },
      { id: 238, name: "Product of Array Except Self", difficulty: "Medium" },
    ];
    
    res.json(problems);
  });

  // Chat endpoint for conversational AI
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, conversationHistory } = req.body;

      // Prepare conversation messages for OpenAI
      const messages: any[] = [
        {
          role: "system",
          content: `You are an AI coding coach specializing in Data Structures and Algorithms. 
          You help students understand complex concepts, debug code, and improve their problem-solving skills.
          Be supportive, encouraging, and explain concepts clearly with examples when needed.
          You can ask clarifying questions if the user's request is unclear.
          Keep your responses conversational and friendly but professional, like a faculty member.`
        },
        ...conversationHistory,
        { role: "user", content: message }
      ];

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // or "gpt-4" if you have access
        messages,
        max_tokens: 500,
        temperature: 0.7,
      });

      const response = completion.choices[0]?.message?.content || "I'm not sure how to respond to that.";

      res.status(200).json({ response });
    } catch (error) {
      console.error('Error with OpenAI API:', error);
      res.status(500).json({ error: 'Failed to get response from AI' });
    }
  });

  // SPATIAL ASSESSMENT ROUTES
  
  // Store spatial assessment results
  app.post("/api/spatial-assessment", async (req, res) => {
    try {
      const { candidateId, challenges, overallScore, spatialIQ, algorithmicIntuition, completionTime } = req.body;
      
      // For now, store in memory or add to your existing storage system
      console.log("Spatial assessment completed:", { candidateId, overallScore, spatialIQ, algorithmicIntuition });
      
      res.json({ success: true, candidateId, overallScore, spatialIQ, algorithmicIntuition });
    } catch (error) {
      console.error("Spatial assessment error:", error);
      res.status(500).json({ 
        message: "Failed to save spatial assessment results" 
      });
    }
  });

  // Get spatial assessment results for a candidate
  app.get("/api/spatial-assessment/:candidateId", async (req, res) => {
    try {
      const { candidateId } = req.params;
      
      // Return mock data for now - replace with actual database query
      res.json({
        candidateId: parseInt(candidateId),
        overallScore: 85,
        spatialIQ: 88,
        algorithmicIntuition: 82,
        completionTime: 180000
      });
    } catch (error) {
      console.error("Get spatial assessment error:", error);
      res.status(500).json({ 
        message: "Failed to retrieve spatial assessment" 
      });
    }
  });

  // Add the make-call endpoint
  app.post("/api/make-call", async (req, res) => {
    try {
      const { phone_number, context } = req.body;
      
      // Replace this with actual Inyya.ai API call
      console.log("Making call to:", phone_number, "Context:", context);
      
      // Simulate API call - replace with actual Inyya.ai integration
      const response = await fetch('https://api.inyya.ai/v1/calls/make', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer your-agent-id-here'
        },
        body: JSON.stringify({
          phone_number,
          agent_id: 'your-agent-id',
          context
        })
      });
      
      //Simulate success for now
      res.json({ 
        success: true, 
        message: "Call initiated successfully",
        // Add actual response data from Inyya.ai here
      });
      
    } catch (error) {
      console.error("Call error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to initiate call" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}