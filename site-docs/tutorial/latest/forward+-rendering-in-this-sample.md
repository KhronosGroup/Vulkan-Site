# Forward+ Rendering in this Sample

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Advanced_Topics/ForwardPlus_Rendering.html

## Table of Contents

- [What we do](#_what_we_do)
- [What_we_do](#_what_we_do)
- [Where to look in code](#_where_to_look_in_code)
- [Where_to_look_in_code](#_where_to_look_in_code)
- [Tips](#_tips)
- [Future work ideas](#_future_work_ideas)
- [Future_work_ideas](#_future_work_ideas)
- [What to read next](#_what_to_read_next)
- [What_to_read_next](#_what_to_read_next)

## Content

Forward+ keeps the forward shading model you already know, but limits the per‑pixel light loop to only the lights that might affect that pixel. It does this by dividing the screen into tiles (and optionally Z‑slices) and building per‑tile light lists with a compute pass.

* 
Depth pre‑pass (optional): populates depth so the compute stage can cull by Z more effectively.

* 
Compute pass: assigns lights to tiles (and slices) and writes compact lists to SSBOs.

* 
Main PBR pass: for each pixel, fetch the tile header and iterate only those lights.

* 
Buffers, per-frame state, and descriptor bindings:

`renderer_compute.cpp` and `renderer_resources.cpp` (look for the `ForwardPlusPerFrame` data)

Compute dispatch and per-frame parameters:

* 
`renderer_rendering.cpp`

Shader-side light list consumption:

* 
`shaders/pbr.slang` (Forward+ light loop)

* 
Tune tile size; 16×16 is a reasonable default for 1080p.

* 
If you pre‑pass depth, use `depthWriteEnable=false` and `depthCompare=Equal` in the subsequent opaque color pass.

If you want to take this beyond a compact sample:

* 
Upgrade from 2D tiles to clustered Forward+ (depth slicing and/or logarithmic Z).

* 
Add a small light “budget” UI and debug visualizations (tile heatmap) behind a development build flag.

* 
Add shadowing (start with a single directional light shadow map) and extend the tile data to include shadowed light indices.

* 
[Forward+ deferred rendering](Forward_ForwardPlus_Deferred.html)

* 
[Rendering Pipeline Overview](Rendering_Pipeline_Overview.html)

* 
[Frame Pacing](Synchronization_2_Frame_Pacing.html)
