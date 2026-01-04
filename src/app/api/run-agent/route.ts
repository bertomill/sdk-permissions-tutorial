import { query } from "@anthropic-ai/claude-agent-sdk";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { prompt, permissionMode } = await request.json();

  const logs: string[] = [];
  const actualMode = permissionMode === "hooks" ? "bypassPermissions" : permissionMode;
  logs.push(`[Mode] Running in "${permissionMode}" mode`);

  if (permissionMode === "hooks") {
    logs.push(`[Hook] PreToolUse hook active - blocking 'rm' and 'delete' commands`);
  }

  // Build hooks config for the "hooks" mode demo
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hooksConfig: any = permissionMode === "hooks" ? {
    PreToolUse: [{
      hooks: [async (input: { tool_name?: string; tool_input?: unknown }) => {
        const toolName = input.tool_name || "unknown";
        logs.push(`[Hook] PreToolUse fired for: ${toolName}`);

        if (toolName === "Bash") {
          const toolInput = input.tool_input as { command?: string };
          const cmd = toolInput?.command || "";
          logs.push(`[Hook] Checking command: ${cmd.slice(0, 50)}...`);

          if (cmd.includes("rm") || cmd.toLowerCase().includes("delete")) {
            logs.push(`[Hook] ✗ BLOCKED - dangerous command detected!`);
            return {
              decision: "block",
              reason: "Dangerous command blocked by PreToolUse hook!"
            };
          }
        }

        logs.push(`[Hook] ✓ Allowed to continue`);
        return { continue: true };
      }]
    }]
  } : undefined;

  try {
    const result = await query({
      prompt,
      options: {
        permissionMode: actualMode || "default",
        maxTurns: 3,
        hooks: hooksConfig,

        canUseTool: async (toolName, input) => {
          logs.push(`[canUseTool] Called for: ${toolName}`);

          const inputPreview = JSON.stringify(input).slice(0, 80);
          logs.push(`[canUseTool] Input: ${inputPreview}...`);

          // For demo purposes, auto-approve read-only tools
          if (["Read", "Glob", "Grep"].includes(toolName)) {
            logs.push(`[canUseTool] ✓ Approved (read-only tool)`);
            return { behavior: "allow", updatedInput: input };
          }

          // Deny write operations in demo
          logs.push(`[canUseTool] ✗ Denied (write operation)`);
          return {
            behavior: "deny",
            message: "Write operations blocked for demo"
          };
        },
      },
    });

    // Collect messages from result
    const messages: string[] = [];
    for await (const message of result) {
      if (message.type === "assistant") {
        const content = message.message.content;
        if (Array.isArray(content)) {
          for (const block of content) {
            if (block.type === "text") {
              messages.push(block.text);
            } else if (block.type === "tool_use") {
              messages.push(`[Tool: ${block.name}]`);
              logs.push(`[Tool Used] ${block.name}`);
            }
          }
        }
      }
    }

    if (logs.length <= 2) {
      logs.push(`[Info] canUseTool was not called - tools were auto-approved by permission mode or built-in rules`);
    }

    return Response.json({
      success: true,
      messages,
      logs,
      permissionMode
    });
  } catch (error) {
    logs.push(`[Error] ${error instanceof Error ? error.message : "Unknown error"}`);
    return Response.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      logs
    }, { status: 500 });
  }
}
