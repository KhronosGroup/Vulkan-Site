# Visual Bug Diagnosis: Identifying Graphics Artifacts

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/AI_Assisted_Vulkan/04_multimodal_ai/03_visual_bug_diagnosis.html

## Table of Contents

- [Introduction](#_introduction)
- [Common patterns worth recognizing](#_common_patterns_worth_recognizing)
- [Common_patterns_worth_recognizing](#_common_patterns_worth_recognizing)
- [Z-fighting (depth fighting)](#_z_fighting_depth_fighting)
- [Z-fighting_(depth_fighting)](#_z_fighting_depth_fighting)
- [Shadow acne (self-shadowing)](#_shadow_acne_self_shadowing)
- [Shadow_acne_(self-shadowing)](#_shadow_acne_self_shadowing)
- [Getting a useful diagnosis from a model](#_getting_a_useful_diagnosis_from_a_model)
- [Getting_a_useful_diagnosis_from_a_model](#_getting_a_useful_diagnosis_from_a_model)
- [A step-by-step workflow](#_a_step_by_step_workflow)
- [A_step-by-step_workflow](#_a_step_by_step_workflow)
- [Summary](#_summary)

## Content

Getting past a black screen is only the first hurdle. Once you have images rendering, the next round of problems shows up as flickering, jagged shadows, or texture anomalies — usually the visible signature of a state error or synchronization hazard somewhere in the pipeline.

This section covers using a multimodal model to identify those artifacts from a screenshot and connect them back to the Vulkan state that’s causing them.

Most Vulkan visual bugs follow recognizable patterns, whether you’re doing the pattern-matching yourself or asking a model to do it.

**Symptom:** two overlapping surfaces flicker or alternate as the camera moves.

**Typical scenario:** floor tiles and a ground plane are aligned correctly up close, but start flickering as the camera moves away.

**Likely cause:** a near plane set too small relative to the far plane (say, `0.0001f` near vs `10000.0f` far) loses depth precision in a 24-bit depth buffer. Moving the near plane to something like `0.1f` usually restores stability. A model shown the screenshot can suggest this, but you should confirm the actual near/far values in your code before changing them.

**Symptom:** dark, striped, or moiré-like patterns on a lit surface.

**Typical scenario:** the first directional light is in and the floor looks like it’s covered in barcodes.

**Likely cause:** `depthBiasConstantFactor` or `slopeFactor` in `VkPipelineRasterizationStateCreateInfo` is too low for the shadow map’s resolution, given the light’s angle relative to the surface.

A screenshot alone usually isn’t enough context. Three things help:

A high-resolution screenshot of the artifact itself.

The relevant system context — renderer type (clustered forward, deferred, etc.), target GPU, depth buffer format.

A specific question, rather than "what’s wrong with this."

For example:

> 

Analyze the jagged, barcode-like shadows on the ground in this 4K screenshot. I’m using a cascaded shadow map system with Vulkan 1.3. Identify the likely artifact and suggest which `VkPipelineRasterizationStateCreateInfo` settings to adjust to reduce this without losing depth detail.

Giving the model the image, the context, and a specific goal produces a more grounded answer than a vague description and a low-resolution thumbnail would.

* 
**Capture the evidence.** Take a 4K screenshot of the artifact. If it’s a flickering or motion-based bug, capture a short recording or a sequence of frames so the model can see how it changes over time.

* 
**State your hardware baseline.**

I am running on an NVIDIA RTX 4070 with Vulkan 1.3.
I am using a 24-bit D24_UNORM_S8_UINT depth buffer format.

* 
**Describe the symptom and ask for a spec-level diagnosis.**

Reference the screenshot file: xxx.png
Analyze the jagged, alternating pixels between the two overlapping planes
in this image. I am currently using a 0.01 to 10000.0 depth range.
Diagnose the artifact and suggest the specific Vulkan depth bias or
projection matrix adjustments needed to resolve it.

* 
**Verify and implement.** If the model suggests something like switching to a logarithmic depth buffer, ask it to generate the GLSL for the vertex shader and the C++ to enable `VK_EXT_depth_clip_enable` if needed — then test it against the actual bug before assuming it’s fixed.

A model that can read screenshots narrows down candidate causes faster than working from a text description alone, but it’s still guessing from pixels. You confirm the actual cause and verify the fix.

The next chapter covers where this approach falls short — resolution limits, hardware differences, and cases where the model needs more than a screenshot to be useful.

Next: [Expectations & Limits](04_expectations_limits.html)
