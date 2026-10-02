# AI + RenderDoc Integration: Automated GPU Analysis

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/AI_Assisted_Vulkan/06_debugging/03_renderdoc_ai_integration.html

## Table of Contents

- [Introduction](#_introduction)
- [Programmatic inspection](#_programmatic_inspection)
- [Example: a missing texture](#_example_a_missing_texture)
- [Example:_a_missing_texture](#_example_a_missing_texture)
- [Step 1: Ask for a targeted state check](#_step_1_ask_for_a_targeted_state_check)
- [Step_1:_Ask_for_a_targeted_state_check](#_step_1_ask_for_a_targeted_state_check)
- [Step 2: The finding](#_step_2_the_finding)
- [Step_2:_The_finding](#_step_2_the_finding)
- [Step 3: The fix](#_step_3_the_fix)
- [Step_3:_The_fix](#_step_3_the_fix)
- [Connecting Goose to RenderDoc](#_connecting_goose_to_renderdoc)
- [Connecting_Goose_to_RenderDoc](#_connecting_goose_to_renderdoc)
- [Why structured state helps](#_why_structured_state_helps)
- [Why_structured_state_helps](#_why_structured_state_helps)
- [Summary](#_summary)

## Content

**RenderDoc** is the standard tool for Vulkan debugging — it lets you freeze a frame and inspect every draw call, descriptor set, and pipeline state object on the GPU. But a complex scene can have thousands of events in a single frame, and finding the one draw call responsible for shadow acne or a missing texture is often slow, manual work.

Combining RenderDoc’s state-tracking with an AI agent turns some of that manual search into something closer to a scripted audit.

To connect AI with RenderDoc, you go through the **RenderDoc command-line tool (`renderdoccmd`)** instead of the GUI. This lets an agent (such as Goose) browse a GPU capture programmatically.

Say you’re facing a black screen: the draw call is happening, but you don’t know which of the pipeline states is misconfigured. Working through the RenderDoc UI by hand can easily take an hour for a case like this.

With an agent that can run `rdc-cli`, you can instead ask it directly: **"Analyze the latest RenderDoc capture. Find the draw call for the 'MainPass' and audit the descriptor sets. Why is the fragment shader receiving a zero-value for the diffuse texture?"**

The agent exports the pipeline state (as JSON or Markdown), compares it against your C++ source via the Context Bridge, and reports back what it finds.

Say you’re debugging a missing texture. In RenderDoc, the texture looks bound, but the shader output is black.

Instead of clicking through tabs, ask directly: **"Goose, use the RenderDoc tool to check the `VkSampler` state for the third draw call in the 'G-Buffer' pass."**

The agent exports the sampler state and finds `minLod` set to `10.0f`, while the texture only has 5 mip levels.

**"You are binding a sampler that is forcing the GPU to sample from a non-existent mip-level. This is why the texture appears black. Check your `SamplerBuilder` in `VulkanContext.cpp`."**

Since the agent also has your source code, it can propose a fix directly — for example, refactoring the sampler creation logic to clamp `minLod` to the actual mip count of the bound image.

To automate this kind of analysis, give your agent access to the **RenderDoc command-line tool (`renderdoccmd`)** so it can treat a `.rdc` capture like a document it can query.

**Make sure RenderDoc is on your PATH.**
The `renderdoccmd` binary (or `renderdoccmd.exe` on Windows) needs to be reachable from your terminal.

# On Windows (PowerShell)
$env:Path += ";C:\Program Files\RenderDoc"
# On Linux
export PATH=$PATH:/usr/bin/renderdoc

**Capture a frame.**
Use the RenderDoc GUI to capture a frame from your Vulkan application and save it as `debug_capture.rdc`.

**Ask the agent to inspect it.**
In your Goose session, ask it to list draw calls and find the one using a specific shader.

Goose, list all draw calls in 'debug_capture.rdc' using 'renderdoccmd'.
Find the one using 'MainPass' and export its full
pipeline state to a structured file named 'state.txt'.

**Run the comparison against source.**
Once the state is exported, ask the assistant to compare it with your source.

Compare 'state.txt' with the 'VkGraphicsPipelineCreateInfo'
logic in 'Renderer.cpp'. Are there any mismatches in the
depth test settings or cull mode that could explain
why our geometry is missing?

**Fix at the source.**
The agent identifies that `depthTestEnable` is `VK_FALSE` in the capture when it should be `VK_TRUE` in your code, finds the line responsible, and offers a fix.

An AI model can’t usefully "look at" the RenderDoc GUI, but it can work well with structured data. Once you export GPU state to a format it can parse, it can catch things like redundant pipeline rebinds — for instance, the same pipeline bound five times in a command buffer with no draw calls in between.

It can also check memory alignment (does a 12-byte vertex buffer offset satisfy a 16-byte hardware requirement?), and cross-reference a validation layer error against the exact point in the RenderDoc timeline where it originated.

Feeding RenderDoc’s structured state to an AI agent turns some GPU debugging from clicking through nested menus into asking a direct question and checking the answer. It won’t replace understanding what the pipeline state means, but it does cut down on the manual comparison work.

Next: [Shader Debugging & Log Parsing](04_shader_debugging_logs.html)
