# Separate Image and Sampler Descriptors — when and why

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Advanced_Topics/Separate_Image_Sampler_Descriptors.html

## Table of Contents

- [Our default](#_our_default)
- [When to split](#_when_to_split)
- [When_to_split](#_when_to_split)
- [Practical guidance](#_practical_guidance)
- [Where to look in the code](#_where_to_look_in_the_code)
- [Where_to_look_in_the_code](#_where_to_look_in_the_code)
- [Future work ideas](#_future_work_ideas)
- [Future_work_ideas](#_future_work_ideas)
- [What to read next](#_what_to_read_next)
- [What_to_read_next](#_what_to_read_next)

## Content

Vulkan lets you bind an image view and a sampler either together (combined image sampler) or separately. Combined bindings are simpler to teach and maintain. Separate bindings give you flexibility (e.g., reuse one sampler across many images; change only the sampler states).

In this sample we default to combined image samplers because they keep the descriptor model simple while we’re focused on bigger engine concepts (streaming, synchronization, pass structure).

We prefer combined image samplers in this sample for readability and because most materials don’t swap samplers at runtime.

* 
You want to toggle sampler states (e.g., enable/disable anisotropy) across many textures without updating every descriptor.

* 
You have a library of sampler objects (point/linear/aniso/wrap/clamp) and want to mix‑and‑match with images.

* 
Keep layouts small and stable for teaching.

* 
If you introduce split bindings, document lifetime rules clearly: images and samplers can now change independently.

* 
Texture and sampler creation:

`renderer_resources.cpp`

Descriptor layouts and bindings:

* 
`renderer_pipelines.cpp`

Descriptor updates at the per-frame safe point:

* 
`renderer_rendering.cpp`

If you want to demonstrate separate image/sampler descriptors concretely:

* 
Create a small sampler “library” (point/linear/aniso, wrap/clamp) and switch sampler indices from the UI.

* 
Use shared samplers with a large texture table to reduce descriptor update volume during streaming.

* 
Add per-material sampler selection (e.g., nearest for pixel art signage).

* 
[Descriptor Indexing UpdateAfterBind](Descriptor_Indexing_UpdateAfterBind.html)

* 
[Mipmaps and LOD](Mipmaps_and_LOD.html)

* 
[Synchronization and Streaming](Synchronization_and_Streaming.html)
