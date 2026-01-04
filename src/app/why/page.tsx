import Link from "next/link";

const reasons = [
  {
    icon: "🛡️",
    title: "Safety First",
    description: "AI agents can execute real commands on your system. Without permissions, a simple prompt like 'clean up old files' could delete important data. Permissions let you set boundaries.",
    example: "Block all 'rm -rf' commands while still allowing file creation",
  },
  {
    icon: "🎯",
    title: "Right Tool for the Job",
    description: "Different tasks need different permission levels. Exploring code? Read-only is enough. Building features? Allow file edits. Deploying? Maybe full access - but with hooks as guardrails.",
    example: "Use 'acceptEdits' mode during development, 'default' in production",
  },
  {
    icon: "🔄",
    title: "Progressive Trust",
    description: "Start restrictive and open up as needed. Watch what the agent does in default mode, then switch to acceptEdits once you trust its approach.",
    example: "q.setPermissionMode('acceptEdits') after reviewing the plan",
  },
  {
    icon: "🏢",
    title: "Enterprise Control",
    description: "In team environments, you need consistent policies. Permission rules in settings.json let you enforce organization-wide standards that can't be bypassed.",
    example: "Deny all database delete commands across all developer machines",
  },
  {
    icon: "🔍",
    title: "Auditability",
    description: "Hooks give you visibility into every tool call. Log what the agent does, get alerts on suspicious activity, or integrate with your security systems.",
    example: "PreToolUse hook that logs all Bash commands to your SIEM",
  },
  {
    icon: "⚡",
    title: "Speed vs Control Tradeoff",
    description: "Sometimes you want Claude to move fast without prompting you for every file edit. Other times you want to approve each step. Permissions let you choose.",
    example: "Use 'bypassPermissions' for trusted CI/CD pipelines",
  },
];

const useCases = [
  {
    title: "Code Review Bot",
    permissions: "Read-only (Glob, Grep, Read)",
    description: "Analyze code without any risk of modification",
  },
  {
    title: "Feature Development",
    permissions: "acceptEdits mode",
    description: "Let Claude write code freely while you focus on architecture",
  },
  {
    title: "Automated Testing",
    permissions: "Default + allow Bash(npm test:*)",
    description: "Run tests but block other shell commands",
  },
  {
    title: "Production Deployment",
    permissions: "Hooks + strict deny rules",
    description: "Full automation with safety nets for critical operations",
  },
];

export default function Why() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Why Permissions Matter</h1>
            <p className="text-gray-400">Understanding the value of controlled AI agent access</p>
          </div>
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">
            ← Back
          </Link>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-6 mb-10">
          <h2 className="text-2xl font-bold mb-3">AI Agents Are Powerful. Permissions Make Them Safe.</h2>
          <p className="text-gray-300 text-lg">
            Claude can read files, write code, run commands, and interact with your entire system.
            That power is incredible for productivity - but it needs guardrails. The permission system
            lets you get the benefits of AI automation while staying in control.
          </p>
        </div>

        {/* Reasons Grid */}
        <h2 className="text-2xl font-bold mb-6">Key Benefits</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {reasons.map((reason) => (
            <div key={reason.title} className="bg-gray-800 rounded-lg p-5">
              <div className="text-3xl mb-3">{reason.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
              <p className="text-gray-400 mb-3">{reason.description}</p>
              <div className="bg-gray-900 rounded px-3 py-2 text-sm">
                <span className="text-gray-500">Example: </span>
                <span className="text-blue-400">{reason.example}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Use Cases */}
        <h2 className="text-2xl font-bold mb-6">Real-World Use Cases</h2>
        <div className="space-y-4 mb-12">
          {useCases.map((useCase) => (
            <div key={useCase.title} className="bg-gray-800 rounded-lg p-5 flex items-center gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{useCase.title}</h3>
                <p className="text-gray-400 text-sm">{useCase.description}</p>
              </div>
              <div className="bg-gray-900 rounded-lg px-4 py-2 text-sm font-mono text-green-400">
                {useCase.permissions}
              </div>
            </div>
          ))}
        </div>

        {/* Permission Hierarchy */}
        <h2 className="text-2xl font-bold mb-6">The Permission Hierarchy</h2>
        <div className="bg-gray-800 rounded-xl p-6 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">1</div>
              <div className="flex-1">
                <span className="font-semibold text-purple-400">Hooks</span>
                <span className="text-gray-400"> - Ultimate control, runs on EVERY tool call</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold">2</div>
              <div className="flex-1">
                <span className="font-semibold text-red-400">Deny Rules</span>
                <span className="text-gray-400"> - Hard blocks that nothing can override</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center font-bold">3</div>
              <div className="flex-1">
                <span className="font-semibold text-green-400">Allow Rules</span>
                <span className="text-gray-400"> - Pre-approved operations</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center font-bold">4</div>
              <div className="flex-1">
                <span className="font-semibold text-yellow-400">Permission Mode</span>
                <span className="text-gray-400"> - Global behavior setting</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">5</div>
              <div className="flex-1">
                <span className="font-semibold text-blue-400">canUseTool Callback</span>
                <span className="text-gray-400"> - Fallback for everything else</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-400 mb-4">Ready to see permissions in action?</p>
          <Link
            href="/examples"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
          >
            Try the Code Examples →
          </Link>
        </div>
      </div>
    </main>
  );
}
