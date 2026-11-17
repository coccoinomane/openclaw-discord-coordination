---
name: discord-thread-coordination
description: Use when a user asks OpenClaw to open or resume a Discord thread, continue work elsewhere, or split or parallelize work across Discord threads. Coordinates the associated OpenClaw sessions through OpenClaw MCP using forwarding, contextual handoffs, or same-agent forks.
---

# Discord thread coordination

Use this skill from any Discord conversation, including an existing thread; an inbox is only one possible starting point. Assume the user wants an associated OpenClaw session unless they explicitly request an empty thread.

This skill requires [OpenClaw MCP 4.x (unreleased)](https://github.com/coccoinomane/openclaw-mcp), already configured with its Discord tools available. It supplies guidance only; it does not install or configure the MCP.

## Choose the continuation

- **Forward** a self-contained request that needs no earlier context.
- **Hand off** work with selected context from the source conversation.
- **Fork** a same-agent session to continue in a new thread with inherited history.

Before creating or resuming a thread or forwarding any request, read [Forwarding, handoffs and forks](references/workflows.md). It is the canonical procedure for destination selection, prompt preparation, source attribution and returning links. Tool descriptions define the parameters.

Read [Recovery](references/recovery.md) after an uncertain or partial operation. Inbox-specific routing rules stay in the inbox's local instructions.
