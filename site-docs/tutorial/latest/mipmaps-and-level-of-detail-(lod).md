# Mipmaps and Level of Detail (LOD)

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Advanced_Topics/Mipmaps_and_LOD.html

## Table of Contents

- [What we do here](#_what_we_do_here)
- [What_we_do_here](#_what_we_do_here)
- [Where it lives in code](#_where_it_lives_in_code)
- [Where_it_lives_in_code](#_where_it_lives_in_code)
- [Tips](#_tips)
- [Future work ideas](#_future_work_ideas)
- [Future_work_ideas](#_future_work_ideas)
- [What to read next](#_what_to_read_next)
- [What_to_read_next](#_what_to_read_next)

## Content

Mipmaps reduce aliasing and bandwidth by sampling pre‑filtered versions of a texture. LOD is simply “which mip do we use right now?”.

In this sample the key idea is: we want stable, good-looking texture sampling while assets are streaming in, without turning texture management into a giant subsystem.

* 
Use mipmapped textures when available (KTX2 transcodes can include mips).

* 
For raw RGBA uploads, we cap auto‑generated mips to a small number to avoid large VRAM spikes.

* 
Enable sampler anisotropy with a UI slider so you can see the trade‑offs quickly.

* 
Sampler creation and anisotropy slider:

`renderer_resources.cpp` (sampler creation helpers)

* 
ImGui panel in `renderer_rendering.cpp`

Upload path (staging → device image, then transition to `SHADER_READ_ONLY_OPTIMAL`):

* 
`renderer_resources.cpp`

* 
`resource_manager.cpp` / `scene_loading.cpp` (higher-level streaming/control flow)

* 
Prefer compressed formats (BC/ASTC/ETC) with mips for big scenes.

* 
Clamp the max anisotropy to what your device supports.

If you want to take this farther:

* 
Add a per-material “mip bias” control (great for stylized looks and debugging shimmering).

* 
Add texture streaming by mip level (load low mips first, then refine).

* 
Add a small “texture residency” overlay (counts of textures by mip availability).

* 
[Descriptor Indexing UpdateAfterBind](Descriptor_Indexing_UpdateAfterBind.html)

* 
[Synchronization and Streaming](Synchronization_and_Streaming.html)

* 
[Ray Query Rendering](Ray_Query_Rendering.html)
