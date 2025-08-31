// components/SpatialAssessment.tsx
import React, { useState, useEffect, useRef } from 'react';
import { X, Play, CheckCircle, Clock, Brain, Lightbulb, RotateCcw, ChevronRight } from 'lucide-react';

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

interface SpatialAssessmentProps {
  student: Student;
  onClose: () => void;
  onComplete: (results: AssessmentResults) => void;
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

// Challenge Types
interface Challenge {
  id: string;
  title: string;
  concept: string;
  description: string;
  type: 'pathfinding' | 'sorting' | 'graph' | 'dp';
  difficulty: 'easy' | 'medium' | 'hard';
}

const challenges: Challenge[] = [
  {
    id: 'dp-gems',
    title: 'Treasure Hunter',
    concept: 'Dynamic Programming',
    description: 'Collect maximum gems moving only right and down. Find the optimal path!',
    type: 'dp',
    difficulty: 'medium'
  },
  {
    id: 'graph-network',
    title: 'Network Optimizer',
    concept: 'Graph Algorithms',
    description: 'Connect all nodes with minimum cost. Avoid creating cycles!',
    type: 'graph',
    difficulty: 'medium'
  },
  {
    id: 'sort-warehouse',
    title: 'Warehouse Manager',
    concept: 'Sorting Algorithms',
    description: 'Organize packages by priority with limited moves. Think efficiently!',
    type: 'sorting',
    difficulty: 'easy'
  }
];

// Individual Challenge Components
const DPGemChallenge = ({ onComplete }: { onComplete: (score: number, time: number, attempts: number) => void }) => {
  const [grid, setGrid] = useState<number[][]>([]);
  const [path, setPath] = useState<[number, number][]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime] = useState(Date.now());
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Initialize 5x5 grid with random gem values
    const newGrid = Array(5).fill(null).map(() => 
      Array(5).fill(null).map(() => Math.floor(Math.random() * 10) + 1)
    );
    setGrid(newGrid);
  }, []);

  const addToPath = (row: number, col: number) => {
    if (isComplete) return;
    
    const lastPos = path[path.length - 1] || [0, 0];
    const [lastRow, lastCol] = lastPos;
    
    // Can only move right or down
    if ((row === lastRow && col === lastCol + 1) || (row === lastRow + 1 && col === lastCol) || path.length === 0) {
      const newPath = [...path, [row, col]];
      setPath(newPath);
      
      // Check if reached bottom-right
      if (row === 4 && col === 4) {
        const totalScore = newPath.reduce((sum, [r, c]) => sum + grid[r][c], 0);
        setScore(totalScore);
        setIsComplete(true);
        onComplete(totalScore, Date.now() - startTime, attempts + 1);
      }
    }
  };

  const resetChallenge = () => {
    setPath([]);
    setIsComplete(false);
    setAttempts(prev => prev + 1);
    setScore(0);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Current Score: <span className="font-bold text-blue-600">{score}</span>
        </div>
        <button
          onClick={resetChallenge}
          className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600"
        >
          <RotateCcw size={14} />
          <span>Reset</span>
        </button>
      </div>
      
      <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
        {grid.map((row, rowIndex) =>
          row.map((gem, colIndex) => {
            const isInPath = path.some(([r, c]) => r === rowIndex && c === colIndex);
            const isNext = path.length === 0 && rowIndex === 0 && colIndex === 0 ||
                          path.length > 0 && (
                            (rowIndex === path[path.length - 1][0] && colIndex === path[path.length - 1][1] + 1) ||
                            (rowIndex === path[path.length - 1][0] + 1 && colIndex === path[path.length - 1][1])
                          );
            
            return (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => addToPath(rowIndex, colIndex)}
                className={`w-12 h-12 rounded-lg font-bold text-sm transition-all ${
                  isInPath 
                    ? 'bg-blue-600 text-white transform scale-110' 
                    : isNext 
                      ? 'bg-blue-100 text-blue-800 hover:bg-blue-200 border-2 border-blue-400' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                disabled={isComplete}
              >
                {gem}
              </button>
            );
          })
        )}
      </div>
      
      {isComplete && (
        <div className="text-center space-y-2">
          <CheckCircle className="mx-auto text-green-600" size={32} />
          <p className="text-green-600 font-medium">Challenge Complete!</p>
          <p className="text-sm text-gray-600">Final Score: {score} gems</p>
        </div>
      )}
    </div>
  );
};

const GraphNetworkChallenge = ({ onComplete }: { onComplete: (score: number, time: number, attempts: number) => void }) => {
  const [nodes] = useState([
    { id: 'A', x: 100, y: 100 },
    { id: 'B', x: 300, y: 100 },
    { id: 'C', x: 200, y: 200 },
    { id: 'D', x: 100, y: 300 },
    { id: 'E', x: 300, y: 300 }
  ]);
  const [connections, setConnections] = useState<[string, string][]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime] = useState(Date.now());
  const [attempts, setAttempts] = useState(0);

  const connectionCosts = {
    'A-B': 5, 'A-C': 3, 'A-D': 4,
    'B-C': 2, 'B-E': 6,
    'C-D': 3, 'C-E': 4,
    'D-E': 2
  };

  const addConnection = (nodeId: string) => {
    if (!selectedNode) {
      setSelectedNode(nodeId);
    } else if (selectedNode !== nodeId) {
      const connection: [string, string] = selectedNode < nodeId ? [selectedNode, nodeId] : [nodeId, selectedNode];
      const connectionKey = `${connection[0]}-${connection[1]}`;
      
      if (connectionCosts[connectionKey as keyof typeof connectionCosts] && 
          !connections.some(([a, b]) => (a === connection[0] && b === connection[1]) || (a === connection[1] && b === connection[0]))) {
        const newConnections = [...connections, connection];
        setConnections(newConnections);
        
        // Check if all nodes are connected (minimum spanning tree)
        if (newConnections.length === 4) {
          const totalCost = newConnections.reduce((sum, [a, b]) => {
            const key = `${a}-${b}`;
            return sum + (connectionCosts[key as keyof typeof connectionCosts] || 0);
          }, 0);
          setIsComplete(true);
          onComplete(Math.max(0, 100 - totalCost), Date.now() - startTime, attempts + 1);
        }
      }
      setSelectedNode(null);
    }
  };

  const resetChallenge = () => {
    setConnections([]);
    setSelectedNode(null);
    setIsComplete(false);
    setAttempts(prev => prev + 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Connections: {connections.length}/4
        </div>
        <button
          onClick={resetChallenge}
          className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600"
        >
          <RotateCcw size={14} />
          <span>Reset</span>
        </button>
      </div>
      
      <div className="relative w-96 h-80 mx-auto border border-gray-300 rounded-lg bg-gray-50">
        <svg className="w-full h-full">
          {/* Draw connections */}
          {connections.map(([nodeA, nodeB], index) => {
            const nodeAPos = nodes.find(n => n.id === nodeA);
            const nodeBPos = nodes.find(n => n.id === nodeB);
            if (!nodeAPos || !nodeBPos) return null;
            
            return (
              <line
                key={index}
                x1={nodeAPos.x}
                y1={nodeAPos.y}
                x2={nodeBPos.x}
                y2={nodeBPos.y}
                stroke="#3b82f6"
                strokeWidth="3"
                className="animate-pulse"
              />
            );
          })}
          
          {/* Draw nodes */}
          {nodes.map(node => (
            <circle
              key={node.id}
              cx={node.x}
              cy={node.y}
              r="20"
              fill={selectedNode === node.id ? "#fbbf24" : "#3b82f6"}
              stroke="#1e40af"
              strokeWidth="2"
              className="cursor-pointer hover:fill-blue-400 transition-colors"
              onClick={() => addConnection(node.id)}
            />
          ))}
          
          {/* Node labels */}
          {nodes.map(node => (
            <text
              key={`label-${node.id}`}
              x={node.x}
              y={node.y + 5}
              textAnchor="middle"
              className="fill-white font-bold text-sm pointer-events-none"
            >
              {node.id}
            </text>
          ))}
        </svg>
      </div>
      
      {isComplete && (
        <div className="text-center space-y-2">
          <CheckCircle className="mx-auto text-green-600" size={32} />
          <p className="text-green-600 font-medium">Network Optimized!</p>
          <p className="text-sm text-gray-600">All nodes connected efficiently</p>
        </div>
      )}
    </div>
  );
};

const SortingWarehouseChallenge = ({ onComplete }: { onComplete: (score: number, time: number, attempts: number) => void }) => {
  const [packages, setPackages] = useState([3, 1, 4, 1, 5, 9, 2, 6, 5]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime] = useState(Date.now());
  const [attempts, setAttempts] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const swapPackages = (index1: number, index2: number) => {
    if (isComplete || index1 === index2) return;
    
    const newPackages = [...packages];
    [newPackages[index1], newPackages[index2]] = [newPackages[index2], newPackages[index1]];
    setPackages(newPackages);
    setMoves(prev => prev + 1);
    
    // Check if sorted
    const isSorted = newPackages.every((val, i) => i === 0 || newPackages[i - 1] <= val);
    if (isSorted) {
      setIsComplete(true);
      const efficiency = Math.max(0, 100 - moves * 5); // Penalty for excessive moves
      onComplete(efficiency, Date.now() - startTime, attempts + 1);
    }
  };

  const handlePackageClick = (index: number) => {
    if (selectedIndex === null) {
      setSelectedIndex(index);
    } else {
      swapPackages(selectedIndex, index);
      setSelectedIndex(null);
    }
  };

  const resetChallenge = () => {
    setPackages([3, 1, 4, 1, 5, 9, 2, 6, 5]);
    setMoves(0);
    setSelectedIndex(null);
    setIsComplete(false);
    setAttempts(prev => prev + 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Moves: <span className="font-bold text-blue-600">{moves}</span>
        </div>
        <button
          onClick={resetChallenge}
          className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600"
        >
          <RotateCcw size={14} />
          <span>Reset</span>
        </button>
      </div>
      
      <div className="flex justify-center space-x-2">
        {packages.map((value, index) => (
          <button
            key={index}
            onClick={() => handlePackageClick(index)}
            className={`w-12 h-16 rounded-lg font-bold text-white transition-all transform ${
              selectedIndex === index
                ? 'bg-yellow-500 scale-110 shadow-lg'
                : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
            }`}
            disabled={isComplete}
          >
            {value}
          </button>
        ))}
      </div>
      
      <div className="text-center text-sm text-gray-600">
        Click two packages to swap them. Sort in ascending order!
      </div>
      
      {isComplete && (
        <div className="text-center space-y-2">
          <CheckCircle className="mx-auto text-green-600" size={32} />
          <p className="text-green-600 font-medium">Warehouse Sorted!</p>
          <p className="text-sm text-gray-600">Completed in {moves} moves</p>
        </div>
      )}
    </div>
  );
};

export default function SpatialAssessment({ student, onClose, onComplete }: SpatialAssessmentProps) {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [challengeResults, setChallengeResults] = useState<ChallengeResult[]>([]);
  const [assessmentStartTime] = useState(Date.now());
  const [isAssessmentComplete, setIsAssessmentComplete] = useState(false);

  const currentChallenge = challenges[currentChallengeIndex];

  const handleChallengeComplete = (score: number, timeSpent: number, attempts: number) => {
    const result: ChallengeResult = {
      challengeId: currentChallenge.id,
      score,
      timeSpent,
      attempts,
      approach: score > 80 ? 'Optimal' : score > 60 ? 'Good' : 'Needs Improvement'
    };

    const newResults = [...challengeResults, result];
    setChallengeResults(newResults);

    // Move to next challenge or complete assessment
    if (currentChallengeIndex < challenges.length - 1) {
      setTimeout(() => {
        setCurrentChallengeIndex(prev => prev + 1);
      }, 2000);
    } else {
      // Calculate final scores
      const avgScore = newResults.reduce((sum, r) => sum + r.score, 0) / newResults.length;
      const totalTime = Date.now() - assessmentStartTime;
      const spatialIQ = Math.round(avgScore + (avgScore > 70 ? 10 : 0));
      const algorithmicIntuition = Math.round((avgScore + (100 - (newResults.reduce((sum, r) => sum + r.attempts, 0) * 5))) / 2);

      const finalResults: AssessmentResults = {
        candidateId: student.id,
        challenges: newResults,
        overallScore: Math.round(avgScore),
        spatialIQ,
        algorithmicIntuition,
        completionTime: totalTime
      };

      setIsAssessmentComplete(true);
      setTimeout(() => onComplete(finalResults), 2000);
    }
  };

  const renderCurrentChallenge = () => {
    switch (currentChallenge.type) {
      case 'dp':
        return <DPGemChallenge onComplete={handleChallengeComplete} />;
      case 'graph':
        return <GraphNetworkChallenge onComplete={handleChallengeComplete} />;
      case 'sorting':
        return <SortingWarehouseChallenge onComplete={handleChallengeComplete} />;
      default:
        return <div>Challenge not implemented</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center">
                <Brain className="mr-2 text-blue-600" size={28} />
                Spatial Intelligence Assessment
              </h2>
              <p className="text-gray-600 mt-1">Testing {student.name}'s algorithmic intuition</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{currentChallengeIndex + 1} of {challenges.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${((currentChallengeIndex + (challengeResults.length > currentChallengeIndex ? 1 : 0)) / challenges.length) * 100}%` }}
              />
            </div>
          </div>

          {!isAssessmentComplete ? (
            <>
              {/* Current Challenge Info */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-blue-900">{currentChallenge.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    currentChallenge.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    currentChallenge.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {currentChallenge.difficulty}
                  </span>
                </div>
                <p className="text-blue-800 text-sm mb-2">
                  <span className="font-medium">Concept:</span> {currentChallenge.concept}
                </p>
                <p className="text-blue-700">{currentChallenge.description}</p>
              </div>

              {/* Challenge Component */}
              <div className="bg-gray-50 rounded-lg p-6">
                {renderCurrentChallenge()}
              </div>
            </>
          ) : (
            /* Assessment Complete */
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="text-green-600" size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-green-600">Assessment Complete!</h3>
                <p className="text-gray-600">Generating detailed analysis for {student.name}...</p>
              </div>
              <div className="animate-pulse flex justify-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}