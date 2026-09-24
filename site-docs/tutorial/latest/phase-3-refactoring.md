# Phase 3: Refactoring

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/AI_Assisted_Vulkan/05_workflow/04_phase_3_refactoring.html

## Table of Contents

- [Introduction: engines keep changing](#_introduction_engines_keep_changing)
- [Introduction:_engines_keep_changing](#_introduction_engines_keep_changing)
- [Handing off the work](#_handing_off_the_work)
- [Handing_off_the_work](#_handing_off_the_work)
- [Why an agent works for this kind of change](#_why_an_agent_works_for_this_kind_of_change)
- [Why_an_agent_works_for_this_kind_of_change](#_why_an_agent_works_for_this_kind_of_change)
- [Example: migrating Bloom to Dynamic Rendering](#_example_migrating_bloom_to_dynamic_rendering)
- [Example:_migrating_Bloom_to_Dynamic_Rendering](#_example_migrating_bloom_to_dynamic_rendering)
- [Step 1: Set boundaries first](#_step_1_set_boundaries_first)
- [Step_1:_Set_boundaries_first](#_step_1_set_boundaries_first)
- [Step 2: Let it iterate](#_step_2_let_it_iterate)
- [Step_2:_Let_it_iterate](#_step_2_let_it_iterate)
- [Step 3: Review before merging](#_step_3_review_before_merging)
- [Step_3:_Review_before_merging](#_step_3_review_before_merging)
- [Summary](#_summary)

## Content

Vulkan best practices shift over time. What was standard in Vulkan 1.0 — a `VkRenderPass` and `VkFramebuffer` for every small subpass — is now considered legacy next to Vulkan 1.3’s Dynamic Rendering.

This phase is less about writing new code with the model and more about supervising an agent that does a broader refactor on its own. Unlike an IDE assistant working on one function at a time, an agent (such as Goose) can work across the whole engine, which matters for changes that need to land consistently from initialization through to the final draw call.

In Phase 3, you’re not co-writing code — you’re giving the agent a goal and reviewing what it produces.

* 
**The problem:** migrating your engine from GLSL to Slang. This touches every shader, your descriptor binding logic, and your shader compilation scripts — a tedious, error-prone week of work if done by hand.

* 
**The agentic approach:** give an agent access to your terminal and project, and describe the goal: "Migrate our `post_process/` folder to Slang. Update the `CMakeLists.txt` to use the Slang compiler, refactor the C++ to use the new reflection data, and fix any compilation errors."

A capable agent doesn’t just propose a diff — it edits the files, runs the build, reads the resulting errors, and keeps iterating until it compiles. That doesn’t mean the result is correct; it means the build passes, which is a lower bar than "correct." Review is still your job.

Refactoring Vulkan code tends to have cascading dependencies. Removing a `VkRenderPass` also means updating:

The `VkGraphicsPipelineCreateInfo` to use `VkPipelineRenderingCreateInfo`.

The `vkCmdBeginRenderPass` call to `vkCmdBeginRendering`.

The layout transitions in every affected memory barrier.

An agent that can run the build and read the compiler’s errors is well suited to this specific kind of task — it can follow the chain of resulting errors across files and keep fixing them until the build succeeds again.

Start from a clean git branch. Be explicit about scope: "Only modify the `BloomRenderer` class and its associated shaders. Do not touch the core `VulkanDevice` initialization yet."

Give the instruction: "Refactor `BloomRenderer.cpp` to use Dynamic Rendering. Replace all `VkRenderPass` members with `VkPipelineRenderingCreateInfo`. Ensure the image barriers are updated to use `VkImageMemoryBarrier2`."

Watch what the agent actually does. In a typical run it will:

* 
Read the code and work out the dependency chain.

* 
Modify the pipelines.

* 
Run the build (`ninja`, or whatever your project uses).

* 
Hit a "variable not found" error because it missed a `vulkan_core.h` update for synchronization2.

* 
Fix the include and rebuild.

A passing build isn’t the same as good code. Read the diff. It’s common to find the agent used `IMAGE_LAYOUT_GENERAL` everywhere just to get things working — correct it explicitly: "Optimize the layouts in the Bloom pass to use `ATTACHMENT_OPTIMAL` for the render targets and `READ_ONLY_OPTIMAL` for the source textures."

Phase 3 uses an agent for the kind of multi-file refactor that’s mechanical but error-prone by hand, while you stay responsible for reviewing what actually lands. That review step isn’t optional — a passing build only tells you the code compiles, not that it’s correct or idiomatic for your engine.

That closes out the three-phase loop covered in this section: design with a high-reasoning model, implementation with a fast local model, and refactoring with an agent. Next, we look at AI-assisted debugging with RenderDoc.

Next: [Pro-Level Debugging](../06_debugging/01_introduction.html)
