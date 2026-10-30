# Push Constants — per‑object material properties

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Advanced_Topics/Push_Constants_Per_Object.html

## Table of Contents

- [How we use them](#_how_we_use_them)
- [How_we_use_them](#_how_we_use_them)
- [Where to look](#_where_to_look)
- [Where_to_look](#_where_to_look)
- [Guidelines](#_guidelines)
- [Future work ideas](#_future_work_ideas)
- [Future_work_ideas](#_future_work_ideas)
- [What to read next](#_what_to_read_next)
- [What_to_read_next](#_what_to_read_next)

## Content

Push constants are tiny pieces of data you can send to shaders without creating or updating buffers. They’re perfect for per‑draw material knobs.

In this engine we use push constants for **values that change per draw call** (material factors and “is there a texture?” flags). Anything that changes less frequently (camera data, light lists, big arrays) stays in UBOs/SSBOs.

We pack the common PBR controls (base color factor, metallic/roughness, texture presence flags, emissive strength, transmission, IOR) into a single push constant block and update it before each draw.

* 
C++ push constant struct and update call:

`renderer.h` (`MaterialProperties`)

* 
`renderer_rendering.cpp` (where we push per-draw material properties)

Shader push constant block:

* 
`shaders/pbr.slang` (`` block)

PBR helper functions used by the shader:

* 
`shaders/pbr_utils.slang`

* 
`shaders/lighting_utils.slang`

* 
Keep the block small (Vulkan guarantees at least 128 bytes). This sample fits comfortably.

* 
Use push constants for values that change every draw call. Use UBO/SSBO for larger, less‑frequent data.

If you want to extend this pattern:

* 
Split “rarely changing per-material data” into a GPU material buffer and use push constants only for the per-draw index.

* 
Add a second push constant block for per-draw debug visualizations (development-only) to keep it out of hot UBO paths.

* 
Add a material override system (force roughness/metallic for entire scene) by layering a global UBO on top.

* 
[Rendering Pipeline Overview](Rendering_Pipeline_Overview.html)

* 
[Descriptor Indexing UpdateAfterBind](Descriptor_Indexing_UpdateAfterBind.html)

* 
[Ray Query Rendering](Ray_Query_Rendering.html)
