---
name: discord-thread-coordination
description: Use when a user asks OpenClaw to open or resume a Discord thread, continue work in another thread, or split or parallelize work across Discord threads. Coordinates the associated OpenClaw sessions through OpenClaw MCP using forwarding, contextual handoffs, or same-agent forks.
---

# Discord thread coordination

OpenClaw MCP creates or resumes Discord threads together with their OpenClaw sessions. Use this workflow from any Discord conversation, including an existing thread; an inbox is only one possible starting point. Assume the user wants an associated OpenClaw session unless they explicitly request an empty thread.

This skill requires [OpenClaw MCP](https://github.com/coccoinomane/openclaw-mcp), already configured with its Discord tools available. It supplies guidance only; it does not install or configure the MCP.

## Choose the continuation

- **Forward** a self-contained request when the destination needs no earlier context.
- **Hand off** an assignment with relevant decisions, materials and constraints when work depends on the source conversation. Include the source OpenClaw session key and Discord link when available.
- **Fork** a same-agent OpenClaw session when a new branch needs its conversational history. Supply a focused new assignment, including relevant details from the current unfinished turn.

Honor the requested destination. For branches from a thread, its parent channel is the natural default. Resume an existing thread for continuing work; create separate threads when the user asks to isolate or parallelize assignments. Use the MCP workflow rather than also creating sessions through a separate spawn mechanism.

Read [Forwarding, handoffs and forks](references/workflows.md) when choosing a destination or preparing the assignment. Tool descriptions define parameters and supported capabilities.

## Make the handoff visible

The submitted assignment must be visible in the destination Discord thread. After confirmed handoff, return every destination to the source conversation using native thread mentions, such as <#THREAD_ID>. Do not wait for answers or promise to collect results: the user continues in the destination threads.

Read [Recovery](references/recovery.md) only after an uncertain or partial operation. Inbox-specific routing rules stay in the inbox's local instructions.

## Agent selection and shared trust

Destination routing determines the agent. Keep the same agent for native forks; use a contextual handoff across agents. Source references help retrieve context but do not grant access. Follow the deployment's configured access without imposing additional client-specific separation.
