# Phase 1: System Design

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/AI_Assisted_Vulkan/05_workflow/02_phase_1_planning.html

## Table of Contents

- [Introduction: the step people skip](#_introduction_the_step_people_skip)
- [Introduction:_the_step_people_skip](#_introduction_the_step_people_skip)
- [What a good plan covers](#_what_a_good_plan_covers)
- [What_a_good_plan_covers](#_what_a_good_plan_covers)
- [Why use a high-reasoning model for this phase](#_why_use_a_high_reasoning_model_for_this_phase)
- [Why_use_a_high-reasoning_model_for_this_phase](#_why_use_a_high_reasoning_model_for_this_phase)
- [Example: designing a Bloom pipeline](#_example_designing_a_bloom_pipeline)
- [Example:_designing_a_Bloom_pipeline](#_example_designing_a_bloom_pipeline)
- [Step 1: Give it real context](#_step_1_give_it_real_context)
- [Step_1:_Give_it_real_context](#_step_1_give_it_real_context)
- [Step 2: Check the plan against your hardware](#_step_2_check_the_plan_against_your_hardware)
- [Step_2:_Check_the_plan_against_your_hardware](#_step_2_check_the_plan_against_your_hardware)
- [Step 3: Write it down](#_step_3_write_it_down)
- [Step_3:_Write_it_down](#_step_3_write_it_down)
- [Practical steps for planning a feature](#_practical_steps_for_planning_a_feature)
- [Practical_steps_for_planning_a_feature](#_practical_steps_for_planning_a_feature)
- [Summary](#_summary)

## Content

Planning is the phase developers most often skip. It’s tempting to jump straight into `VkGraphicsPipelineCreateInfo` boilerplate, only to realize halfway through that the descriptor management doesn’t support the bindless texture system you actually wanted.

Using a high-reasoning model to design the feature before writing any code helps here — not because planning is a novel idea, but because a model is good at surfacing the parts of a design you’d otherwise only discover through a rewrite. The goal is a roadmap that’s specific enough to implement against.

A useful plan for a Vulkan feature needs to cover a few things clearly:

**Resource lifecycle.** Which buffers, images, and samplers does the feature need, who owns them, and when are they created and destroyed? Skipping this is the most common source of memory leaks and use-after-free bugs in AI-generated code, because the model has no way to infer ownership you never wrote down.

**Synchronization strategy.** State the required `VkImageMemoryBarrier2` transitions for each stage of the feature explicitly. This is the part of Vulkan development most likely to go wrong, and writing it down during planning gives the model something concrete to implement against later, instead of guessing.

**Interface boundaries.** How does the new feature interact with your existing `VulkanDevice`, `Swapchain`, or `CommandPool` wrappers? Giving the model your existing class signatures up front means the generated code is more likely to fit your engine instead of requiring a rewrite to integrate.

Architectural planning means holding several interacting systems in mind at once. Small local models are good at writing an individual function, but tend to struggle when a change has implications across the whole engine.

Larger reasoning models (Claude- or GPT-class) are better suited here — they can take a few hundred lines of existing architecture as context and reason about how a new feature fits in without breaking existing synchronization or violating the memory alignment rules of your target hardware. They’re still not infallible, and it’s worth checking their suggestions against the spec rather than taking them at face value.

Don’t just ask "design a bloom system." Give the model the actual files it needs — your `VulkanContext.hpp`, your memory management headers, and the relevant parts of your renderer.

**Example prompt:** "I am implementing a Bloom pass. Our engine uses Vulkan 1.3 with Dynamic Rendering and VMA for memory. Here is our `Renderer` class. Design a Bloom pipeline that uses a 13-tap downsample/upsample chain. Provide a roadmap that defines the class structure and the image layout transitions for each mip level."

The model will produce a plan, but you still need to review it against constraints it doesn’t know about. For example, if it suggests `STORAGE_IMAGE_OPTIMAL` for the bloom pass, you might know your target mobile hardware (a Mali GPU, say) performs better with `ATTACHMENT_OPTIMAL` and input attachments instead. Push back and ask it to revise the plan to use input-attachment-style reads for the upsample pass to save bandwidth on mobile.

The output is a `bloom_design.md` file — a concrete technical spec you’ll use as the basis for the implementation phase.

Planning something larger, like a frame graph or a clustered renderer, benefits from a bit more structure than a single prompt:

**Load context first.**
Use your MCP tools (for example, an `mcp-vulkan` server) to pull the current spec for the feature you’re building, so the model is working from Vulkan 1.3/1.4 semantics rather than outdated patterns it may have seen in training.

**State your constraints explicitly.**

I am adding a Bloom pass.
Our engine uses a fixed 24-bit depth buffer.
We use VMA for all allocations.
We are using Dynamic Rendering (no manual RenderPasses).

**Ask for the plan in layers.**

Generate a 3-layer roadmap:
1. Architectural design: class hierarchy, state management
2. Data flow: descriptor layout, push constants, VMA allocation flags
3. Synchronization map: pipeline barriers, layout transitions, image memory dependencies

**Review, then commit it to a file.**
Read through the plan critically before accepting it. Once you’re satisfied, have the model write it to a `DESIGN_DOC.md` file in your repo — this becomes the reference for the implementation phase.

Phase 1 is about using a high-reasoning model to turn a feature idea into a concrete, reviewable plan before writing any C++. The output — a design doc with resource lifecycle, synchronization, and interface boundaries spelled out — is what makes the implementation phase go smoothly instead of turning into a series of disconnected patches.

Next: [Phase 2: Implementation](03_phase_2_implementation.html)
