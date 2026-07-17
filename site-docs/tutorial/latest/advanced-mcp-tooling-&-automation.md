# Advanced MCP Tooling & Automation

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/AI_Assisted_Vulkan/07_advanced_mcp/01_introduction.html

## Table of Contents

- [Introduction: Beyond Generic Assistance](#_introduction_beyond_generic_assistance)
- [Introduction:_Beyond_Generic_Assistance](#_introduction_beyond_generic_assistance)
- [The core concept: MCP servers as plugins](#_the_core_concept_mcp_servers_as_plugins)
- [The_core_concept:_MCP_servers_as_plugins](#_the_core_concept_mcp_servers_as_plugins)
- [Why this is useful for Vulkan](#_why_this_is_useful_for_vulkan)
- [Why_this_is_useful_for_Vulkan](#_why_this_is_useful_for_vulkan)
- [What’s in this section](#_whats_in_this_section)
- [What’s_in_this_section](#_whats_in_this_section)

## Content

So far, we’ve used the **Model Context Protocol (MCP)** mainly as a read-only bridge, letting the AI look at our documentation and source code. MCP can do more than that: you can give the AI tools that let it act directly on the Vulkan ecosystem, not just read about it.

This section covers building specialized MCP servers so your AI assistant can query the Vulkan Registry, check hardware limits, and help manage your engine’s performance, instead of relying only on what it can read in open files.

An MCP server works like a plugin for your AI assistant. On its own, an AI can’t query a database or run a performance profiler. An MCP server gives it a defined, callable interface to do that.

**A registry tool:** Lets the AI query the live `vk.xml` file.

**A GPU info tool:** Lets the AI query hardware limits (e.g., `maxDescriptorSetSampledImages`) from databases like `gpuinfo.org`.

**A profiler tool:** Lets the AI read your engine’s timing logs and flag likely bottlenecks.

Giving an autonomous agent (like **Goose**) access to these tools lets it do multi-step lookups on its own — cross-referencing the spec against your code without you manually copying data back and forth. It’s still worth checking its output; these tools reduce manual lookup, they don’t remove the need to verify the result.

A lot of Vulkan development involves looking things up: the spec (XML), hardware limits (JSON databases), and performance data (timing logs). AI models can work with structured data like this reasonably well once they have direct access to it, instead of needing you to paste it in manually.

Without MCP, you’re the one copying data into the chat window. With a registry or hardware-limits tool wired up, you can ask a more specific question — "what’s the max descriptor count on an Adreno 750, and does our budget fit?" — and let the agent go look it up itself.

**[The Vulkan Registry & GPUInfo MCP](02_vulkan_registry_mcp.html):** Giving your assistant real-time access to the spec and hardware limits.

**[Agentic Automation & Audits](03_agentic_automation_qa.html):** Using an agent to help analyze CI/CD failures and look for inefficiencies in your command buffer recording logic.

By the end, you’ll have a small set of custom tools that make your AI assistant more useful for your specific hardware targets and build pipeline, not just generic Vulkan questions.

Next: [The Vulkan Registry & GPUInfo MCP](02_vulkan_registry_mcp.html)
