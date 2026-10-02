# Pro-Level Debugging with AI & RenderDoc

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/AI_Assisted_Vulkan/06_debugging/01_introduction.html

## Table of Contents

- [Introduction](#_introduction)
- [Three sources of evidence](#_three_sources_of_evidence)
- [Three_sources_of_evidence](#_three_sources_of_evidence)
- [Why use AI for Vulkan debugging](#_why_use_ai_for_vulkan_debugging)
- [Why_use_AI_for_Vulkan_debugging](#_why_use_ai_for_vulkan_debugging)
- [What’s in this section](#_whats_in_this_section)
- [What’s_in_this_section](#_whats_in_this_section)

## Content

Vulkan debugging is usually a search problem: you get a cryptic **Validation Layer Error (VUID)**, or worse, a black screen, and you have to trace through pipeline state, synchronization barriers, and shader logic to find the one bit that’s wrong.

An AI assistant can help here by acting as a diagnostic aid rather than just a code generator: given the right context, it can correlate error strings, GPU state, and your source code faster than you can do it by hand. This section covers how to set that up.

A debugging session usually draws on three sources of truth:

**VUIDs.** The specific error strings from the Vulkan Validation Layers. These tell you **what** rule you broke.

**RenderDoc state.** The raw state of the GPU — pipelines, descriptors, buffers — at the moment of the draw call. This tells you what the GPU actually saw.

**The AI’s reasoning over both.** When you give an assistant the VUID, the RenderDoc state, and your C++ source together, it can often connect them faster than manually cross-referencing all three yourself.

Vulkan’s validation errors are accurate but dense. A VUID like `VUID-VkGraphicsPipelineCreateInfo-pStages-01565` tells you exactly what’s wrong, but not always where to look. Feeding these strings and GPU captures to an assistant can help with:

* 
**Translating VUIDs.** Turning a dense "image layout mismatch" message into a plain explanation, plus likely locations in your code where the transition was missed.

* 
**Reading GPU state.** Scanning a RenderDoc capture to find why a descriptor set is incompatible with a pipeline, instead of comparing fields by hand.

* 
**Reasoning about shader values.** Taking the input values for a specific failing pixel and checking them against your HLSL or Slang logic to catch mistakes the compiler wouldn’t flag.

It won’t replace understanding what the validation layers and RenderDoc are telling you — treat it as a way to cut down the manual cross-referencing, not as a black box that produces answers you don’t need to check.

**[VUID Auto-Fix](02_vuid_autofix.html):** Turning a raw validation error string into a targeted code fix.

**[AI + RenderDoc Integration](03_renderdoc_ai_integration.html):** Using an agent to read GPU captures and flag redundant state changes or sync hazards.

**[Shader Logs & API Dumps](04_shader_debugging_logs.html):** Feeding large API logs to an assistant to find the source of a state mismatch.

**[AI + GFXReconstruct](05_gfxreconstruct_ai.html):** Capturing and auditing multi-frame Vulkan call streams for driver regressions and resource lifecycle issues.

By the end, you’ll have a repeatable process for working through Vulkan validation and rendering bugs with an assistant in the loop.

Next: [VUID Auto-Fix](02_vuid_autofix.html)
