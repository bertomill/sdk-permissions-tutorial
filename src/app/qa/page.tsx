"use client";

import { useState } from "react";
import Link from "next/link";

const qaItems = [
  {
    question: "What's the difference between acceptEdits and bypassPermissions?",
    answer: "acceptEdits only auto-approves file operations (Edit, Write, mkdir, rm, etc.) while other tools still need permission. bypassPermissions auto-approves ALL tools - use with caution!",
  },
  {
    question: "Can hooks override bypassPermissions mode?",
    answer: "Yes! Hooks always execute regardless of permission mode. A PreToolUse hook can still deny a tool even in bypassPermissions mode. Deny rules also still apply.",
  },
  {
    question: "When should I use canUseTool vs hooks?",
    answer: "Use hooks for programmatic control over ALL tool executions with custom logic. Use canUseTool as a fallback for cases not covered by hooks or permission rules - it fires when Claude would normally show a permission prompt.",
  },
  {
    question: "What's the order of permission checks?",
    answer: "PreToolUse Hook → Deny Rules → Allow Rules → Ask Rules → Permission Mode → canUseTool callback → Execute → PostToolUse Hook",
  },
  {
    question: "How do I change permission modes mid-conversation?",
    answer: "Use q.setPermissionMode() on a streaming query object. This only works with streaming sessions - you can't change modes on a regular query() call.",
  },
  {
    question: "What values can a PreToolUse hook return?",
    answer: "Four options: Allow (execute immediately), Deny (block the tool), Ask (defer to canUseTool callback), or Continue (proceed to check permission rules).",
  },
  {
    question: "How do I handle the AskUserQuestion tool?",
    answer: "In your canUseTool callback, check for toolName 'AskUserQuestion'. Return answers in updatedInput.answers as a record mapping question text to selected option labels. Multi-select answers should be comma-separated strings.",
  },
  {
    question: "Can I modify tool parameters before execution?",
    answer: "Yes! When canUseTool returns { behavior: 'allow' }, include an 'updatedInput' property with the modified parameters. Great for sanitizing inputs or adding defaults.",
  },
];

export default function QA() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Q&A</h1>
            <p className="text-gray-400">Common questions about SDK permissions</p>
          </div>
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Back
          </Link>
        </div>

        <div className="space-y-4">
          {qaItems.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-5 text-left flex items-center justify-between hover:bg-gray-700/50 transition-colors"
              >
                <span className="font-medium pr-4">{item.question}</span>
                <span className="text-2xl text-gray-500">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5 text-gray-300 border-t border-gray-700 pt-4">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
