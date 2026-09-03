# Frustum Culling and Distance‑based LOD

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Advanced_Topics/Culling.html

## Table of Contents

- [What we do](#_what_we_do)
- [What_we_do](#_what_we_do)
- [Where to look in the code](#_where_to_look_in_the_code)
- [Where_to_look_in_the_code](#_where_to_look_in_the_code)
- [Why it’s set up this way](#_why_its_set_up_this_way)
- [Why_it’s_set_up_this_way](#_why_its_set_up_this_way)
- [Tuning tips](#_tuning_tips)
- [Future work ideas](#_future_work_ideas)
- [Future_work_ideas](#_future_work_ideas)
- [What to read next](#_what_to_read_next)
- [What_to_read_next](#_what_to_read_next)

## Content

Culling is the simplest way to keep your GPU focused on what the camera can see. In this engine we keep it intentionally pragmatic: CPU frustum tests plus a tiny “distance/size LOD” that skips objects that would contribute only a handful of pixels.

* 
CPU frustum culling against per‑mesh AABBs

* 
A tiny distance/size LOD that skips very small objects (projected size threshold)

Extract the camera frustum planes from `proj * view` once per frame.

For each mesh instance, transform its local AABB to world space and test against the planes.

If enabled, estimate projected pixel size and skip objects below a threshold (separate thresholds for opaque vs transparent).

* 
Plane extraction and AABB tests:

`renderer_rendering.cpp` (helpers near the top of the file)

Per-frame culling application:

* 
`renderer_rendering.cpp` (the render list building and per-pass filtering)

UI controls:

* 
ImGui panel in `renderer_rendering.cpp` — “Frustum culling”, “Distance LOD”, and per-pass thresholds

* 
AABBs are cheap to transform and test; doing this on the CPU avoids sending obviously invisible draws.

* 
A projected‑size cutoff is a practical alternative to a full LOD system for large scenes.

* 
Start conservative (smaller thresholds), then increase until you can’t notice pop‑in while moving.

* 
Transparent objects typically need a slightly higher threshold due to blending artifacts at tiny sizes.

If you want to push this further:

* 
Add per-material or per-layer culling rules (e.g., keep signage readable longer).

* 
Add hierarchical culling (BVH of AABBs) for very large scenes.

* 
Add GPU occlusion culling (HZB) once the pipeline grows beyond “readable sample” scale.

* 
Replace the projected-size heuristic with real mesh LODs (or meshlets).

* 
[Rendering Pipeline Overview](Rendering_Pipeline_Overview.html)

* 
[Forward+ Rendering](ForwardPlus_Rendering.html)

* 
[Ray Query Rendering](Ray_Query_Rendering.html)
