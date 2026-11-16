# Discord Coordination for OpenClaw

A companion plugin for [OpenClaw MCP](https://github.com/coccoinomane/openclaw-mcp), containing the [discord-thread-coordination skill](skills/discord-thread-coordination/SKILL.md). It guides an OpenClaw agent when a user wants to open or resume Discord threads, continue work elsewhere, or split assignments across threads.

Inspired by Claude Projects: use Discord channels as project spaces and threads as focused conversations, with OpenClaw handling the work.

## Required: OpenClaw MCP

**This plugin needs [OpenClaw MCP](https://github.com/coccoinomane/openclaw-mcp) to function.** The MCP must already be connected to the agent, with Discord tools enabled and the intended channels configured. See the [MCP Discord setup guide](https://github.com/coccoinomane/openclaw-mcp/blob/main/docs/discord-skills.md).

This repository supplies instructions, not the MCP server or Discord tools. It does not install dependencies, configure credentials, change routing, or check the MCP connection. It assumes the prerequisite is in place.

## Install

Install the companion:

```bash
openclaw plugins install git:github.com/coccoinomane/openclaw-discord-coordination@v0.1.2
```

Review the normal installation prompts. Start a new conversation after installation so the agent receives the updated skill list. The MCP server and this companion are installed separately.

## Workflows

- Forward a self-contained request to a new or existing Discord thread.
- Hand off work with the relevant context and references to its source conversation.
- Fork a same-agent OpenClaw session into a new thread when detailed history is useful.

The prompt sent for execution remains visible in the destination thread. The source conversation receives links to every destination, using native Discord mentions. Work continues there; this workflow does not aggregate answers back into the source.

The skill applies beyond an inbox. Local inbox rules can refer to it without repeating the workflow. It does not modify any inbox or agent instructions automatically.

## Package scope

The manifest loads one local skill and its references. A minimal, empty registration entrypoint provides the native plugin packaging required by the Git installer; it registers no tools, hooks, services or MCP servers. There are no runtime dependencies or build steps.

This skill is not exposed through MCP. The separate MCP repository retains the generic openclaw-coordinator skill for Claude, ChatGPT, OpenClaw and other MCP clients.

## Verification

Run node --test for package, entrypoint and content checks. Tests verify metadata, skill description size, reference links and the MCP prerequisite. Installation and live Discord execution are separate checks; neither is performed by these tests.
