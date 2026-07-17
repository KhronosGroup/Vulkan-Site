# Multimodal AI: Visual Reasoning Capabilities

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/AI_Assisted_Vulkan/04_multimodal_ai/01_introduction.html

## Table of Contents

- [Introduction](#_introduction)
- [What a multimodal model actually does](#_what_a_multimodal_model_actually_does)
- [What_a_multimodal_model_actually_does](#_what_a_multimodal_model_actually_does)
- [Why this is useful for Vulkan specifically](#_why_this_is_useful_for_vulkan_specifically)
- [Why_this_is_useful_for_Vulkan_specifically](#_why_this_is_useful_for_vulkan_specifically)
- [What’s in this section](#_whats_in_this_section)
- [What’s_in_this_section](#_whats_in_this_section)

## Content

Vulkan bugs are usually visual before they’re anything else. When something goes wrong in your engine, the first evidence isn’t a crash or a log line — it’s a flicker on screen, a missing shadow, or a moiré pattern on a texture.

Text-only assistants make you describe that: "the shadows have jagged edges," "the textures flicker when the camera moves." A lot gets lost in that translation. This section covers multimodal models, which can take a screenshot directly and reason about what’s in it, instead of relying entirely on your description.

A multimodal model (Qwen 3-VL and GPT-5.3 are current examples) is trained on both images and text, so it can connect pixels in a screenshot to graphics concepts rather than just describing what’s visible.

Take shadow acne as an example: stripes of self-shadowing across a surface. If you describe that as "stripes on the floor," a text-only model might guess at a shader bug or a texture sampling issue. A multimodal model looking at the actual screenshot has a better shot at naming the pattern correctly and pointing at `depthBiasConstantFactor` being too low for your shadow map resolution — though you should still treat that as a starting hypothesis to check, not a confirmed diagnosis.

A single visual symptom in Vulkan can have several unrelated causes. Flickering might be a synchronization hazard, a depth-testing error, or a swapchain acquisition race. A missing mesh might be back-face culling, a wrong vertex buffer offset, or a shader stage mismatch. A multimodal assistant can narrow this down — for example, recognizing that triangles popping in and out looks like Z-fighting, and suggesting you check your near/far plane ratio against your depth buffer precision. It’s a way to generate plausible candidates faster; you still verify against the validation layers and RenderDoc.

**[Vision Models for Graphics](02_multimodal_models.html):** The current vision-capable models (Qwen 3-VL, Gemma 4) and how they differ from the code-focused models covered earlier.

**[Visual Bug Diagnosis](03_visual_bug_diagnosis.html):** Walking through screenshots of common Vulkan artifacts — shadow acne, texture bleeding, Z-fighting — and how to prompt for a useful diagnosis.

**[Expectations & Limits](04_expectations_limits.html):** Where this breaks down — resolution limits, hardware-specific behavior, and why the model still needs your code as context.

By the end, you should be able to use a vision-capable model as one more diagnostic input, alongside the validation layers and RenderDoc, not as a replacement for either.

Next: [Vision Models for Graphics](02_multimodal_models.html)
