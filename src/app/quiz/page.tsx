"use client";

import { useState } from "react";
import Link from "next/link";

const questions = [
  {
    id: 1,
    question: "How many ways does the Claude Agent SDK provide to control tool usage?",
    options: ["2", "3", "4", "5"],
    correct: 2,
    explanation: "The SDK provides 4 complementary ways: Permission Modes, canUseTool callback, Hooks, and Permission rules (settings.json)",
  },
  {
    id: 2,
    question: "Which permission mode automatically approves all file edits?",
    options: ["default", "plan", "acceptEdits", "bypassPermissions"],
    correct: 2,
    explanation: "The 'acceptEdits' mode auto-approves file edits and filesystem operations (mkdir, touch, rm, mv, cp) while other tools still require normal permissions.",
  },
  {
    id: 3,
    question: "What is checked FIRST in the permission flow when a tool is requested?",
    options: ["Permission Mode", "canUseTool callback", "PreToolUse Hook", "Deny Rules"],
    correct: 2,
    explanation: "The PreToolUse Hook executes first and can Allow, Deny, Ask, or Continue. Only after it returns 'Continue' do the deny/allow rules get checked.",
  },
  {
    id: 4,
    question: "When does the canUseTool callback fire?",
    options: [
      "On every tool request",
      "Only when hooks and rules don't cover it",
      "Before the PreToolUse hook",
      "Only in bypassPermissions mode"
    ],
    correct: 1,
    explanation: "canUseTool fires whenever Claude Code would show a permission prompt - i.e., when hooks and permission rules don't cover the case and it's not in a mode that auto-approves.",
  },
  {
    id: 5,
    question: "In bypassPermissions mode, what can STILL block a tool from executing?",
    options: [
      "Nothing - all tools run freely",
      "Deny rules and Hooks",
      "Only the canUseTool callback",
      "Only Allow rules"
    ],
    correct: 1,
    explanation: "Even in bypassPermissions mode, Hooks still execute and can block operations. Explicit deny rules also override all permission modes.",
  },
  {
    id: 6,
    question: "What are the possible return values from a PreToolUse Hook?",
    options: [
      "true or false",
      "allow or deny",
      "Allow, Deny, Ask, or Continue",
      "Approve, Reject, or Pending"
    ],
    correct: 2,
    explanation: "PreToolUse hooks can return Allow (execute immediately), Deny (block it), Ask (defer to canUseTool callback), or Continue (proceed to check rules).",
  },
  {
    id: 7,
    question: "In what order are permission rules checked after hooks return 'Continue'?",
    options: [
      "Allow → Deny → Ask",
      "Ask → Allow → Deny",
      "Deny → Allow → Ask",
      "Allow → Ask → Deny"
    ],
    correct: 2,
    explanation: "Rules are checked in order: Deny rules first (block if matched), then Allow rules (permit if matched), then Ask rules (prompt if matched). Deny takes priority!",
  },
  {
    id: 8,
    question: "How should multi-select answers be formatted when returning from canUseTool for AskUserQuestion?",
    options: [
      "As an array: [\"Auth\", \"Caching\"]",
      "As a comma-separated string: \"Auth, Caching\"",
      "As a JSON object: {selected: [\"Auth\", \"Caching\"]}",
      "As separate keys: {answer1: \"Auth\", answer2: \"Caching\"}"
    ],
    correct: 1,
    explanation: "Multi-select answers should be returned as comma-separated strings (e.g., \"Authentication, Caching\") in the answers record.",
  },
  {
    id: 9,
    question: "How do you change permission modes dynamically during a conversation?",
    options: [
      "Call query() again with a new permissionMode",
      "Use q.setPermissionMode() on a streaming session",
      "Modify options.permissionMode directly",
      "Dynamic mode changes are not supported"
    ],
    correct: 1,
    explanation: "You can call setPermissionMode() on a streaming query object to change modes mid-conversation. This is only available for streaming sessions, not regular query() calls.",
  },
  {
    id: 10,
    question: "When canUseTool returns { behavior: 'allow' }, what optional property lets you modify the tool's parameters before execution?",
    options: [
      "modifiedParams",
      "updatedInput",
      "newParameters",
      "inputOverride"
    ],
    correct: 1,
    explanation: "The 'updatedInput' property allows you to modify tool parameters before execution. This is powerful for sanitizing inputs, adding defaults, or transforming requests.",
  },
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const question = questions[currentQuestion];

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    if (selectedAnswer === question.correct) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  };

  const isCorrect = selectedAnswer === question.correct;

  if (quizComplete) {
    return (
      <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-8">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold mb-4">Quiz Complete!</h1>
          <p className="text-6xl font-bold mb-8 text-blue-400">{score}/{questions.length}</p>
          <p className="text-xl text-gray-400 mb-8">
            {score === 10 ? "Perfect! You're a permissions expert!" :
             score >= 8 ? "Great job! You know your stuff!" :
             score >= 6 ? "Good effort! Review the docs for the ones you missed." :
             "Keep studying! The docs are your friend."}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Permissions Quiz</h1>
            <p className="text-gray-400">Question {currentQuestion + 1} of {questions.length}</p>
          </div>
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Back
          </Link>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl mb-6">{question.question}</h2>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showResult && setSelectedAnswer(index)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  showResult
                    ? index === question.correct
                      ? "border-green-500 bg-green-500/20"
                      : index === selectedAnswer
                      ? "border-red-500 bg-red-500/20"
                      : "border-gray-700 bg-gray-700/50"
                    : selectedAnswer === index
                    ? "border-blue-500 bg-blue-500/20"
                    : "border-gray-700 hover:border-gray-500"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {showResult && (
          <div className={`p-4 rounded-lg mb-6 ${isCorrect ? "bg-green-500/20" : "bg-red-500/20"}`}>
            <p className="font-bold mb-2">{isCorrect ? "Correct!" : "Incorrect"}</p>
            <p className="text-gray-300">{question.explanation}</p>
          </div>
        )}

        <div className="flex gap-4">
          {!showResult ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
            >
              {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
            </button>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-8">
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
