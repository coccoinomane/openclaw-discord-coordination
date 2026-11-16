# Discord forwarding and delegation

Use the MCP Discord tools to create or continue the thread and its associated OpenClaw conversation. Do not also create a session with a separate spawn mechanism.

## Choose where the work continues

Honor an explicit destination. When branching work from an existing Discord thread, its parent channel is the natural default. If the work belongs elsewhere, choose the appropriate authorized channel. Ask only when the destination remains genuinely ambiguous.

Reuse a relevant thread when continuing the same work. Search active threads first; include archived threads when the user refers to a particular earlier conversation. An explicit request for new, separate threads takes precedence over reuse. Create one focused assignment per requested branch.

Creating a channel is a separate decision from creating a thread. Use the channel-creation workflow only when the user authorizes it.

## Prepare the prompt

- **Forwarding:** preserve a self-contained work request, removing instructions that were only about finding or selecting its destination.
- **Handoff:** prepare a self-contained assignment with the relevant decisions, materials and constraints from the originating conversation. Preserve the user's intent; do not add unrequested work. Include the source OpenClaw session key and usable conversation references when available and needed to retrieve more context. Without those references, supply enough context in the assignment itself.
- **Fork:** preserve the user's work request verbatim, removing only instructions about creating the fork or selecting its destination. Do not rewrite it as a handoff or add a recap, inherited references, or new requirements. For multiple requested branches, forward the portion of the request relevant to each branch without changing its meaning.

For example, “Add a receipt section to the letter. Do this in a forked thread” becomes “Add a receipt section to the letter.” The inherited history already identifies the letter.

The submitted prompt must be visible in the destination Discord thread, as message text or a complete attachment.

## Fork history and agent selection

Use `fork_from_session` on the new-thread tool. The fork inherits history through the last completed turn. Append only essential context from the unfinished turn that is absent from both the inherited history and the forwarded request. An explicit model choice applies to the child only; otherwise the fork keeps inherited model settings.

Destination routing determines the agent. Use only native same-agent forks. Obtain the source key from trusted runtime context or session lookup tools, not by guessing from a Discord ID. Forking creates a new conversation; it does not replace the history of an existing destination thread.

If source and destination agents differ, use a handoff instead. If the user explicitly requested a cross-agent fork, explain the same-agent limit before substituting a handoff. Source references do not grant access; follow the deployment's configured permissions without imposing additional client-specific separation.

## Identify the source

For a new-thread request, including a fork, fill the generic `source` string with the native tag of the Discord thread or channel containing the originating message, followed by its full direct message URL:

```text
<#CHANNEL_OR_THREAD_ID> https://discord.com/channels/GUILD/CHANNEL_OR_THREAD_ID/MESSAGE
```

Omit `source` if none is known.

## Return the destination

After the MCP confirms handoff, notify the user in the originating conversation with the destination links. On Discord, use native thread mentions such as `<#THREAD_ID>`; elsewhere use the returned Discord URLs. Include every destination when splitting work across threads.

Do not wait for answers before returning the links. The user continues in those threads; this workflow does not collect results back into the source conversation. A queued handoff confirms accepted work, not a completed answer. Explain partial results or failures and retain any available destination link.

Inbox-specific rules, such as always routing incoming work elsewhere or sending silent link-only acknowledgments, belong to the inbox's local instructions.
