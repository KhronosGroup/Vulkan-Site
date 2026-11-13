# VK_EXT_shader_tile_image — fast access to tile data

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Advanced_Topics/Shader_Tile_Image.html

## Table of Contents

- [What problem it solves](#_what_problem_it_solves)
- [What_problem_it_solves](#_what_problem_it_solves)
- [How we handle it in this sample](#_how_we_handle_it_in_this_sample)
- [How_we_handle_it_in_this_sample](#_how_we_handle_it_in_this_sample)
- [Guidance](#_guidance)
- [Where to look in the code](#_where_to_look_in_the_code)
- [Where_to_look_in_the_code](#_where_to_look_in_the_code)
- [Future work ideas](#_future_work_ideas)
- [Future_work_ideas](#_future_work_ideas)
- [What to read next](#_what_to_read_next)
- [What_to_read_next](#_what_to_read_next)

## Content

Some GPUs expose “tile” or “subpass” data paths that let shaders read from on‑chip color/depth without a round trip to memory. `VK_EXT_shader_tile_image` is a portable way to tap into that.

In this sample we treat it as an optional optimization: the pipeline remains correct without it, and we only take a “fast path” when the device advertises support.

Post‑lighting texture reads from the just‑written color can be expensive. With tile image access, certain patterns become cheaper and more deterministic on supported hardware.

* 
We enable the feature if present and expose a boolean you can check in code.

* 
The renderer still uses clean Synchronization 2 barriers and ends dynamic rendering before formal layout transitions. That keeps the code understandable on devices that don’t support tile reads.

Use it as an optimization. Write code that’s correct everywhere, then add tile‑image fast paths when available.

* 
Feature detection and enablement:

`renderer_core.cpp`

Dynamic rendering setup and attachment transitions (kept explicit for clarity):

* 
`renderer_rendering.cpp`

* 
`renderer_pipelines.cpp`

If you want to demonstrate tile-image usage more directly:

* 
Add a small “local read” post effect that reads from the current color attachment and compares with a regular sampled path.

* 
Add a device capability print (development-only) so students can see when the fast path is active.

* 
Add a micro-benchmark scene and compare bandwidth on tile-based GPUs.

* 
[Dynamic Rendering Local Read](Dynamic_Rendering_Local_Read.html)

* 
[Frame Pacing](Synchronization_2_Frame_Pacing.html)

* 
[Rendering Pipeline Overview](Rendering_Pipeline_Overview.html)
