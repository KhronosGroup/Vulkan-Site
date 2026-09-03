# Rendering Pipeline Overview (this sample)

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Advanced_Topics/Rendering_Pipeline_Overview.html

## Table of Contents

- [The pass order](#_the_pass_order)
- [The_pass_order](#_the_pass_order)
- [Where to look in the code](#_where_to_look_in_the_code)
- [Where_to_look_in_the_code](#_where_to_look_in_the_code)
- [Why this shape](#_why_this_shape)
- [Why_this_shape](#_why_this_shape)
- [Future work ideas](#_future_work_ideas)
- [Future_work_ideas](#_future_work_ideas)

## Content

This engine uses Vulkan Dynamic Rendering with a small, readable sequence of passes. The order is deliberate: it keeps tone mapping explicit, keeps transparency sane, and makes it easy to plug in optional features like planar reflections or the Ray Query compute path.

Optional reflection pass (off‑screen):

* 
Mirror the camera across a plane (e.g., floors or windows).

* 
Render opaque geometry into a reflection render target (color + depth).

* 
Transition the reflection image to `SHADER_READ_ONLY_OPTIMAL` for the next frame.

Opaque to off‑screen color:

* 
Render all opaque objects into an off‑screen color image (`opaqueSceneColor`).

* 
Depth is read/write as usual (or read‑only if you ran a depth pre‑pass).

Composite to swapchain:

* 
End the opaque rendering.

* 
Transition `opaqueSceneColor` to `SHADER_READ_ONLY_OPTIMAL`.

* 
Begin a new rendering instance targeting the swapchain image and draw a full‑screen pass that samples the off‑screen color (tone mapping included).

Transparent on top:

* 
Keep the swapchain image as the color attachment and bind the scene depth.

* 
Render transparent objects (glass/liquids) back‑to‑front.

* 
Glass samples the prior frame’s reflection texture when enabled.

UI:

* 
Render the UI on top.

* 
Transition the swapchain image to `PRESENT_SRC_KHR` after ending rendering.

* 
Main render loop + pass ordering:

`renderer_rendering.cpp`

Pipeline setup (dynamic rendering attachments, layouts, formats):

* 
`renderer_pipelines.cpp`

Composite pass shader (tone mapping + presentation):

* 
`shaders/composite.slang`

PBR shading utilities shared by multiple pipelines:

* 
`shaders/pbr.slang`

* 
`shaders/pbr_utils.slang`

* 
`shaders/lighting_utils.slang`

* 
A single off‑screen buffer makes tone mapping explicit and avoids gamma‑incorrect copy paths.

* 
Transparent ordering stays simple because the swapchain is the current color attachment in that pass.

* 
The reflection pass is optional and self‑contained.

If you want to take this pipeline further:

* 
Add a depth pre-pass for heavy scenes (helps early-z and enables more accurate Forward+ clustering).

* 
Add a lightweight bloom chain that runs between the off-screen opaque pass and the composite.

* 
Add a dedicated transparent resolve path (weighted blended OIT) if you need lots of overlapping glass.

* 
Demonstrate hybrid rendering by calling ray queries from a raster shader (reflection probe, shadow test, or glass-only reflections).
