# Understanding Multimodal Models: Vision for Graphics

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/AI_Assisted_Vulkan/04_multimodal_ai/02_multimodal_models.html

## Table of Contents

- [Introduction](#_introduction)
- [How it works](#_how_it_works)
- [How_it_works](#_how_it_works)
- [Evaluating a VLM for graphics work](#_evaluating_a_vlm_for_graphics_work)
- [Evaluating_a_VLM_for_graphics_work](#_evaluating_a_vlm_for_graphics_work)
- [A few current vision models](#_a_few_current_vision_models)
- [A_few_current_vision_models](#_a_few_current_vision_models)
- [Qwen 3-VL](#_qwen_3_vl)
- [Gemma 4](#_gemma_4)
- [Picking a model](#_picking_a_model)
- [Picking_a_model](#_picking_a_model)
- [Summary](#_summary)

## Content

The models covered in earlier sections, like Qwen 3-Coder, are text-only: strong on C++ and the Vulkan spec, but they can’t look at a screenshot. To debug visually, you need a vision-language model (VLM) — a model that pairs a vision encoder with a language model so it can reason about an image, not just recognize objects in it.

A VLM has two main parts. A vision encoder (often a Vision Transformer) processes the image and extracts features — shapes, depth cues, lighting patterns. That gets passed to the language model, which maps those features onto graphics concepts like "moiré pattern" or "Z-fighting."

This is a step beyond OCR, which can read text on screen but has no model of the relationships between pixels. A VLM can look at a flickering triangle and connect it to a likely cause, such as a depth-testing mismatch or precision loss in the projection matrix — again, a hypothesis worth checking, not a verdict.

A few things matter more than general image-recognition benchmarks:

**Resolution and detail retention.** Graphics bugs often live in fine detail — a single row of Z-fighting pixels, a subtle moiré pattern. If a model downsamples your 4K screenshot to something like 224x224 before processing, it will miss these. Look for models that support high-resolution or patch-based input.

**Domain vocabulary.** A general-purpose VLM might describe "lines" on a model; a graphics-aware one distinguishes aliasing, shadow acne, and texture bleeding. A quick test is to show it a clear example of one of these and see whether it names it correctly.

**Spatial reasoning.** Ask it something like "is the shadow correctly aligned with the light source and the occluder?" A model that can identify a break in the shadow’s projection is more useful for debugging than one that just reports "a dark spot."

Alibaba’s Qwen 3-VL handles high-resolution technical images reasonably well — identifying artifacts like shadow acne, or reading UI text from a RenderDoc capture. For example, given a 4K screenshot showing banding in a skybox, it can flag that an 8-bit format like `B8G8R8A8_UNORM` doesn’t have enough precision for a smooth gradient and suggest a 10-bit or 16-bit float format instead.

Google’s Gemma 4 is smaller and faster, which makes it a reasonable choice for quick, local classification — telling apart a culling error from a missing swapchain image, for instance. It runs well on Apple Silicon and recent NVIDIA GPUs.

| Priority | Model | Use case |
| --- | --- | --- |
| Local, private | Gemma 4 | Quick bug classification, visual-adjacent coding. |
| Detail-sensitive analysis | Qwen 3-VL | Diagnosing subtle artifacts like aliasing or banding. |
| Complex planning | Claude 4.6 / GPT-5.3 | Working from sketches or whiteboard photos. |

Adding a multimodal model to your toolset gives your assistant access to the same pixels you’re looking at, so its suggestions can be grounded in what actually rendered rather than only in your description of it.

Next: [Visual Bug Diagnosis](03_visual_bug_diagnosis.html)
