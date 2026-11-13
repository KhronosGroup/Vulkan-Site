# Workflow: System Design to Implementation

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/AI_Assisted_Vulkan/05_workflow/01_introduction.html

## Table of Contents

- [Introduction](#_introduction)
- [Matching the model to the phase](#_matching_the_model_to_the_phase)
- [Matching_the_model_to_the_phase](#_matching_the_model_to_the_phase)
- [Why this matters for Vulkan](#_why_this_matters_for_vulkan)
- [Why_this_matters_for_Vulkan](#_why_this_matters_for_vulkan)
- [Walkthrough: a Bloom post-process pipeline](#_walkthrough_a_bloom_post_process_pipeline)
- [Walkthrough:_a_Bloom_post-process_pipeline](#_walkthrough_a_bloom_post_process_pipeline)

## Content

So far we’ve set up a toolbelt, picked models, and covered multimodal debugging. Now it’s time to put these pieces together into an actual workflow. A useful AI-assisted Vulkan workflow isn’t a single step — it maps roughly onto three phases of traditional graphics development, just faster: design, implementation, and refactoring.

Rather than treating each request to the model as a one-off, it helps to follow a loop that moves from high-level architectural intent down to line-by-line implementation, and finally to longer-running cleanup and migration work.

The main failure mode with AI-assisted development is using the wrong kind of model for the wrong kind of work — asking a fast local model to make an architectural call it doesn’t have the context for, or burning a slow, expensive reasoning model on boilerplate it doesn’t need. Matching the model to the phase avoids most of that.

**Phase 1: System design.** Use a high-reasoning model (such as Claude or GPT-class models) to work out the architecture: data flow, frame graph structure, memory ownership. At this stage the specific bitmasks and struct fields don’t matter yet.

**Phase 2: Implementation.** Use a fast, code-specialized model (such as Qwen 3-Coder) to generate the verbose parts — `VkPipeline` structures, descriptor set boilerplate, and Slang/HLSL shader code.

**Phase 3: Refactoring and review.** Use an agent (such as Goose) for larger, multi-file migrations — moving legacy code to newer patterns, and checking that a new feature doesn’t quietly break existing synchronization or violate Vulkan 1.3/1.4 best practices.

Vulkan has an unusually high ratio of code to architectural decision. A single decision like "move to bindless rendering" touches descriptor management, shader inputs, resource allocation, and synchronization barriers across the whole engine.

Following a structured design → implementation → refactor loop keeps the AI’s output grounded in what you actually decided in Phase 1, rather than producing disconnected snippets that drift out of sync with each other as the feature grows.

The rest of this section works through one concrete example — a Bloom post-process pipeline — across all three phases:

**[Phase 1: System Design](02_phase_1_planning.html):** Prompting a model to produce a technical plan, including the resource lifecycle and layout transitions for a downsample/upsample chain.

**[Phase 2: The Implementation Loop](03_phase_2_implementation.html):** Using a local model, with the plan from Phase 1 as context, to generate the pipelines and compute shaders.

**[Phase 3: Refactoring](04_phase_3_refactoring.html):** Using an agent to check the implementation for synchronization hazards and confirm memory usage matches the hardware limits established earlier via the Context Bridge.

By the end, you should have a repeatable process for building graphics features with AI involved at each stage, without losing track of the overall design.

Next: [Phase 1: System Design](02_phase_1_planning.html)
