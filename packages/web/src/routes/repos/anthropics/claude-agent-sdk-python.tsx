import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/repos/anthropics/claude-agent-sdk-python")({
  component: ClaudeAgentSDKPage,
})

function ClaudeAgentSDKPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="hover:scale-110 transition-transform">🏡</Link>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span className="text-rose-600 dark:text-rose-400 text-sm font-mono">repos/anthropics</span>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <h1 className="text-lg font-semibold">claude-agent-sdk-python</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Hero */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-rose-500/10 border border-rose-500/20 rounded-2xl">
            <span className="text-4xl">🤖</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Claude Agent SDK
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Official Python SDK for building AI agents with Claude Code
          </p>
          <p className="text-slate-600 dark:text-slate-500 max-w-3xl mx-auto">
            Bidirectional communication, custom tools via MCP, hooks for control flow,
            permission callbacks, and session management.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">Python 3.10+</span>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">MCP Tools</span>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">Async/Await</span>
          </div>
        </section>

        {/* Installation */}
        <section className="space-y-8">
          <SectionHeader icon="📦" title="Installation" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <CodeBlock code={`pip install claude-agent-sdk

# Claude Code CLI is bundled - no separate install needed`} />
          </div>
        </section>

        {/* Two Entry Points */}
        <section className="space-y-8">
          <SectionHeader icon="🚪" title="Two Entry Points" subtitle="Choose based on your use case" />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg text-rose-600 dark:text-rose-400 mb-2">query()</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                One-shot, fire-and-forget. Send prompt, receive all responses. No state management.
              </p>
              <CodeBlock code={`from claude_agent_sdk import query

async for msg in query(prompt="What is 2+2?"):
    print(msg)`} />
              <div className="mt-4 text-xs text-slate-500">
                Best for: Simple queries, scripts, automation
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg text-rose-600 dark:text-rose-400 mb-2">ClaudeSDKClient</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Interactive, bidirectional. Maintains state, supports hooks, can interrupt.
              </p>
              <CodeBlock code={`from claude_agent_sdk import ClaudeSDKClient

async with ClaudeSDKClient() as client:
    await client.query("First question")
    async for msg in client.receive_response():
        print(msg)

    await client.query("Follow-up")
    async for msg in client.receive_response():
        print(msg)`} />
              <div className="mt-4 text-xs text-slate-500">
                Best for: Conversations, REPL, complex workflows
              </div>
            </div>
          </div>
        </section>

        {/* Configuration Options */}
        <section className="space-y-8">
          <SectionHeader icon="⚙️" title="ClaudeAgentOptions" subtitle="All configuration options" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <CodeBlock code={`from claude_agent_sdk import ClaudeAgentOptions

options = ClaudeAgentOptions(
    # Tools
    tools=["Bash", "Read", "Write"],        # Available tools
    allowed_tools=["mcp__calc__add"],       # Explicitly allowed
    disallowed_tools=["Bash"],              # Explicitly blocked

    # Prompts & Behavior
    system_prompt="You are a helpful assistant",
    max_turns=10,                           # Max conversation turns
    max_budget_usd=5.0,                     # Cost limit
    max_thinking_tokens=8000,               # Reasoning token limit

    # Models
    model="claude-sonnet-4-5",
    fallback_model="claude-haiku-3-5",

    # Permissions
    permission_mode="default",              # or "acceptEdits", "bypassPermissions"
    can_use_tool=my_permission_callback,    # Custom permission function

    # Sessions
    continue_conversation=True,
    resume="session-id-123",                # Resume previous session
    fork_session=True,                      # Branch from session

    # MCP Servers
    mcp_servers={"calc": calculator_server},

    # Hooks
    hooks={
        "PreToolUse": [HookMatcher(...)],
        "PostToolUse": [HookMatcher(...)]
    },

    # Custom Agents
    agents={"reviewer": AgentDefinition(...)},

    # Working directory
    cwd="/path/to/project",
)`} />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <OptionCard
              name="permission_mode"
              values={["default", "acceptEdits", "plan", "bypassPermissions"]}
              desc="Controls tool approval flow"
            />
            <OptionCard
              name="system_prompt"
              values={["string", "preset: claude_code"]}
              desc="System prompt or preset"
            />
            <OptionCard
              name="output_format"
              values={["json_schema"]}
              desc="Structured output schema"
            />
          </div>
        </section>

        {/* Message Types */}
        <section className="space-y-8">
          <SectionHeader icon="💬" title="Message Types" subtitle="What you receive from queries" />

          <div className="grid md:grid-cols-2 gap-6">
            <MessageTypeCard
              name="AssistantMessage"
              desc="Claude's response with content blocks"
              fields={["content: list[ContentBlock]", "model: str", "parent_tool_use_id: str | None"]}
            />
            <MessageTypeCard
              name="UserMessage"
              desc="User input (for context)"
              fields={["content: str | list[ContentBlock]", "parent_tool_use_id: str | None"]}
            />
            <MessageTypeCard
              name="SystemMessage"
              desc="System events and notifications"
              fields={["subtype: str", "data: dict"]}
            />
            <MessageTypeCard
              name="ResultMessage"
              desc="Final result with metrics"
              fields={["duration_ms: int", "total_cost_usd: float", "num_turns: int", "session_id: str", "structured_output: Any"]}
            />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Content Block Types</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ContentBlockCard name="TextBlock" fields={["text: str"]} />
              <ContentBlockCard name="ThinkingBlock" fields={["thinking: str", "signature: str"]} />
              <ContentBlockCard name="ToolUseBlock" fields={["id: str", "name: str", "input: dict"]} />
              <ContentBlockCard name="ToolResultBlock" fields={["tool_use_id: str", "content: str", "is_error: bool"]} />
            </div>
          </div>
        </section>

        {/* Custom Tools */}
        <section className="space-y-8">
          <SectionHeader icon="🔧" title="Custom Tools (MCP)" subtitle="In-process tool servers" />

          <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-6 mb-6">
            <h4 className="font-semibold text-rose-700 dark:text-rose-400 mb-2">SDK MCP Servers</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Run tools in-process (no subprocess). Better performance, easier debugging, direct access to app state.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Defining Tools</h3>
            <CodeBlock code={`from claude_agent_sdk import tool, create_sdk_mcp_server

@tool("add", "Add two numbers", {"a": float, "b": float})
async def add(args):
    result = args["a"] + args["b"]
    return {
        "content": [{"type": "text", "text": f"Result: {result}"}]
    }

@tool("multiply", "Multiply two numbers", {"a": float, "b": float})
async def multiply(args):
    result = args["a"] * args["b"]
    return {
        "content": [{"type": "text", "text": f"Result: {result}"}],
        "is_error": False  # Optional
    }

# Create server
calculator = create_sdk_mcp_server(
    name="calculator",
    version="1.0.0",
    tools=[add, multiply]
)`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Using Tools</h3>
            <CodeBlock code={`options = ClaudeAgentOptions(
    mcp_servers={"calc": calculator},
    allowed_tools=["mcp__calc__add", "mcp__calc__multiply"]
)

async with ClaudeSDKClient(options=options) as client:
    await client.query("Calculate 15 * 8 + 12")
    async for msg in client.receive_response():
        if isinstance(msg, AssistantMessage):
            for block in msg.content:
                if isinstance(block, TextBlock):
                    print(block.text)

# Tool naming: mcp__<server>__<tool>
# e.g., mcp__calc__add`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Tool Input Schema Options</h3>
            <CodeBlock code={`# Simple dict
{"name": str, "age": int, "score": float}

# Full JSON Schema
{
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "age": {"type": "integer", "minimum": 0}
    },
    "required": ["name"]
}

# TypedDict
from typing_extensions import TypedDict

class MyInput(TypedDict):
    name: str
    age: int`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Tool Return Format</h3>
            <CodeBlock code={`# Text result
return {
    "content": [{"type": "text", "text": "Result here"}]
}

# Image result
return {
    "content": [{
        "type": "image",
        "data": "base64_encoded_data",
        "mimeType": "image/png"
    }]
}

# Error result
return {
    "content": [{"type": "text", "text": "Error: something failed"}],
    "is_error": True
}`} />
          </div>
        </section>

        {/* Permission Callbacks */}
        <section className="space-y-8">
          <SectionHeader icon="🔐" title="Permission Callbacks" subtitle="Fine-grained tool access control" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Permission Callback Pattern</h3>
            <CodeBlock code={`from claude_agent_sdk import (
    PermissionResultAllow,
    PermissionResultDeny,
    ToolPermissionContext
)

async def my_permission_callback(
    tool_name: str,
    input_data: dict,
    context: ToolPermissionContext
) -> PermissionResultAllow | PermissionResultDeny:
    """Control which tools Claude can use."""

    # Allow read-only operations
    if tool_name in ["Read", "Glob", "Grep"]:
        return PermissionResultAllow()

    # Block writes to system directories
    if tool_name in ["Write", "Edit"]:
        path = input_data.get("file_path", "")
        if path.startswith("/etc/") or path.startswith("/usr/"):
            return PermissionResultDeny(
                message=f"Cannot write to system directory: {path}"
            )
        return PermissionResultAllow()

    # Modify inputs (redirect to safe location)
    if tool_name == "Write":
        safe_path = f"./output/{input_data['file_path'].split('/')[-1]}"
        return PermissionResultAllow(
            updated_input={**input_data, "file_path": safe_path}
        )

    # Check bash commands
    if tool_name == "Bash":
        command = input_data.get("command", "")
        dangerous = ["rm -rf", "sudo", "chmod 777"]
        for pattern in dangerous:
            if pattern in command:
                return PermissionResultDeny(
                    message=f"Dangerous pattern: {pattern}"
                )
        return PermissionResultAllow()

    # Default: deny
    return PermissionResultDeny(message="Tool not allowed")

# Use callback
options = ClaudeAgentOptions(
    can_use_tool=my_permission_callback,
    permission_mode="default"  # Required for callbacks
)`} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4">PermissionResultAllow</h3>
              <CodeBlock code={`PermissionResultAllow(
    # Modify tool inputs
    updated_input={"file_path": "/safe/path"},

    # Update global permissions
    updated_permissions=[...]
)`} />
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4">PermissionResultDeny</h3>
              <CodeBlock code={`PermissionResultDeny(
    message="Reason for denial",

    # Stop entire session (not just this tool)
    interrupt=True
)`} />
            </div>
          </div>
        </section>

        {/* Hooks */}
        <section className="space-y-8">
          <SectionHeader icon="🪝" title="Hooks System" subtitle="Control flow at specific points" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Hook Events</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <HookEventCard name="PreToolUse" desc="Before tool execution" />
              <HookEventCard name="PostToolUse" desc="After tool execution" />
              <HookEventCard name="UserPromptSubmit" desc="User submits prompt" />
              <HookEventCard name="Stop" desc="Stop event" />
              <HookEventCard name="SubagentStop" desc="Subagent stop" />
              <HookEventCard name="PreCompact" desc="Before transcript compaction" />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Hook Implementation</h3>
            <CodeBlock code={`from claude_agent_sdk import HookMatcher, HookInput, HookContext, HookJSONOutput

async def check_bash_command(
    input_data: HookInput,
    tool_use_id: str | None,
    context: HookContext
) -> HookJSONOutput:
    """Block dangerous bash commands."""
    if input_data["tool_name"] != "Bash":
        return {}

    command = input_data["tool_input"].get("command", "")

    if "rm -rf" in command:
        return {
            "hookSpecificOutput": {
                "hookEventName": "PreToolUse",
                "permissionDecision": "deny",
                "permissionDecisionReason": "Dangerous command blocked"
            }
        }

    return {}

async def review_output(
    input_data: HookInput,
    tool_use_id: str | None,
    context: HookContext
) -> HookJSONOutput:
    """Review tool output."""
    response = input_data.get("tool_response", "")

    if "error" in str(response).lower():
        return {
            "systemMessage": "Tool produced an error",
            "hookSpecificOutput": {
                "hookEventName": "PostToolUse",
                "additionalContext": "Consider a different approach"
            }
        }

    return {}

# Configure hooks
options = ClaudeAgentOptions(
    hooks={
        "PreToolUse": [
            HookMatcher(
                matcher="Bash",  # Match specific tool
                hooks=[check_bash_command],
                timeout=30.0
            )
        ],
        "PostToolUse": [
            HookMatcher(
                matcher=None,  # Match all tools
                hooks=[review_output]
            )
        ]
    }
)`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Hook Output Options</h3>
            <CodeBlock code={`# Control execution flow
{
    "continue_": False,      # Stop after hook (default: True)
    "stopReason": "Error detected",
    "suppressOutput": True   # Hide from transcript
}

# Block/approve (PreToolUse)
{
    "hookSpecificOutput": {
        "hookEventName": "PreToolUse",
        "permissionDecision": "allow" | "deny" | "ask",
        "permissionDecisionReason": "Reason"
    }
}

# Modify inputs (PreToolUse)
{
    "hookSpecificOutput": {
        "hookEventName": "PreToolUse",
        "updatedInput": {"file_path": "/safe/path"}
    }
}

# Add context (PostToolUse)
{
    "hookSpecificOutput": {
        "hookEventName": "PostToolUse",
        "additionalContext": "Extra info for Claude"
    }
}

# Defer (async)
{
    "async_": True,
    "asyncTimeout": 5000  # milliseconds
}`} />
          </div>
        </section>

        {/* Custom Agents */}
        <section className="space-y-8">
          <SectionHeader icon="🤖" title="Custom Agents" subtitle="Specialized agents with custom prompts" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <CodeBlock code={`from claude_agent_sdk import AgentDefinition

options = ClaudeAgentOptions(
    agents={
        "code-reviewer": AgentDefinition(
            description="Reviews code for best practices",
            prompt="""You are a code reviewer. Analyze code for:
            - Bugs and security vulnerabilities
            - Performance issues
            - Best practice violations
            Provide constructive feedback.""",
            tools=["Read", "Grep"],
            model="sonnet"
        ),
        "doc-writer": AgentDefinition(
            description="Writes comprehensive documentation",
            prompt="Write clear documentation with examples.",
            tools=["Read", "Write", "Edit"],
            model="sonnet"
        ),
        "tester": AgentDefinition(
            description="Writes and runs tests",
            prompt="Write comprehensive tests with good coverage.",
            tools=["Read", "Write", "Bash"],
            model="haiku"
        )
    }
)

# Use agent in prompt
async for msg in query(
    prompt="Use the code-reviewer agent to review src/main.py",
    options=options
):
    print(msg)`} />
          </div>
        </section>

        {/* Session Management */}
        <section className="space-y-8">
          <SectionHeader icon="📂" title="Session Management" subtitle="Resume and fork conversations" />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Resume Session</h3>
              <CodeBlock code={`# Get session_id from ResultMessage
previous_session = "session-xyz-123"

options = ClaudeAgentOptions(
    resume=previous_session,
    continue_conversation=True
)

async for msg in query(
    prompt="Continue where we left off",
    options=options
):
    print(msg)`} />
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Fork Session</h3>
              <CodeBlock code={`# Branch from a point
options = ClaudeAgentOptions(
    resume=original_session,
    fork_session=True  # New session ID
)

async for msg in query(
    prompt="Try a different approach",
    options=options
):
    print(msg)`} />
            </div>
          </div>
        </section>

        {/* Structured Output */}
        <section className="space-y-8">
          <SectionHeader icon="📋" title="Structured Output" subtitle="Validated JSON responses" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <CodeBlock code={`options = ClaudeAgentOptions(
    output_format={
        "type": "json_schema",
        "schema": {
            "type": "object",
            "properties": {
                "name": {"type": "string"},
                "email": {"type": "string", "format": "email"},
                "age": {"type": "integer", "minimum": 0}
            },
            "required": ["name", "email"]
        }
    }
)

async for msg in query(
    prompt="Extract: John Doe, john@example.com, 30",
    options=options
):
    if isinstance(msg, ResultMessage):
        print(msg.structured_output)
        # {"name": "John Doe", "email": "john@example.com", "age": 30}`} />
          </div>
        </section>

        {/* Client Methods */}
        <section className="space-y-8">
          <SectionHeader icon="🎮" title="ClaudeSDKClient Methods" subtitle="Interactive session control" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <div className="grid md:grid-cols-2 gap-4">
              <MethodCard name="connect(prompt?)" desc="Connect to Claude with optional initial prompt" />
              <MethodCard name="query(prompt)" desc="Send a message" />
              <MethodCard name="receive_messages()" desc="Receive all messages (async iterator)" />
              <MethodCard name="receive_response()" desc="Receive until ResultMessage" />
              <MethodCard name="interrupt()" desc="Send interrupt signal" />
              <MethodCard name="set_permission_mode(mode)" desc="Change permission mode mid-conversation" />
              <MethodCard name="set_model(model)" desc="Change AI model mid-conversation" />
              <MethodCard name="get_server_info()" desc="Get server initialization info" />
              <MethodCard name="disconnect()" desc="Disconnect from Claude" />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Dynamic Settings</h3>
            <CodeBlock code={`async with ClaudeSDKClient(options) as client:
    await client.query("Start with sonnet")
    async for msg in client.receive_response():
        pass

    # Switch to faster model
    await client.set_model("claude-haiku-3-5")

    # Change permissions
    await client.set_permission_mode("acceptEdits")

    await client.query("Continue with haiku")
    async for msg in client.receive_response():
        pass`} />
          </div>
        </section>

        {/* Error Handling */}
        <section className="space-y-8">
          <SectionHeader icon="⚠️" title="Error Handling" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <CodeBlock code={`from claude_agent_sdk import (
    ClaudeSDKError,      # Base error
    CLINotFoundError,    # CLI not installed
    CLIConnectionError,  # Connection issues
    ProcessError,        # Process failed
    CLIJSONDecodeError,  # JSON parse error
)

try:
    async for msg in query(prompt="Hello"):
        pass
except CLINotFoundError:
    print("Install: pip install claude-agent-sdk")
except CLIConnectionError as e:
    print(f"Connection error: {e}")
except ProcessError as e:
    print(f"Process failed (exit {e.exit_code}): {e.stderr}")
except CLIJSONDecodeError as e:
    print(f"JSON parse error: {e.line}")`} />
          </div>
        </section>

        {/* Complete Examples */}
        <section className="space-y-8">
          <SectionHeader icon="📝" title="Complete Examples" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Simple Query</h3>
            <CodeBlock code={`import anyio
from claude_agent_sdk import query, AssistantMessage, TextBlock

async def main():
    async for msg in query(prompt="What is Python?"):
        if isinstance(msg, AssistantMessage):
            for block in msg.content:
                if isinstance(block, TextBlock):
                    print(block.text)

anyio.run(main)`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Interactive Chat</h3>
            <CodeBlock code={`import asyncio
from claude_agent_sdk import (
    ClaudeSDKClient,
    ClaudeAgentOptions,
    AssistantMessage,
    ResultMessage,
    TextBlock
)

async def chat():
    options = ClaudeAgentOptions(
        system_prompt="You are a helpful Python expert"
    )

    async with ClaudeSDKClient(options=options) as client:
        while True:
            user_input = input("You: ")
            if user_input.lower() == "quit":
                break

            await client.query(user_input)

            print("Claude: ", end="")
            async for msg in client.receive_response():
                if isinstance(msg, AssistantMessage):
                    for block in msg.content:
                        if isinstance(block, TextBlock):
                            print(block.text)
                elif isinstance(msg, ResultMessage):
                    print(f"\\n[Cost: \${msg.total_cost_usd:.4f}]\\n")

asyncio.run(chat())`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Tool + Permission + Hook</h3>
            <CodeBlock code={`import asyncio
from claude_agent_sdk import (
    ClaudeSDKClient, ClaudeAgentOptions,
    tool, create_sdk_mcp_server,
    HookMatcher,
    PermissionResultAllow, PermissionResultDeny,
    AssistantMessage, TextBlock
)

# Tool
@tool("search", "Search database", {"query": str})
async def search(args):
    results = f"Found: {args['query']}"
    return {"content": [{"type": "text", "text": results}]}

server = create_sdk_mcp_server("db", tools=[search])

# Permission callback
async def check_permission(tool_name, input_data, ctx):
    if tool_name == "mcp__db__search":
        query = input_data.get("query", "")
        if "DROP" in query.upper():
            return PermissionResultDeny(message="SQL injection blocked")
    return PermissionResultAllow()

# Hook
async def log_search(input_data, tool_use_id, ctx):
    print(f"[LOG] Searching: {input_data['tool_input']}")
    return {}

options = ClaudeAgentOptions(
    mcp_servers={"db": server},
    allowed_tools=["mcp__db__search"],
    can_use_tool=check_permission,
    hooks={
        "PreToolUse": [
            HookMatcher(matcher="mcp__db__search", hooks=[log_search])
        ]
    }
)

async def main():
    async with ClaudeSDKClient(options=options) as client:
        await client.query("Search for Python tutorials")
        async for msg in client.receive_response():
            if isinstance(msg, AssistantMessage):
                for block in msg.content:
                    if isinstance(block, TextBlock):
                        print(block.text)

asyncio.run(main())`} />
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="space-y-8">
          <SectionHeader icon="💎" title="Key Takeaways" />

          <div className="grid md:grid-cols-2 gap-6">
            <TakeawayCard
              title="Two entry points"
              description="query() for simple one-shot queries. ClaudeSDKClient for interactive conversations with hooks and permissions."
            />
            <TakeawayCard
              title="In-process tools"
              description="SDK MCP servers run in your process. No subprocess management, better performance, direct state access."
            />
            <TakeawayCard
              title="Fine-grained control"
              description="Permission callbacks for tool access. Hooks for pre/post execution. Can modify inputs, block tools, add context."
            />
            <TakeawayCard
              title="Session persistence"
              description="Resume conversations with session IDs. Fork to explore alternatives. Full conversation history preserved."
            />
          </div>
        </section>
      </main>
    </div>
  )
}

// Components

function SectionHeader({ icon, title, subtitle }: { icon: string; title: string; subtitle?: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-2xl">{icon}</span>
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        {subtitle && <p className="text-slate-500">{subtitle}</p>}
      </div>
    </div>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 overflow-x-auto text-sm">
      <code className="text-slate-700 dark:text-slate-300">{code}</code>
    </pre>
  )
}

function OptionCard({ name, values, desc }: { name: string; values: string[]; desc: string }) {
  return (
    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
      <code className="text-rose-600 dark:text-rose-400 text-sm font-semibold">{name}</code>
      <p className="text-xs text-slate-500 mt-1">{desc}</p>
      <div className="mt-2 flex flex-wrap gap-1">
        {values.map((v) => (
          <span key={v} className="text-xs px-2 py-0.5 bg-slate-200 dark:bg-slate-700 rounded">{v}</span>
        ))}
      </div>
    </div>
  )
}

function MessageTypeCard({ name, desc, fields }: { name: string; desc: string; fields: string[] }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
      <h3 className="font-semibold text-lg text-rose-600 dark:text-rose-400 mb-2">{name}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{desc}</p>
      <div className="space-y-1">
        {fields.map((f) => (
          <code key={f} className="block text-xs text-slate-500">{f}</code>
        ))}
      </div>
    </div>
  )
}

function ContentBlockCard({ name, fields }: { name: string; fields: string[] }) {
  return (
    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
      <code className="text-rose-600 dark:text-rose-400 text-sm">{name}</code>
      <div className="mt-1 space-y-0.5">
        {fields.map((f) => (
          <code key={f} className="block text-xs text-slate-500">{f}</code>
        ))}
      </div>
    </div>
  )
}

function HookEventCard({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3 text-center">
      <code className="text-rose-600 dark:text-rose-400 text-sm">{name}</code>
      <p className="text-xs text-slate-500 mt-1">{desc}</p>
    </div>
  )
}

function MethodCard({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
      <code className="text-rose-600 dark:text-rose-400 text-sm">{name}</code>
      <p className="text-xs text-slate-500 mt-1">{desc}</p>
    </div>
  )
}

function TakeawayCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
      <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">{title}</h4>
      <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  )
}
