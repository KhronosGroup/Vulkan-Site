# Planar Reflections in Our Engine

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Advanced_Topics/Planar_Reflections.html

## Table of Contents

- [What are planar reflections?](#_what_are_planar_reflections)
- [What_are_planar_reflections?](#_what_are_planar_reflections)
- [Why we chose planar reflections for the sample](#_why_we_chose_planar_reflections_for_the_sample)
- [Why_we_chose_planar_reflections_for_the_sample](#_why_we_chose_planar_reflections_for_the_sample)
- [How it works in our engine](#_how_it_works_in_our_engine)
- [How_it_works_in_our_engine](#_how_it_works_in_our_engine)
- [Where to look in the code](#_where_to_look_in_the_code)
- [Where_to_look_in_the_code](#_where_to_look_in_the_code)
- [The mirror math (short and sweet)](#_the_mirror_math_short_and_sweet)
- [The_mirror_math_(short_and_sweet)](#_the_mirror_math_short_and_sweet)
- [The rendering steps in detail](#_the_rendering_steps_in_detail)
- [The_rendering_steps_in_detail](#_the_rendering_steps_in_detail)
- [Synchronization and barriers (what matters)](#_synchronization_and_barriers_what_matters)
- [Synchronization_and_barriers_(what_matters)](#_synchronization_and_barriers_what_matters)
- [Descriptors: where is the reflection bound?](#_descriptors_where_is_the_reflection_bound)
- [Descriptors:_where_is_the_reflection_bound?](#_descriptors_where_is_the_reflection_bound)
- [Glass blending: an approachable model](#_glass_blending_an_approachable_model)
- [Glass_blending:_an_approachable_model](#_glass_blending_an_approachable_model)
- [Alternatives and when to choose them](#_alternatives_and_when_to_choose_them)
- [Alternatives_and_when_to_choose_them](#_alternatives_and_when_to_choose_them)
- [Performance tips](#_performance_tips)
- [Troubleshooting](#_troubleshooting)
- [Future work ideas](#_future_work_ideas)
- [Future_work_ideas](#_future_work_ideas)
- [What to read next](#_what_to_read_next)
- [What_to_read_next](#_what_to_read_next)

## Content

You’ve probably noticed shiny floors and windows in real‑world scenes. In games, we often fake that look. In this engine we chose a practical, reliable technique: planar reflections. This page explains what they are, why we use them, how they’re implemented, and when you might want something else.

Planar reflections render a mirror image of the scene across a single plane (e.g., a flat floor or a window). Think of it as a “mirror camera” that looks into the scene from the other side of the reflective surface. We render that mirrored view into a texture, then sample that texture when drawing glass (or any reflective planar surface).

Planar reflections work great for:

* 
Flat mirrors, calm water, polished floors, glass panes.

* 
Scenes where you need stable, high‑quality reflections without heavy noise or temporal instability.

They are not ideal for:

* 
Curved/rough surfaces that need glossy, view‑dependent blurs everywhere.

* 
Arbitrary reflection directions (e.g., metals with complex micro‑geometry).

We want a reflection method that is:

* 
Easy to understand (one extra pass, one extra texture).

* 
Deterministic and stable (no “sparkles” or temporal accumulation headaches).

* 
Practical for a single dominant reflector (glass, floor) in a forward renderer.

Planar reflections deliver all three. They also scale well across GPUs without requiring ray tracing hardware.

We add one small pass and one small blend in the main pass:

Mirror pass (off‑screen)

* 
Compute a mirrored view matrix by reflecting the camera across a plane (e.g., Y=0 for a ground plane).

* 
Render the opaque scene with face culling disabled (or adjusted) into a reflection color+depth target.

* 
Synchronize the reflection image for sampling in the next pass.

Main pass (normal camera)

* 
Draw opaque + transparent objects as usual.

* 
When drawing glass, sample the reflection texture and blend it with glass shading using Fresnel + roughness + a user‑controlled “reflection intensity”.

That’s it. No special render graph magic, no ray queries, no temporal accumulation.

* 
Mirror camera math, reflection pass, and pass ordering:

`renderer_rendering.cpp`

Reflection render targets and pipeline setup:

* 
`renderer_pipelines.cpp`

Reflection sampling + glass shading:

* 
`shaders/pbr.slang`

* 
`shaders/pbr_utils.slang`

Reflection binding and per-frame safe-point updates:

* 
`renderer_rendering.cpp` (reflection descriptor refresh)

You define a plane in world space: `ax + by + cz + d = 0`.

From that plane you build a reflection matrix `R`. Apply `R` to the regular camera view to get the mirrored view. In practice you’ll also flip culling or set `cullMode = none` for the mirrored pass because the winding order changes under reflection.

We also pass the plane to shaders for optional clipping:

* 
A simple dot(product) with world position lets us discard fragments “behind” the plane in the mirror pass.

Mirror pass:

* 
Create a reflection color image (format matches your main pass needs; we pick a color format that the composite/glass pass can sample easily) and a reflection depth image.

* 
Before rendering: transition the reflection color image from `SHADER_READ_ONLY_OPTIMAL` to `COLOR_ATTACHMENT_OPTIMAL` using Synchronization 2 (`vkCmdPipelineBarrier2`). Do the same for depth to `DEPTH_ATTACHMENT_OPTIMAL`.

* 
Begin dynamic rendering, bind the PBR pipeline for opaque objects, and disable culling (or flip front faces).

* 
Render opaque meshes. You can add a clip test against the plane if needed.

* 
End rendering. Transition the reflection color image to `SHADER_READ_ONLY_OPTIMAL` for sampling in the main pass.

Main pass:

* 
Render opaque as usual (we use an off‑screen buffer to do tone‑mapped composite later).

* 
Transparent pass: when drawing glass, sample the reflection texture and blend:

Use Fresnel (stronger at grazing angles) and reduce with roughness.

* 
Multiply by a small “reflection intensity” you can tune in the UI.

We keep it simple with Vulkan Synchronization 2:

* 
Do not change image layouts inside an active dynamic render pass. End it first.

* 
Use `vkCmdPipelineBarrier2` with: correct source/destination stage masks, access masks, and old/new layouts.

* 
Reflection color: `SHADER_READ_ONLY_OPTIMAL → COLOR_ATTACHMENT_OPTIMAL` before mirror pass; back to `SHADER_READ_ONLY_OPTIMAL` after.

* 
Swapchain image: transition to `COLOR_ATTACHMENT_OPTIMAL` for composite/transparent; transition to `PRESENT_SRC_KHR` only after ending the last rendering pass.

* 
We reserve binding 10 in the PBR set for the reflection sampler.

* 
At the per‑frame “safe point” (when previous frame’s work is done), we refresh binding 10 for the current frame to point to the reflection image from the previous frame.

* 
The glass shader checks a UBO flag (`reflectionEnabled`) and samples only when a valid reflection image exists.

Glass is mostly transmission, but we want vivid, plausible reflections. We use:

* 
Fresnel term (Schlick): stronger reflections at grazing angles.

* 
Roughness factor: more roughness → weaker, blurrier reflections (we keep it simple here and just dim the strength).

* 
Reflection intensity slider: exposed in the UI so you can tune visibility in seconds.

This is not a full physical spectral model, and that’s fine. It’s readable and produces convincing results.

Screen‑space reflections (SSR)

* 
Works without extra passes; uses existing color/depth from your frame.

* 
Great for puddles and local effects, but can miss off‑screen objects and suffers from temporal instability.

* 
Choose SSR if you want quick reflections everywhere and can accept occasional artifacts.

Environment maps / cube maps / reflection probes

* 
Very fast; precomputed.

* 
Not view‑accurate for nearby objects; best for distant glossy reflections.

* 
Choose probes for general ambient reflections or when the surface isn’t a perfect mirror.

Ray tracing (hardware) / hybrid approaches

* 
Very accurate; supports complex reflections.

* 
Requires hardware and advanced denoising; more code and performance cost.

* 
Choose RT if you target high‑end GPUs and want “it just looks right” reflections everywhere.

Planar reflections (this sample)

* 
A single extra pass, deterministic and stable.

* 
Perfect for one or a few large planar reflectors (floor, windows, calm water).

* 
Choose this when you want high‑quality mirrors for specific surfaces without adopting ray tracing.

* 
Render the mirror pass at a lower resolution (we provide a resolution scale slider).

* 
Cull aggressively (our CPU frustum culling works for both camera and mirrored camera).

* 
Disable the mirror pass when the reflective surface isn’t visible.

* 
Consider blurring the reflection sample for rough surfaces if you want softer looks.

“Reflections appear too weak”

* 
Increase the Reflection intensity slider and/or reduce roughness.

If you want to push planar reflections further:

* 
Add a roughness-aware blur of the reflection texture (mip chain or separable blur).

* 
Add multiple reflection planes (useful for multi-floor scenes).

* 
Add a screen-space fallback (SSR) and blend with planar where valid.

* 
Add selective ray query reflections for non-planar surfaces (hybrid approach).

If you’re curious about the rest of this sample:

* 
[Synchronization and Streaming](Synchronization_and_Streaming.html)

* 
[Forward+ Rendering](ForwardPlus_Rendering.html)

* 
[Descriptor Indexing and Stable Descriptor Updates](Descriptor_Indexing_UpdateAfterBind.html)

* 
[Rendering Pipeline Overview](Rendering_Pipeline_Overview.html)

Enjoy experimenting. This approach is intentionally straightforward so you can focus on learning Vulkan’s moving parts without getting lost in a maze of techniques.
