# 

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Advanced_Topics/Ray_Query_Rendering.html

## Table of Contents

- [Ray Query Rendering](#_ray_query_rendering)
- [Ray_Query_Rendering](#_ray_query_rendering)
- [Why ray queries?](#_why_ray_queries)
- [Why_ray_queries?](#_why_ray_queries)
- [High-level architecture](#_high_level_architecture)
- [Acceleration structure build (BLAS/TLAS)](#_acceleration_structure_build_blastlas)
- [Acceleration_structure_build_(BLAS/TLAS)](#_acceleration_structure_build_blastlas)
- [Descriptor layout](#_descriptor_layout)
- [Streaming-safe texture access](#_streaming_safe_texture_access)
- [Streaming-safe_texture_access](#_streaming_safe_texture_access)
- [Dispatch and presenting the result](#_dispatch_and_presenting_the_result)
- [Dispatch_and_presenting_the_result](#_dispatch_and_presenting_the_result)
- [Where to look in the code](#_where_to_look_in_the_code)
- [Where_to_look_in_the_code](#_where_to_look_in_the_code)

## Content

This engine includes a ray-traced rendering mode built on Vulkan’s **ray queries**. Instead of building a full ray tracing pipeline (raygen / miss / hit shaders), ray queries let you perform intersection tests directly from regular shaders.

In this sample we use ray queries from a **compute shader** to render the whole frame:

* 
Build **BLAS** (per mesh) and a **TLAS** (scene instances).

* 
Dispatch a compute shader that:

Generates one primary ray per pixel from the camera.

* 
Uses `TraceRayInline()` to find intersections in the TLAS.

* 
Shades the hit using the same PBR utilities as the raster path.

Write the result into a storage image, then composite to the swapchain.

Ray queries are a good fit for a “hybrid” renderer:

* 
You can call them from compute, fragment, or other shader stages.

* 
They reuse the standard descriptor system.

* 
They keep control flow in your shader code: you decide how to traverse, when to accept hits, and how to shade.

At a high level, Ray Query mode touches three areas:

* 
**Acceleration structures**: built from the scene’s vertex and index buffers.

* 
**Descriptors**: bind the TLAS, the output storage image, and the scene data needed for shading.

* 
**Shader**: generate rays, do the query, shade the hit.

The important idea is that the ray query shader does not “own” the scene. It reads the same scene assets as rasterization (meshes, materials, textures), but through a separate descriptor set designed for the compute path.

We build acceleration structures once the scene is ready:

* 
A BLAS is created per unique mesh.

* 
Each scene instance is added to the TLAS with its transform.

* 
Each TLAS instance encodes a custom instance index so the shader can index into a matching `GeometryInfo` table.

The Ray Query shader uses that per-instance index to look up:

* 
device addresses for vertex and index buffers

* 
the material index

* 
a per-instance normal transform for correct world-space normals

Ray Query mode uses a dedicated descriptor set layout. The exact binding numbers matter because they must match the shader.

Typical bindings in this engine are:

* 
Binding 0: a small Ray Query-specific UBO (camera matrices, exposure/gamma, toggles)

* 
Binding 1: the TLAS

* 
Binding 2: output storage image

* 
Binding 3: light buffer

* 
Binding 4: `GeometryInfo` buffer

* 
Binding 5: material buffer

* 
Binding 6: a large combined image sampler array used as a texture table

This engine streams textures asynchronously. A key design choice for Ray Query mode is that the shader indexes textures through a fixed-size array (a “texture table”).

At runtime:

* 
Materials store texture **indices** into the table (baseColor, normal, metallic-roughness, occlusion, emissive).

* 
The renderer refreshes the table using the **current** texture handles.

* 
Slots `0..4` are reserved for shared default textures (so sampling always has a valid fallback).

This approach keeps shading simple in the shader: sampling uses `NonUniformResourceIndex()` and `SampleLevel(…​, 0.0)` (explicit LOD is important for compute).

The Ray Query compute shader writes to a storage image (typically HDR-capable).

After dispatch:

* 
A barrier transitions the Ray Query output image from `GENERAL` (write) to `SHADER_READ_ONLY_OPTIMAL` (read).

* 
A fullscreen composite pass samples the output image and writes to the swapchain.

* 
A final transition prepares the swapchain for present.

This lets the engine reuse the same post-processing controls (exposure/gamma) for both raster and ray query paths.

* 
Shader:

`shaders/ray_query.slang`

CPU-side Ray Query build and descriptors:

* 
`renderer_ray_query.cpp`

Render loop integration + UI:

* 
`renderer_rendering.cpp`

Descriptor indexing features (for large sampler arrays):

* 
`renderer_core.cpp`
