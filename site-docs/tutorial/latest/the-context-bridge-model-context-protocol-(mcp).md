# The Context Bridge: Model Context Protocol (MCP)

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/AI_Assisted_Vulkan/02_environment_setup/06_mcp_context_bridge.html

## Table of Contents

- [Introduction](#_introduction)
- [Why this matters in practice](#_why_this_matters_in_practice)
- [Why_this_matters_in_practice](#_why_this_matters_in_practice)
- [The mcp-Vulkan server](#_the_mcp_vulkan_server)
- [The_mcp-Vulkan_server](#_the_mcp_vulkan_server)
- [Building the server](#_building_the_server)
- [Building_the_server](#_building_the_server)
- [Connecting mcp-Vulkan to Goose](#_connecting_mcp_vulkan_to_goose)
- [Connecting_mcp-Vulkan_to_Goose](#_connecting_mcp_vulkan_to_goose)
- [Connecting mcp-Vulkan to your IDE](#_connecting_mcp_vulkan_to_your_ide)
- [Connecting_mcp-Vulkan_to_your_IDE](#_connecting_mcp_vulkan_to_your_ide)
- [Tradeoffs](#_tradeoffs)
- [Summary](#_summary)

## Content

Even a strong model like **Qwen 3-Coder** has a hard limit: its training data has a cutoff date. It can’t know about a Vulkan extension released after that date, it can’t see your local filesystem, and it has no way of knowing your GPU’s `maxSamplerAnisotropy` limit unless something tells it. The **Model Context Protocol (MCP)** is an open standard for letting an AI query that kind of ground truth — your local environment, or an external data source like the Vulkan registry — instead of guessing from memorized training data.

Ask a generic model "how do I implement a mesh shader for our `Renderer` class?" and, if its defaults assume Vulkan 1.0, it may not even recognize what a mesh shader is. With MCP, an assistant pointed at the **mcp-Vulkan** server can query the actual registry and pick up newer features — mesh shaders, ray tracing, descriptor buffers — that aren’t reliably in its training data. The Vulkan MCP server also serves samples, guide entries, man pages, and other reference material, so the assistant isn’t limited to whatever subset of the ecosystem it happened to see during training.

**mcp-Vulkan** is an open-source MCP server that exposes tools for searching Vulkan documentation and pulling specific topics from the current spec.

A common failure mode without it: an assistant suggests a deprecated call like `vkCreateDescriptorPool` without the `pNext` structures a modern feature needs. With mcp-Vulkan connected, you can ask it to set its context to a specific Vulkan version ("Vulkan 1.3, then list the extensions that are core in that version") and get an answer grounded in that version’s actual spec rather than an average across versions.

If you haven’t built it yet, see [First Step: Building the Vulkan MCP Server](01_introduction.html#_first_step_building_the_vulkan_mcp_server). That covers cloning the repo and running `npm install && npm run build` in `mcp-Vulkan/vulkan/`.

Register the server as a Goose extension by editing its config file — `~/.config/goose/config.yaml` on macOS/Linux, or `%APPDATA%\goose\config.yaml` (typically `C:\Users\\AppData\Roaming\goose\config.yaml`) on Windows.

Add this under `extensions:`, replacing `/path/to/` with the actual path (`pwd` inside the `mcp-Vulkan` directory):

extensions:
  vulkan:
    type: stdio
    cmd: node
    args:
      - /path/to/mcp-Vulkan/vulkan/build/index.js

Restart your Goose session (`goose session`) and confirm the connection by asking "list the tools you have available" — you should see `search-vulkan-docs` and `get-vulkan-topic`.

The same server can be registered directly in your IDE instead of (or in addition to) Goose. **JetBrains CLion** and **Android Studio** users add it through the AI Assistant’s MCP Servers panel; **Visual Studio** and **VS Code** users can register it via the **Continue** or **Copilot** extensions. See the platform-specific chapters earlier in this section for the exact steps.

**Filesystem access is a real permission grant, not a formality.** The first time you enable an MCP tool with filesystem access, your IDE or agent will ask which directory to allow. Scope it to your project folder — don’t grant access to your home directory or anything outside the project.

**Where it helps: consistency with existing code.** Because the model can pull in your engine’s own history through MCP, you can ask it to design something like a new post-processing pass "matching the style and memory management of the existing shadow pass." It will actually read the shadow pass implementation rather than generating something generic — the result still needs review, but it starts from your codebase’s conventions rather than a default template.

MCP is what turns a model from something that answers from memory into something that can check its answers against the current spec and your own codebase. That’s the last piece of the environment setup covered in this section.

Next: [Model Selection & Specialization](../03_model_selection_specialization/01_introduction.html), where we look at picking a model for this setup.

[Previous: Goose & Local Intelligence](05_goose_native_agent.html) | [Next: Model Selection & Specialization](../03_model_selection_specialization/01_introduction.html)
