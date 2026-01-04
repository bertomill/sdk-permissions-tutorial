"use client";

import { useState } from "react";
import Link from "next/link";

type PermissionMode = "default" | "acceptEdits" | "bypassPermissions" | "hooks";

const codeExamples: Record<PermissionMode, string> = {
  default: `const result = await query({
  prompt: "List files in current directory",
  options: {
    permissionMode: "default",
    canUseTool: async (toolName, input) => {
      // Called for every tool that needs approval
      console.log(\`Tool requested: \${toolName}\`);

      // Auto-approve read-only tools
      if (["Read", "Glob", "Grep"].includes(toolName)) {
        return { behavior: "allow", updatedInput: input };
      }

      // Prompt for other tools
      return { behavior: "deny", message: "Needs approval" };
    },
  },
});`,

  acceptEdits: `const result = await query({
  prompt: "Create a new file called hello.txt",
  options: {
    permissionMode: "acceptEdits",
    // File operations auto-approved:
    // - Edit, Write tools
    // - Bash: mkdir, touch, rm, mv, cp
    // Other tools still need canUseTool approval
  },
});`,

  bypassPermissions: `const result = await query({
  prompt: "Run any command",
  options: {
    permissionMode: "bypassPermissions",
    // ⚠️ ALL tools auto-approved
    // Hooks can still block operations
    // Deny rules still apply
    // Use with extreme caution!
  },
});`,

  hooks: `const result = await query({
  prompt: "Delete all files",
  options: {
    permissionMode: "bypassPermissions",
    preToolUse: async (tool, input) => {
      // Block dangerous commands even in bypass mode!
      if (tool.name === "Bash") {
        const cmd = input.command || "";
        if (cmd.includes("rm") || cmd.includes("delete")) {
          return { decision: "deny", reason: "Dangerous!" };
        }
      }
      return { decision: "allow" };
    },
  },
});`,
};

const modeDescriptions: Record<PermissionMode, { title: string; description: string; warning?: string }> = {
  default: {
    title: "Default Mode",
    description: "Standard permission behavior. All tools go through canUseTool callback unless covered by hooks or permission rules.",
  },
  acceptEdits: {
    title: "Accept Edits Mode",
    description: "Auto-approves file edits and filesystem operations. Other tools still require approval.",
  },
  bypassPermissions: {
    title: "Bypass Permissions",
    description: "All tools auto-approved. Only hooks and deny rules can block operations.",
    warning: "Use with extreme caution - Claude has full system access!",
  },
  hooks: {
    title: "PreToolUse Hook",
    description: "Hooks intercept EVERY tool call - even in bypass mode. Ultimate control layer for blocking dangerous operations.",
    warning: "This demo blocks 'rm' and 'delete' commands via a hook.",
  },
};

const examplePrompts = [
  {
    label: "List files (Read-only)",
    prompt: "List all TypeScript files in this project",
    description: "Uses Glob tool - auto-approved",
  },
  {
    label: "Create file (Write)",
    prompt: "Create a new file called hello.txt",
    description: "Uses Write tool - needs approval",
  },
  {
    label: "Run shell command (Bash)",
    prompt: "Run 'echo Hello from Claude && pwd' in the terminal",
    description: "Uses Bash tool - dangerous!",
  },
  {
    label: "Delete files (Blocked by Hook)",
    prompt: "Run 'rm -rf test_folder' to delete files",
    description: "Hook blocks rm commands!",
  },
];

export default function Examples() {
  const [selectedMode, setSelectedMode] = useState<PermissionMode>("default");
  const [prompt, setPrompt] = useState("List all TypeScript files in this project");
  const [output, setOutput] = useState<string[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runAgent = async () => {
    setIsRunning(true);
    setOutput([]);
    setLogs([]);
    setError(null);

    try {
      const res = await fetch("/api/run-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, permissionMode: selectedMode }),
      });

      const data = await res.json();

      if (data.success) {
        setOutput(data.messages);
        setLogs(data.logs);
      } else {
        setError(data.error);
        setLogs(data.logs || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to run agent");
    } finally {
      setIsRunning(false);
    }
  };

  const mode = modeDescriptions[selectedMode];

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Code Examples</h1>
            <p className="text-gray-400">Run the agent with different permission modes</p>
          </div>
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">
            ← Back
          </Link>
        </div>

        {/* Mode Selector */}
        <div className="flex gap-3 mb-6">
          {(Object.keys(modeDescriptions) as PermissionMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMode(m)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedMode === m
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {modeDescriptions[m].title}
            </button>
          ))}
        </div>

        {/* Mode Info */}
        <div className={`p-4 rounded-lg mb-6 ${mode.warning ? "bg-yellow-500/10 border border-yellow-500/30" : "bg-gray-800"}`}>
          <h3 className="font-semibold mb-1">{mode.title}</h3>
          <p className="text-gray-400 text-sm">{mode.description}</p>
          {mode.warning && (
            <p className="text-yellow-400 text-sm mt-2">⚠️ {mode.warning}</p>
          )}
        </div>

        {/* Code Preview */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6 overflow-x-auto">
          <div className="text-xs text-gray-500 mb-2">TypeScript</div>
          <pre className="text-sm font-mono whitespace-pre-wrap">
            {codeExamples[selectedMode].split('\n').map((line, i) => (
              <div
                key={i}
                className={
                  line.includes('permissionMode')
                    ? "bg-yellow-500/20 text-yellow-300 -mx-4 px-4 border-l-2 border-yellow-500"
                    : line.includes('preToolUse:')
                    ? "bg-purple-500/20 text-purple-300 -mx-4 px-4 border-l-2 border-purple-500"
                    : "text-gray-300"
                }
              >
                {line}
              </div>
            ))}
          </pre>
        </div>

        {/* Quick Select Prompts */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">Quick Select</label>
          <div className="flex gap-3">
            {examplePrompts.map((ex) => (
              <button
                key={ex.label}
                onClick={() => setPrompt(ex.prompt)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  prompt === ex.prompt
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                <div>{ex.label}</div>
                <div className="text-xs opacity-70">{ex.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Prompt Input */}
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">Prompt</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter a prompt..."
            />
            <button
              onClick={runAgent}
              disabled={isRunning || !prompt}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
            >
              {isRunning ? "Running..." : "Run Agent"}
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm text-gray-400 mb-2">Agent Output</h3>
            <div className="bg-gray-800 rounded-lg p-4 min-h-[200px] max-h-[400px] overflow-y-auto">
              {error ? (
                <p className="text-red-400">{error}</p>
              ) : output.length > 0 ? (
                <div className="space-y-2 text-sm font-mono">
                  {output.map((msg, i) => (
                    <p key={i} className="text-gray-300">{msg}</p>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Run the agent to see output...</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm text-gray-400 mb-2">Permission Logs</h3>
            <div className="bg-gray-800 rounded-lg p-4 min-h-[200px] max-h-[400px] overflow-y-auto">
              {logs.length > 0 ? (
                <div className="space-y-1 text-xs font-mono">
                  {logs.map((log, i) => (
                    <p key={i} className={log.includes("Denied") ? "text-red-400" : log.includes("approved") ? "text-green-400" : "text-gray-400"}>
                      {log}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Permission events will appear here...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
