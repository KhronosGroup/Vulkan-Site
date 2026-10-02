# Visual Studio: Windows-Native Development

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/AI_Assisted_Vulkan/02_environment_setup/03_visual_studio.html

## Table of Contents

- [Introduction](#_introduction)
- [Debug-to-chat](#_debug_to_chat)
- [Setting up the workflow](#_setting_up_the_workflow)
- [Setting_up_the_workflow](#_setting_up_the_workflow)
- [Step 1: solution-aware planning with Copilot](#_step_1_solution_aware_planning_with_copilot)
- [Step_1:_solution-aware_planning_with_Copilot](#_step_1_solution_aware_planning_with_copilot)
- [Step 2: debug-to-chat for live errors](#_step_2_debug_to_chat_for_live_errors)
- [Step_2:_debug-to-chat_for_live_errors](#_step_2_debug_to_chat_for_live_errors)
- [Step 3: local model for sensitive code](#_step_3_local_model_for_sensitive_code)
- [Step_3:_local_model_for_sensitive_code](#_step_3_local_model_for_sensitive_code)
- [Tradeoffs](#_tradeoffs)
- [Before moving on](#_before_moving_on)
- [Before_moving_on](#_before_moving_on)
- [Summary](#_summary)

## Content

For many graphics engineers on Windows, Visual Studio (MSVS) is the default. Its integration with MSVC and its debugger have made it the common choice for Windows-based Vulkan development for a long time.

A stock Visual Studio setup, though, doesn’t do anything with AI on its own. What’s worth building is a link between the debugger’s live state and a chat-based assistant, so you’re not manually copying values out of the Locals window every time you ask a question.

Visual Studio’s advantage over most editors is that it owns the entire execution state during a debug session, not just a line of text in a console. That state can be handed to an assistant directly instead of transcribed by hand.

For example: you hit a `VUID-VkBufferMemoryBarrier-buffer-01191` error from an invalid offset. Normally you’d pause, check the `VkBufferMemoryBarrier` struct in the Locals window, and compare the offset against your buffer’s size by hand. With **Copilot Chat**, you can instead highlight the error and ask why the offset is invalid for the current `stagingBuffer` — Copilot can read `stagingBuffer.size` and `barrier.offset` directly from the debugger’s state, which is what lets it catch something like a hardcoded 16-byte alignment constant instead of a query against `minStorageBufferOffsetAlignment`.

Make sure **GitHub Copilot** is installed and has indexed your `.sln`. Use `@workspace` for tasks that span the whole project.

@workspace Create a new 'DescriptorBufferHandler' class.
It must follow the naming conventions in 'DescriptorManager.cpp'
and implement the 'VK_EXT_descriptor_buffer' extension.

When your application crashes with a Vulkan error or validation VUID, keep the debugger active and use **Copilot Chat**.

# Copy the VUID from the 'Output' window and ask:
Why is this VUID-VkBufferMemoryBarrier-buffer-01191 occurring
for our 'stagingBuffer'? Check the 'Locals' window for
the current offset and buffer size.

For rendering logic you’d rather not send to a cloud provider, configure the **Continue** extension with a local **Qwen 3-Coder** model and the Vulkan MCP server. This assumes you’ve already built `mcp-Vulkan` as described in [the environment setup introduction](01_introduction.html#_first_step_building_the_vulkan_mcp_server).

{
  "mcpServers": [
    {
      "name": "Vulkan-Registry",
      "command": "node",
      "args": ["/path/to/mcp-Vulkan/vulkan/build/index.js"]
    }
  ]
}

**Resource cost.** Visual Studio is already heavy; adding AI extensions and their indexing on top can produce noticeable UI lag, particularly with less than 32GB of RAM. If you see the indexing icon spin for minutes after opening a large solution, consider disabling older features like IntelliCode to free up headroom for Copilot and local models.

**Where it helps: boilerplate as a description.** Instead of typing out a 20-line `VkGraphicsPipelineCreateInfo`, you can write a comment describing the pipeline you want — `// wireframe overlay pipeline, no culling` — and let the assistant fill in the structure based on your existing pipeline code, then check its work. That review step matters; treat the output as a draft, not a finished answer.

The rest of this tutorial assumes your Visual Studio setup has both a solution-aware model (Copilot, for architectural work and cross-file planning) and a local model via Continue (for cost-free iteration on sensitive code). Once both are wired in, continue to [Goose & Local Intelligence](05_goose_native_agent.html) to set up an autonomous agent and local inference.

An AI-connected Visual Studio setup is mostly about wiring the debugger’s state into chat, so questions about a crash or a VUID come with the actual runtime values attached instead of a description you typed from memory.

Next: the [Goose native agent](05_goose_native_agent.html) chapter. macOS users may also want to compare against the [Xcode & Apple Silicon](04_xcode_apple.html) chapter.

[Previous: Environment Introduction](01_introduction.html) | [Next: Goose Native Agent](05_goose_native_agent.html)
