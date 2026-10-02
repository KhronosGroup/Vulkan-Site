# VK_EXT_robustness2 — safer defaults for real‑world engines

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Advanced_Topics/Robustness2.html

## Table of Contents

- [What it gives you](#_what_it_gives_you)
- [What_it_gives_you](#_what_it_gives_you)
- [How we use it here](#_how_we_use_it_here)
- [How_we_use_it_here](#_how_we_use_it_here)
- [When to enable](#_when_to_enable)
- [When_to_enable](#_when_to_enable)
- [Where to look in the code](#_where_to_look_in_the_code)
- [Where_to_look_in_the_code](#_where_to_look_in_the_code)
- [Takeaways](#_takeaways)
- [Future work ideas](#_future_work_ideas)
- [Future_work_ideas](#_future_work_ideas)
- [What to read next](#_what_to_read_next)
- [What_to_read_next](#_what_to_read_next)

## Content

Vulkan lets you run fast and close to the metal. That also means a bad index or out‑of‑range access can produce undefined results. `VK_EXT_robustness2` tightens that up so mistakes fail predictably instead of corrupting memory or producing flicker.

* 
Robust buffer access 2 — out‑of‑bounds buffer reads return zero; writes are discarded.

* 
Robust image access 2 — out‑of‑range image coordinates clamp or return zero per the spec.

* 
Null descriptors — a descriptor can be left “null” and the shader sees a defined zero value instead of UB.

These behaviors make the engine more forgiving while students iterate and while textures stream in.

* 
We enable the extension and feature structs during device creation when available.

* 
Shaders are written assuming legal ranges, but if a streaming texture or optional binding is temporarily missing, sampling a null descriptor is defined and safe.

* 
The Forward+/reflection paths avoid mid‑frame descriptor edits; robustness2 then acts as an extra safety net.

Always enable when the device supports it for teaching samples and tools. For shipping titles, you can still keep it on; the performance cost is generally negligible on modern drivers, and the safety is worth it.

* 
Device extension/feature enable:

`renderer_core.cpp`

* 
`vulkan_device.cpp`

Bounds checks and defensive indexing in the Ray Query shader:

* 
`shaders/ray_query.slang` (bounds checks for `geometryInfoCount` / `materialCount`)

Safe descriptor update patterns (so you don’t rely on robustness for correctness):

* 
`renderer_rendering.cpp` (per-frame safe point)

* 
`Descriptor_Indexing_UpdateAfterBind.adoc`

* 
Robustness doesn’t replace good synchronization and lifetime rules; it complements them.

* 
Null descriptors and “safe zero” reads make streaming and feature toggles less fragile.

If you want to stress-test robustness (without turning the engine into a debugging tool):

* 
Add a development-only “fault injection” toggle that intentionally feeds out-of-range indices in a controlled shader path.

* 
Add a small runtime report that prints whether `VK_EXT_robustness2` is enabled on the current device.

* 
Add a unit-style GPU test scene that exercises missing textures / missing buffers while keeping VVL clean.

* 
[Synchronization and Streaming](Synchronization_and_Streaming.html)

* 
[Descriptor Indexing UpdateAfterBind](Descriptor_Indexing_UpdateAfterBind.html)

* 
[Ray Query Rendering](Ray_Query_Rendering.html)
