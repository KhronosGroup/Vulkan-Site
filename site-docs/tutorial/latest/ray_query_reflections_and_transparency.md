# Ray_Query_Reflections_and_Transparency

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Advanced_Topics/Ray_Query_Reflections_and_Transparency.html

## Table of Contents

- [Ray Query Reflections and Transparency](#_ray_query_reflections_and_transparency)
- [Ray_Query_Reflections_and_Transparency](#_ray_query_reflections_and_transparency)
- [Two toggles, one clear mental model](#_two_toggles_one_clear_mental_model)
- [Two_toggles,_one_clear_mental_model](#_two_toggles_one_clear_mental_model)
- [Reflection rays (one bounce)](#_reflection_rays_one_bounce)
- [Reflection_rays_(one_bounce)](#_reflection_rays_one_bounce)
- [Thin-glass refraction (one bounce)](#_thin_glass_refraction_one_bounce)
- [Thin-glass_refraction_(one_bounce)](#_thin_glass_refraction_one_bounce)
- [Alpha-masked surfaces (foliage)](#_alpha_masked_surfaces_foliage)
- [Alpha-masked_surfaces_(foliage)](#_alpha_masked_surfaces_foliage)
- [Where to look in the code](#_where_to_look_in_the_code)
- [Where_to_look_in_the_code](#_where_to_look_in_the_code)

## Content

Ray queries make it straightforward to add reflection and refraction to a renderer without adopting a full ray tracing pipeline. In this engine, the Ray Query mode compute shader already computes primary visibility; we extend that shader with **secondary rays** to handle reflective and transmissive materials.

This page explains the design in a way you can reuse in your own projects.

Ray Query mode exposes two feature toggles:

* 
**Reflections**: enables a reflection ray from the first hit.

* 
**Transparency/Refraction**: enables a refraction ray for transmissive materials.

There’s also a small quality knob:

* 
**Max secondary bounces**: `0` disables secondary rays entirely; `1` enables a single bounce.

The point of the bounce cap is to keep performance predictable while still demonstrating how ray queries can be layered into a physically-based shading model.

At the first surface hit we have:

* 
the outgoing view direction `V`

* 
the surface normal `N`

* 
material parameters (roughness, metallic, and Fresnel base reflectance)

The reflection direction is the standard geometric reflection:

`R = reflect(-V, N)`

In the compute shader we trace a new ray from a small offset along the normal to avoid self-intersections:

* 
origin: `P + N * eps`

* 
direction: `R`

If the reflection ray hits something, we shade that hit using the same PBR path as the primary ray. If it misses, we use a stable sky/background function.

The final reflection contribution is weighted by Fresnel and reduced by roughness:

* 
grazing angles reflect more

* 
rough surfaces reflect less strongly

This keeps the result intuitive and stable.

For transmissive materials we implement a “thin glass” model:

* 
a refraction ray gives you the view **through** the surface

* 
a reflection ray gives you the view **on** the surface

* 
Fresnel blends between them

We compute refraction using Snell’s law with a simple total internal reflection fallback.

The refraction ray uses:

* 
origin: `P + refrDir * eps` (offset along the refraction direction)

* 
direction: `refrDir`

The transmitted result is blended with reflection using Fresnel, and then mixed into the base surface color using the material’s transmission factor.

Many real scenes use **alpha masking** for foliage and thin geometry. Alpha masking is different from regular blending:

* 
the surface is either present or absent per pixel

* 
the decision is driven by a baseColor alpha texture and an `alphaCutoff`

In a traditional ray tracing pipeline, alpha masking is often implemented in an any-hit shader. With ray queries, we can implement the same idea by controlling which candidate intersections get committed.

The approach is:

Allow non-opaque candidates for alpha-masked instances.

For each candidate triangle hit:

* 
compute the candidate UV

* 
sample baseColor alpha

* 
accept the candidate only when `alpha >= alphaCutoff`

This produces correct visibility for masked geometry in primary rays, and it also keeps reflections/refractions consistent because they use the same traversal routine.

* 
Ray Query shader implementation:

`shaders/ray_query.slang`

Ray Query UI toggles and bounce cap:

* 
`renderer_rendering.cpp`
