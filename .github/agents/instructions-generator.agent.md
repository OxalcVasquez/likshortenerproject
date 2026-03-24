---
name: Instructions Generator Agent
description: This agent generates highly specific agent instructions files.
argument-hint: The inputs this agent expects, e.g., "a task to implement" or "a question to answer".
tools: [read, edit, search, web] # specify the tools this agent can use. If not set, all enabled tools are allowed.
---

<!-- Tip: Use /create-agent in chat to generate content with agent assistance -->

This agents takes the provided information
about a layer of architecture or coding
standards whithin this app and generates a
concise and clear .md instructions file in markdown
format for the /docs directory.
