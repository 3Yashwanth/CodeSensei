// components/Header.tsx
import { useEffect, useState } from "react";
import { Brain, User, Phone } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

interface ChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface HeaderProps {
  chatbot?: ChatbotProps;
  onPhoneCall?: () => void; // Add this prop
}

/** Small, self-contained waving robot icon with 5s speech bubble */
function WavingBotIcon() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    let timeoutId: number | undefined;
    const intervalId = window.setInterval(() => {
      setShowPrompt(true);
      timeoutId = window.setTimeout(() => setShowPrompt(false), 1600);
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="relative w-5 h-5">
      {/* <style>{`
        @keyframes waveCycle {
          0% { transform: rotate(0deg); }
          3% { transform: rotate(-35deg); }
          6% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
        .robot-arm {
          transform-origin: 52px 22px;
          animation: waveCycle 5s ease-in-out infinite;
        }
      `}</style> */}

      <svg viewBox="0 0 80 60" className="w-5 h-5" aria-hidden>
        {/* Body */}
        <rect
          x="20"
          y="28"
          width="40"
          height="24"
          rx="6"
          className="fill-current opacity-20"
        />
        {/* Head */}
        <rect
          x="24"
          y="8"
          width="32"
          height="22"
          rx="6"
          className="fill-current"
        />
        {/* Eyes */}
        <circle cx="34" cy="19" r="3" className="fill-white" />
        <circle cx="46" cy="19" r="3" className="fill-white" />
        {/* Antenna */}
        <line
          x1="40"
          y1="4"
          x2="40"
          y2="8"
          className="stroke-current"
          strokeWidth="2"
        />
        <circle cx="40" cy="3" r="2" className="fill-current" />
        {/* Left arm */}
        <rect
          x="16"
          y="28"
          width="6"
          height="16"
          rx="3"
          className="fill-current opacity-70"
        />
        {/* Right arm (animated) */}
        <g className="robot-arm">
          <rect
            x="58"
            y="12"
            width="6"
            height="16"
            rx="3"
            className="fill-current"
            transform="rotate(0 52 22) translate(-6,0)"
          />
        </g>
      </svg>

      {showPrompt && (
        <div
          className="absolute -top-2 left-6 bg-white text-blue-700 text-[10px] font-medium px-2 py-1 rounded-md shadow-md border border-blue-100 whitespace-nowrap pointer-events-none"
          aria-live="polite"
        >
          Ask me anything — I'm your assistant!
        </div>
      )}
    </div>
  );
}

export default function Header({ chatbot, onPhoneCall }: HeaderProps) {
  const [location] = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  CodeSensei
                </h1>
                <p className="text-xs text-slate-500">
                  Intelligent Code Analysis
                </p>
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {/* Navigation Links */}
            <Link href="/dashboard">
              <span
                className={`cursor-pointer transition-colors ${
                  isActive("/dashboard")
                    ? "text-blue-600 font-medium"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                data-testid="nav-dashboard"
              >
                Dashboard
              </span>
            </Link>
            <Link href="/history">
              <span
                className={`cursor-pointer transition-colors ${
                  isActive("/history")
                    ? "text-blue-600 font-medium"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                data-testid="nav-history"
              >
                History
              </span>
            </Link>
            <Link href="/resources">
              <span
                className={`cursor-pointer transition-colors ${
                  isActive("/resources")
                    ? "text-blue-600 font-medium"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                data-testid="nav-resources"
              >
                Resources
              </span>
            </Link>
            
            {/* Talent Hub Link - ADDED PROPERLY */}
            <Link href="/talent">
              <span
                className={`cursor-pointer transition-colors ${
                  isActive("/talent")
                    ? "text-blue-600 font-medium"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                data-testid="nav-talent"
              >
                Talent Hub
              </span>
            </Link>

            <div className="flex items-center space-x-3">
              {/* Phone Call Button */}
              {onPhoneCall && (
                <Button
                  onClick={onPhoneCall}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700"
                  size="sm"
                >
                  <Phone size={16} />
                  <span>Call Me</span>
                </Button>
              )}

              {/* Chatbot Button */}
              {chatbot && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={chatbot.onToggle}
                  className="text-slate-600 hover:text-blue-600 relative"
                  data-testid="button-chatbot"
                  aria-label="Open chatbot"
                >
                  <WavingBotIcon />
                </Button>
              )}

              {/* User Profile */}
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="text-blue-600" size={16} />
              </div>
              <span
                className="text-sm font-medium text-slate-700"
                data-testid="text-username"
              >
                Yashwanth
              </span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}