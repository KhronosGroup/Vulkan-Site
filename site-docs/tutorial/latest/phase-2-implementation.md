# Phase 2: Implementation

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/AI_Assisted_Vulkan/05_workflow/03_phase_2_implementation.html

## Table of Contents

- [Introduction: turning the plan into code](#_introduction_turning_the_plan_into_code)
- [Introduction:_turning_the_plan_into_code](#_introduction_turning_the_plan_into_code)
- [Working in small steps](#_working_in_small_steps)
- [Working_in_small_steps](#_working_in_small_steps)
- [Why a local model for this phase](#_why_a_local_model_for_this_phase)
- [Why_a_local_model_for_this_phase](#_why_a_local_model_for_this_phase)
- [Example: implementing the Bloom pass](#_example_implementing_the_bloom_pass)
- [Example:_implementing_the_Bloom_pass](#_example_implementing_the_bloom_pass)
- [Step 1: Skeleton generation](#_step_1_skeleton_generation)
- [Step_1:_Skeleton_generation](#_step_1_skeleton_generation)
- [Step 2: Pipeline boilerplate](#_step_2_pipeline_boilerplate)
- [Step_2:_Pipeline_boilerplate](#_step_2_pipeline_boilerplate)
- [Step 3: Shader iteration](#_step_3_shader_iteration)
- [Step_3:_Shader_iteration](#_step_3_shader_iteration)
- [Summary](#_summary)

## Content

Phase 1 gave us a design doc — a verified plan for the post-process system. Phase 2 is where that plan becomes actual C++ and Slang/HLSL code.

This is where it’s worth switching from a high-reasoning cloud model to a faster, code-specialized local model — something like Qwen 3-Coder (30B) or Mistral-Nemo (12B). These models are well suited to the repetitive parts of Vulkan: descriptor set updates, pipeline state objects, and shader logic, with fast enough turnaround to stay in a tight edit-and-check loop.

Implementing a feature works better as a series of small, focused requests than one large generation.

* 
**The problem:** you need a `VkGraphicsPipelineCreateInfo` for the Bloom upsample pass. Writing it by hand usually means copying an existing pipeline and manually adjusting blend states and shader stages.

* 
**A faster path:** give your local model the technical roadmap from Phase 1 as context and ask directly: "Generate the upsample pipeline state. Use additive blending for the color attachment and ensure the vertex input state matches our `ScreenQuad` class."

Because the model has the roadmap as context, it can get the blending factors and quad-rendering conventions right on the first pass more often than if you just described the pipeline from scratch. It’s still worth checking the output against the plan rather than assuming it’s correct.

Implementation work benefits from a fast feedback loop. You’ll end up asking a lot of small, syntactic questions over the course of an hour:

* 
"What’s the enum for a 1D sampler again?"

* 
"Generate the `VkDescriptorImageInfo` array for these mips."

* 
"Refactor this shader to use a structured buffer for the bloom weights."

A local model running through Ollama answers these in milliseconds rather than the round-trip of a hosted API call, which matters more here than raw reasoning quality does.

Point the local model at `bloom_design.md`.
**Prompt:** "Generate the `BloomRenderer.hpp` header. Use the `VulkanDevice` wrapper and implement the `recordDownsampleCommand` and `recordUpsampleCommand` methods as defined in our design doc."
**Result:** a header that follows your engine’s RAII conventions and naming, which you should still skim before accepting.

Vulkan pipeline setup is a common source of bugs, mostly from copy-paste errors.
**Prompt:** "In `BloomRenderer.cpp`, implement the pipeline creation logic. Use the roadmap’s image layout requirements. For the downsample pass, disable depth testing and set the polygon mode to FILL."
**Result:** a working first draft of the pipeline initialization code, worth a careful read against the design doc before moving on.

Shader development is somewhere local models can speed up iteration, but the output needs closer review than the C++ side.
**Prompt:** "Generate a Slang shader for the 13-tap downsample filter. Use the Karis average to prevent fireflies in the bloom, as discussed in the roadmap’s performance section."
**Result:** a shader implementing the requested technique — but be aware that most models have seen far more HLSL and GLSL than Slang in training, and will often produce HLSL-shaped output that doesn’t compile as-is. Treat the generated shader as a starting point: check that Slang-specific constructs (`[shader("fragment")]`, `ParameterBlock`, `interface` types) are used correctly, and expect to fix several issues before it compiles cleanly.

Using a local model for implementation turns a lot of Vulkan’s inherent verbosity into short iteration cycles rather than long manual typing sessions. The tradeoff is that you’re reviewing more generated code, more often — the roadmap from Phase 1 is what keeps that review manageable instead of open-ended.

Next: [Phase 3: Refactoring](04_phase_3_refactoring.html)
