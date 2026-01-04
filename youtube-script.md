# Claude Agent SDK Permissions - YouTube Tutorial Script

## Video Title Ideas
- "Claude Agent SDK Permissions Explained - Complete Guide"
- "How to Control AI Agent Access with Claude SDK"
- "Build Safe AI Agents: Claude SDK Permissions Tutorial"

---

## INTRO (1-2 min)

**Hook:**
"What happens when you give an AI agent full access to your system? It could delete your files, run dangerous commands, or rack up huge API bills. Today I'll show you how to control exactly what Claude can do - from read-only access to full automation with safety nets."

**What we'll cover:**
- Why permissions matter for AI agents
- The 4 permission modes
- Live demos of each mode
- Real startup use cases
- How to implement this in your projects

---

## SECTION 1: Why Permissions Matter (2-3 min)

**Navigate to:** `/why`

**Key points:**
- AI agents can execute real commands on your system
- Without permissions, a simple prompt could be destructive
- Show the 6 benefits:
  - Safety First
  - Right Tool for the Job
  - Progressive Trust
  - Enterprise Control
  - Auditability
  - Speed vs Control Tradeoff

**Transition:** "Now let's see how these permissions actually work..."

---

## SECTION 2: The Permission Flow (2-3 min)

**Navigate to:** `/wrapup` (show the flow diagram)

**Explain the flow:**
1. Tool Request comes in
2. PreToolUse Hook (can override everything)
3. Deny Rules (hard blocks)
4. Allow Rules (pre-approved)
5. Ask Rules (prompt user)
6. Permission Mode (global setting)
7. canUseTool callback (fallback)
8. Execute!

**Key insight:** "First match wins. Hooks beat everything."

---

## SECTION 3: Live Demo - Default Mode (3-4 min)

**Navigate to:** `/examples`

**Demo 1: Read-only (Glob)**
- Select "Default Mode"
- Click "List files (Read-only)"
- Run Agent
- Show: Glob auto-approved, canUseTool not called

**Demo 2: Write blocked**
- Click "Create file (Write)"
- Run Agent
- Show: canUseTool called, DENIED in red
- Explain: "This is our canUseTool callback blocking write operations"

---

## SECTION 4: Live Demo - Accept Edits Mode (2-3 min)

**Navigate to:** Accept Edits tab

**Demo:**
- Show the highlighted `permissionMode: "acceptEdits"` line
- Click "Create file (Write)"
- Run Agent
- Show: File created! No canUseTool called
- Explain: "acceptEdits auto-approves file operations"

**Show the created file:** `hello.txt` in the project folder

---

## SECTION 5: Live Demo - Bypass Permissions (2-3 min)

**Navigate to:** Bypass Permissions tab

**Demo:**
- Show the warning: "Use with extreme caution"
- Click "Run shell command (Bash)"
- Run Agent
- Show: Command executed without any prompts
- Explain: "Everything is auto-approved. Use only in trusted environments."

---

## SECTION 6: Live Demo - PreToolUse Hook (3-4 min)

**Navigate to:** PreToolUse Hook tab

**Demo:**
- Show the code with `preToolUse` highlighted
- Click "Delete files (Blocked by Hook)"
- Run Agent
- Show the logs:
  - `[Hook] PreToolUse fired for: Bash`
  - `[Hook] Checking command: rm -rf...`
  - `[Hook] ✗ BLOCKED - dangerous command detected!`

**Key insight:** "Even in bypass mode, hooks can still block operations. This is your ultimate safety net."

---

## SECTION 7: Startup Use Cases (2-3 min)

**Navigate to:** `/wrapup` (scroll to use cases)

**Walk through each:**
1. Internal Dev Tools → acceptEdits
2. Team Code Assistant → default + allow rules
3. CI/CD Pipeline → bypassPermissions + hooks
4. Enterprise/Compliance → hooks + deny rules
5. Customer-Facing Agent → default + strict canUseTool
6. Data Analysis Bot → Read-only

**Explain:** "The SDK is for building products and tools, not for interactive development - use Claude Code CLI for that."

---

## SECTION 8: Quick Quiz (Optional - 1-2 min)

**Navigate to:** `/quiz`

**Do 2-3 questions live:**
- "How many ways to control tool usage?" → 4
- "What's checked first?" → PreToolUse Hook
- "What can block in bypassPermissions?" → Hooks and Deny Rules

---

## SECTION 9: Key Takeaways & Wrap Up (1-2 min)

**Navigate to:** `/wrapup`

**Summarize:**
1. Hooks are king - override everything
2. Deny beats allow - safety first
3. canUseTool is the fallback
4. Start restrictive, open up as needed
5. Layer your defenses for production

**Call to action:**
- "Check out the full docs at platform.claude.com"
- "Join Makers Lounge on Slack to share what you build"
- "Follow me on LinkedIn for more tutorials"
- "Drop a comment with what you're building!"

---

## OUTRO

"That's everything you need to know about permissions in the Claude Agent SDK. You now have the power to build AI agents that are both powerful AND safe. See you in the next one!"

---

## Technical Notes for Recording

### Before recording:
```bash
cd /Users/bertomill/sdk-permissions/quiz-app
ENABLE_AGENT_DEMO=true npm run dev
```

### Make sure to have:
- [ ] ANTHROPIC_API_KEY set in environment
- [ ] Browser at localhost:3000
- [ ] Terminal visible for showing file creation
- [ ] Clean hello.txt deleted before recording

### Timing estimate:
- Total: 20-25 minutes
- Can be edited down to 15-18 minutes

---

## Thumbnail Ideas
- Split screen: "SAFE" vs "DANGEROUS" with AI robot
- Permission levels as a gauge/meter
- Lock icon with Claude logo
- "Control Your AI Agent" text with checkmarks
