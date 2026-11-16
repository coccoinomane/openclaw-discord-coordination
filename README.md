# Discord Coordination for OpenClaw

An optional OpenClaw plugin containing the [discord-thread-coordination skill](skills/discord-thread-coordination/SKILL.md). It guides an OpenClaw agent when a user wants to open or resume Discord threads, continue work elsewhere, or split assignments across threads.

## Required: OpenClaw MCP

**This plugin needs [OpenClaw MCP](https://github.com/coccoinomane/openclaw-mcp) to function.** The MCP must already be connected to the agent, with Discord tools enabled and the intended channels configured. See the [MCP Discord setup guide](https://github.com/coccoinomane/openclaw-mcp/blob/main/docs/discord-skills.md).

This repository supplies instructions, not the MCP server or Discord tools. It does not install dependencies, configure credentials, change routing, or check the MCP connection. It assumes the prerequisite is in place.

Native forks additionally require a version of the MCP advertising fork_from_session on openclaw_discord_ask and a compatible Gateway. At initial publication that MCP change is under review in [PR #1](https://github.com/coccoinomane/openclaw-mcp/pull/1); do not assume it is deployed merely because this skill is installed. Forwarding and contextual handoffs do not require the fork parameter.

## Install

On an OpenClaw version supporting native plugin skills:

```bash
openclaw plugins install git:github.com/coccoinomane/openclaw-discord-coordination@v0.1.0
```

Review the normal installation prompts. Start a new conversation after installation so the agent receives the updated skill list. This is optional: using the MCP alone does not require this plugin.

## Workflows

- Forward a self-contained request to a new or existing Discord thread.
- Hand off work with the relevant context and references to its source conversation.
- Fork a same-agent OpenClaw session into a new thread when detailed history is useful and the tool supports it.

The prompt sent for execution remains visible in the destination thread. The source conversation receives links to every destination, using native Discord mentions. Work continues there; this workflow does not aggregate answers back into the source.

The skill applies beyond an inbox. Local inbox rules can refer to it without repeating the workflow. It does not modify any inbox or agent instructions automatically.

## Package scope

The manifest loads one local skill and its references. A minimal, empty registration entrypoint provides the native plugin packaging required by the Git installer; it registers no tools, hooks, services or MCP servers. There are no runtime dependencies or build steps.

This skill is not exposed through MCP. The separate MCP repository retains the generic openclaw-coordinator skill for Claude, ChatGPT, OpenClaw and other MCP clients.

## Verification

Run node --test for package, entrypoint and content checks. Tests verify metadata, skill description size, reference links and the MCP prerequisite. Installation and live Discord execution are separate checks; neither is performed by these tests.
