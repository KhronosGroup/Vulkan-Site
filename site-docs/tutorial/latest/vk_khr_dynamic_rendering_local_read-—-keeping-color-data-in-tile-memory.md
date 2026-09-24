# VK_KHR_dynamic_rendering_local_read — keeping color data in tile memory

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Advanced_Topics/Dynamic_Rendering_Local_Read.html

## Table of Contents

- [Why it matters](#_why_it_matters)
- [Why_it_matters](#_why_it_matters)
- [How we approach it](#_how_we_approach_it)
- [How_we_approach_it](#_how_we_approach_it)
- [Practical guidance](#_practical_guidance)
- [Where to look in the code](#_where_to_look_in_the_code)
- [Where_to_look_in_the_code](#_where_to_look_in_the_code)
- [Future work ideas](#_future_work_ideas)
- [Future_work_ideas](#_future_work_ideas)
- [What to read next](#_what_to_read_next)
- [What_to_read_next](#_what_to_read_next)

## Content

Dynamic Rendering lets you render without full render passes/subpasses. The `VK_KHR_dynamic_rendering_local_read` feature is a small but handy addition: it allows same‑pass reads from attachments via tile/local memory paths on hardware that supports it.

Some post‑lighting effects and resolve‑like steps read the color you just wrote. With this feature, drivers can service those reads from fast on‑chip memory instead of round‑tripping to VRAM.

* 
We enable the feature if present and keep codepaths compatible when it isn’t.

* 
We still end a rendering instance before doing layout transitions. The feature does not allow arbitrary barrier misuse — regular Synchronization 2 rules apply.

* 
Treat this as an optimization, not a new API surface.

* 
Keep stage/access masks precise. In this sample we keep transitions outside active rendering for clarity.

* 
Feature detection and enablement:

`renderer_core.cpp` (device feature enable path)

Dynamic rendering setup + barriers:

* 
`renderer_rendering.cpp`

* 
`renderer_pipelines.cpp`

If you want to demonstrate local-read more directly:

* 
Add a small “same-pass” effect that reads the current color attachment (e.g., a simple local contrast or edge highlight).

* 
Add a debug HUD that prints whether the feature is enabled on the current device.

* 
Compare performance with and without local-read on tile-based GPUs (mobile) using a fixed camera path.

* 
[Rendering Pipelne Overview](Rendering_Pipeline_Overview.html)

* 
[Synchronization and Streaming](Synchronization_and_Streaming.html)

* 
[Frame Pacing](Synchronization_2_Frame_Pacing.html)
