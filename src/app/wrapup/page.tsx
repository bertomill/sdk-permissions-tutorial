"use client";

import { useState } from "react";
import Link from "next/link";

const cheatsheet = [
  {
    mode: "default",
    emoji: "🔒",
    oneLiner: "You decide everything",
    allows: "Nothing auto-approved",
    useWhen: "Learning, reviewing, untrusted tasks",
    color: "gray",
  },
  {
    mode: "acceptEdits",
    emoji: "📝",
    oneLiner: "File ops are free, rest needs approval",
    allows: "Write, Edit, mkdir, rm, mv, cp",
    useWhen: "Active development, prototyping",
    color: "blue",
  },
  {
    mode: "bypassPermissions",
    emoji: "⚡",
    oneLiner: "Full speed, no prompts",
    allows: "Everything (hooks still work)",
    useWhen: "Trusted CI/CD, controlled environments",
    color: "yellow",
  },
  {
    mode: "hooks",
    emoji: "🎣",
    oneLiner: "Custom logic on every call",
    allows: "Whatever your code decides",
    useWhen: "Enterprise, audit requirements, custom rules",
    color: "purple",
  },
];

const flowSteps = [
  { label: "Tool Request", icon: "🔧", color: "gray" },
  { label: "PreToolUse Hook", icon: "🎣", color: "purple" },
  { label: "Deny Rules", icon: "🚫", color: "red" },
  { label: "Allow Rules", icon: "✅", color: "green" },
  { label: "Ask Rules", icon: "❓", color: "yellow" },
  { label: "Permission Mode", icon: "⚙️", color: "blue" },
  { label: "canUseTool", icon: "🔑", color: "cyan" },
  { label: "Execute!", icon: "🚀", color: "green" },
];

const starterTemplates = [
  {
    title: "Read-Only Agent",
    description: "Safe for code review, analysis, exploration",
    code: `const result = await query({
  prompt: "Analyze this codebase",
  options: {
    permissionMode: "default",
    canUseTool: async (tool) => {
      const readOnly = ["Read", "Glob", "Grep"];
      return readOnly.includes(tool)
        ? { behavior: "allow" }
        : { behavior: "deny" };
    },
  },
});`,
  },
  {
    title: "Development Mode",
    description: "Great for building features with Claude",
    code: `const result = await query({
  prompt: "Build a login form",
  options: {
    permissionMode: "acceptEdits",
    // File operations auto-approved
    // Other tools still need approval
  },
});`,
  },
  {
    title: "Guarded Automation",
    description: "Full power with safety nets",
    code: `const result = await query({
  prompt: "Deploy to staging",
  options: {
    permissionMode: "bypassPermissions",
    hooks: {
      PreToolUse: [{
        hooks: [async (input) => {
          // Block production deployments
          if (input.tool_input?.includes("prod")) {
            return { decision: "block" };
          }
          return { continue: true };
        }]
      }]
    },
  },
});`,
  },
];

const startupUseCases = [
  {
    stage: "🧪 Internal Dev Tools",
    mode: "acceptEdits",
    scenario: "You're building a tool that auto-generates boilerplate, scaffolds features from tickets, or creates tests from specs.",
    example: "Slack bot reads Jira ticket → Claude generates PR with tests → Posts link back to Slack. All automated.",
  },
  {
    stage: "👥 Team Code Assistant",
    mode: "default + allow rules",
    scenario: "You're building an internal web app where your team can ask Claude questions about the codebase.",
    example: "Devs paste code, ask 'what does this do?' - Read-only access to repo, no writes allowed. Safe for everyone.",
  },
  {
    stage: "🔄 CI/CD Pipeline",
    mode: "bypassPermissions + hooks",
    scenario: "Automated code review, test generation, or deployment. Needs to run unattended but with guardrails.",
    example: "Hook blocks any command with 'production' or 'main branch'. Everything else runs automatically.",
  },
  {
    stage: "🏢 Enterprise / Compliance",
    mode: "hooks + deny rules",
    scenario: "SOC2, HIPAA, or internal security policies. Every action must be logged and auditable.",
    example: "PreToolUse hook logs to your SIEM. Deny rules block access to /secrets, .env files, and database credentials.",
  },
  {
    stage: "🤖 Customer-Facing Agent",
    mode: "default + strict canUseTool",
    scenario: "Your users interact with Claude through your product. You can't trust arbitrary prompts.",
    example: "Only allow tools relevant to your product. Deny everything else. User asks to 'delete system32' → blocked.",
  },
  {
    stage: "📊 Data Analysis Bot",
    mode: "Read-only (custom canUseTool)",
    scenario: "Claude analyzes codebases, generates reports, answers questions. Zero write access needed.",
    example: "Approve Read, Glob, Grep. Deny Write, Edit, Bash. Safe to point at any repo.",
  },
];

const nextSteps = [
  {
    title: "Read the Full Docs",
    description: "Deep dive into all permission options",
    link: "https://platform.claude.com/docs/en/home",
    icon: "📚",
  },
  {
    title: "Try Claude Code CLI",
    description: "Experience permissions interactively",
    link: "https://claude.ai/code",
    icon: "💻",
  },
  {
    title: "Join Makers Lounge",
    description: "Ask questions, share what you build",
    link: "https://join.slack.com/t/makerslounge/shared_invite/zt-3milga9hu-PSUb8uCLr_Ofxflr~VyWAw",
    icon: "💬",
  },
  {
    title: "Follow on LinkedIn",
    description: "More tutorials and AI agent content",
    link: "https://www.linkedin.com/in/robertvmill/",
    icon: "👤",
  },
];

export default function WrapUp() {
  const [activeTemplate, setActiveTemplate] = useState(0);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Wrap Up</h1>
            <p className="text-gray-400">Everything you need to remember + what's next</p>
          </div>
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">
            ← Back
          </Link>
        </div>

        {/* Cheatsheet */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">📋 Permission Modes Cheatsheet</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {cheatsheet.map((item) => (
              <div
                key={item.mode}
                className={`bg-gray-800 rounded-lg p-5 border-l-4 border-${item.color}-500`}
                style={{ borderLeftColor: item.color === "gray" ? "#6b7280" : item.color === "blue" ? "#3b82f6" : item.color === "yellow" ? "#eab308" : "#a855f7" }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="font-mono text-lg font-bold">{item.mode}</span>
                </div>
                <p className="text-white font-medium mb-2">{item.oneLiner}</p>
                <p className="text-sm text-gray-400 mb-1">
                  <span className="text-green-400">Allows:</span> {item.allows}
                </p>
                <p className="text-sm text-gray-400">
                  <span className="text-blue-400">Use when:</span> {item.useWhen}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Flow Visualization */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">🔄 The Permission Flow</h2>
          <div className="bg-gray-800 rounded-xl p-6 overflow-x-auto">
            <div className="flex items-center gap-2 min-w-max">
              {flowSteps.map((step, i) => (
                <div key={step.label} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center text-2xl mb-2">
                      {step.icon}
                    </div>
                    <span className="text-xs text-gray-400 text-center w-20">{step.label}</span>
                  </div>
                  {i < flowSteps.length - 1 && (
                    <div className="w-8 h-0.5 bg-gray-600 mx-1" />
                  )}
                </div>
              ))}
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-3 text-center">
            Each step can allow, deny, or pass to the next. First match wins!
          </p>
        </section>

        {/* Startup Use Cases */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">🚀 When Would You Actually Use This?</h2>
          <p className="text-gray-400 mb-6">Real scenarios for your startup or project:</p>
          <div className="space-y-4">
            {startupUseCases.map((useCase) => (
              <div key={useCase.stage} className="bg-gray-800 rounded-lg p-5">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">{useCase.stage}</h3>
                  <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm font-mono">
                    {useCase.mode}
                  </span>
                </div>
                <p className="text-gray-300 mb-2">{useCase.scenario}</p>
                <p className="text-sm text-gray-500 italic">"{useCase.example}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">🎯 Key Takeaways</h2>
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <span><strong>Hooks are king</strong> - They run first and can override everything, even bypassPermissions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <span><strong>Deny beats allow</strong> - Deny rules are checked before allow rules. Safety first!</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <span><strong>canUseTool is the fallback</strong> - Only called when nothing else handles it</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <span><strong>Start restrictive</strong> - Use default mode, then open up as you build trust</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <span><strong>Layer your defenses</strong> - Combine modes + rules + hooks for production</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Starter Templates */}
        <section className="mb-12" id="templates">
          <h2 className="text-2xl font-bold mb-4">🚀 Starter Templates</h2>
          <p className="text-gray-400 mb-4">Copy these to get started quickly:</p>

          <div className="flex gap-2 mb-4">
            {starterTemplates.map((template, i) => (
              <button
                key={template.title}
                onClick={() => setActiveTemplate(i)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTemplate === i
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {template.title}
              </button>
            ))}
          </div>

          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="px-4 py-3 bg-gray-700/50 border-b border-gray-700">
              <h3 className="font-semibold">{starterTemplates[activeTemplate].title}</h3>
              <p className="text-sm text-gray-400">{starterTemplates[activeTemplate].description}</p>
            </div>
            <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
              <code>{starterTemplates[activeTemplate].code}</code>
            </pre>
          </div>
        </section>

        {/* What's Next */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">👉 What's Next?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {nextSteps.map((step) => (
              <a
                key={step.title}
                href={step.link}
                target={step.link.startsWith("http") ? "_blank" : undefined}
                rel={step.link.startsWith("http") ? "noopener noreferrer" : undefined}
                className="bg-gray-800 rounded-lg p-5 hover:bg-gray-700 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{step.icon}</span>
                  <div>
                    <h3 className="font-semibold group-hover:text-blue-400 transition-colors">
                      {step.title} →
                    </h3>
                    <p className="text-sm text-gray-400">{step.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center py-8 border-t border-gray-800">
          <h2 className="text-2xl font-bold mb-2">You're Ready! 🎉</h2>
          <p className="text-gray-400 mb-6">
            You now understand how to control Claude's access to your system.
            Go build something amazing - safely!
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/quiz"
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors"
            >
              Retake the Quiz
            </Link>
            <Link
              href="/examples"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
            >
              Back to Examples
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
