# Shader Debugging & Log Parsing

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/AI_Assisted_Vulkan/06_debugging/04_shader_debugging_logs.html

## Table of Contents

- [Introduction](#_introduction)
- [Building a log diagnostic script](#_building_a_log_diagnostic_script)
- [Building_a_log_diagnostic_script](#_building_a_log_diagnostic_script)
- [Step 1: Capture the API dump](#_step_1_capture_the_api_dump)
- [Step_1:_Capture_the_API_dump](#_step_1_capture_the_api_dump)
- [Step 2: Script the review](#_step_2_script_the_review)
- [Step_2:_Script_the_review](#_step_2_script_the_review)
- [Step 3: Reviewing the result](#_step_3_reviewing_the_result)
- [Step_3:_Reviewing_the_result](#_step_3_reviewing_the_result)
- [Simulating shader logic](#_simulating_shader_logic)
- [Simulating_shader_logic](#_simulating_shader_logic)
- [Step 1: Extract fragment data](#_step_1_extract_fragment_data)
- [Step_1:_Extract_fragment_data](#_step_1_extract_fragment_data)
- [Step 2: Ask it to work through the logic](#_step_2_ask_it_to_work_through_the_logic)
- [Step_2:_Ask_it_to_work_through_the_logic](#_step_2_ask_it_to_work_through_the_logic)
- [Step 3: The result](#_step_3_the_result)
- [Step_3:_The_result](#_step_3_the_result)
- [Summary](#_summary)

## Content

Vulkan generates a lot of text: a 2,000-page specification, API dumps that can run to tens of thousands of lines, and shaders with hundreds of intermediate variables. Finding the specific bug in all of that is largely a filtering problem, and it’s one an AI assistant can help with — reasoning about shader logic, or scanning a large API dump for a specific pattern.

You can automate a lot of the log search with a small script that captures an API dump and feeds it to **Goose** for review.

Enable the `VK_LAYER_LUNARG_api_dump` layer and redirect the output to a file.

# Run your application with API dumping enabled
VK_INSTANCE_LAYERS=VK_LAYER_LUNARG_api_dump ./VulkanApp > api_dump.txt

Create `diagnose_logs.sh` to hand the agent the relevant log context and a specific instruction.

#!/bin/bash
# diagnose_logs.sh

# 1. Collect the last 5000 lines of the API dump
LOG_CONTEXT=$(tail -n 5000 api_dump.txt)

# 2. Command Goose to find synchronization hazards
goose session --instruction "
Analyze this Vulkan API dump:
$LOG_CONTEXT

Find any 'vkCmdDispatch' followed by a 'vkCmdDraw' where
the output image of the dispatch is used as a texture
in the draw call. Check if there is an intervening
'vkCmdPipelineBarrier'. If not, propose the correct
barrier parameters for 'VkImageMemoryBarrier2'.
"

In one real case, the agent flagged that at line 8,452, a dispatch to a bloom shader was recorded but the barrier before the final composition draw was missing. The bug only showed up under heavy GPU load, which is part of why it was hard to catch by scanning the log manually. Automating the search this way turns a slow manual scrape into a targeted pattern match — though it’s worth spot-checking the flagged lines yourself before assuming the diagnosis is complete.

Shaders are hard to debug because you can’t set a breakpoint the way you would in C++. One workaround is to give an assistant the actual input values for a failing fragment and ask it to reason through the shader logic manually.

Use RenderDoc to find a failing pixel and pull its input variables (for example, `prevCoord`, `currentDepth`, `motionVector`).

Provide the values along with your HLSL or Slang source.

Goose, simulate our 'TemporalAA.hlsl' logic for this fragment.
INPUTS:
prevCoord: [0.45, 0.67]
currentDepth: 0.892
motionVector: [0.001, -0.002]

Based on our 'historyRejection' threshold of 0.05,
why is this pixel flickering?
Is our motion vector scaling correctly for 4K resolution?

In practice, this kind of prompt can catch a mistake like motion vector scaling using the wrong resolution constant — a small arithmetic error that’s tedious to trace by hand but quick for a model to check once it has the actual values in front of it.

Shader reasoning and log parsing round out the debugging toolkit from this section. Between VUID translation, RenderDoc state audits, and log/shader analysis, you now have three complementary ways to bring AI into a debugging session — matched to VUIDs, GPU state, and shader/log data respectively.

Next, we move into MCP tooling, covering how to build custom tools that give your assistant direct access to the Vulkan Registry and hardware limits.

Next: [AI-Assisted Trace Analysis: GFXReconstruct](05_gfxreconstruct_ai.html)
