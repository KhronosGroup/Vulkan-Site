# Ray Traversal

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/raytraversal.html

## Table of Contents

- [Ray Intersection Candidate Determination](#ray-intersection-candidate-determination)
- [Ray_Intersection_Candidate_Determination](#ray-intersection-candidate-determination)
- [Watertightness](#ray-traversal-watertight)
- [Ray Intersection Culling](#ray-intersection-culling)
- [Ray_Intersection_Culling](#ray-intersection-culling)
- [Ray Primitive Culling](#ray-traversal-culling-primitive)
- [Ray_Primitive_Culling](#ray-traversal-culling-primitive)
- [Ray Mask Culling](#_ray_mask_culling)
- [Ray_Mask_Culling](#_ray_mask_culling)
- [Ray Face Culling](#ray-traversal-culling-face)
- [Ray_Face_Culling](#ray-traversal-culling-face)
- [Ray Opacity Culling](#_ray_opacity_culling)
- [Ray_Opacity_Culling](#_ray_opacity_culling)
- [Ray Opacity Micromap](#ray-opacity-micromap)
- [Ray_Opacity_Micromap](#ray-opacity-micromap)
- [Ray Intersection Confirmation](#ray-intersection-confirmation)
- [Ray_Intersection_Confirmation](#ray-intersection-confirmation)
- [AABB Intersection Candidates](#_aabb_intersection_candidates)
- [AABB_Intersection_Candidates](#_aabb_intersection_candidates)
- [Triangle and Generated Intersection Candidates](#ray-triangle-and-generated-intersection-candidates)
- [Triangle_and_Generated_Intersection_Candidates](#ray-triangle-and-generated-intersection-candidates)
- [Ray Closest Hit Determination](#ray-closest-hit-determination)
- [Ray_Closest_Hit_Determination](#ray-closest-hit-determination)
- [Ray Result Determination](#ray-result-determination)
- [Ray_Result_Determination](#ray-result-determination)

## Content

The ray traversal process identifies and handles intersections between a ray
and geometries in an acceleration structure.

Ray traversal cannot be started by a Vulkan API command directly - a shader
**must** execute
`OpRayQueryProceedKHR`
or
a [pipeline trace ray](../appendices/glossary.html#glossary-pipeline-trace-ray) instruction
.
When the [`rayTracingPipeline`](features.html#features-rayTracingPipeline) feature
is enabled, `OpTraceRayKHR` **can** be used for [ray tracing](raytracing.html#ray-tracing)
in a [ray tracing pipeline](pipelines.html#pipelines-ray-tracing).
When the [`rayQuery`](features.html#features-rayQuery) feature is enabled,
`OpRayQueryProceedKHR` **can** be used in any shader stage.

Once tracing begins, rays are first tested against instances in a top-level
acceleration structure.
A ray that intersects an instance will be transformed into the space of the
instance to continue traversal within that instance; therefore the transform
matrix stored in the instance **must** be invertible.

In case multiple instances are intersected by a ray, the ray transformation
into the space of the instance is invariant under the order in which these
instances are encountered in the top-level acceleration structure.

|  | Applying multiple forward and reverse transforms to a ray to transition from
| --- | --- |
one instance to another could result in accumulated errors.
Thus an implementation should behave as if the ray is transformed from the
origin for each instance independently. |

Next, rays are tested against geometries in a bottom-level acceleration
structure to determine if a hit occurred between them, initially based only
on their geometric properties (i.e. their vertices).
The implementation performs similar operations to that of rasterization, but
with the effective viewport determined by the parameters of the ray, and the
geometry transformed into a space determined by that viewport.

The vertices of each primitive are transformed from acceleration structure
space as to ray space r according to the ray origin and direction as
follows:

  

  

   is the axis of rotation from the unnormalized ray
direction vector    to the axis vector
  :

  

  

   and    are the sine and cosine of
the angle of rotation about    from
   to   :

  

  

   is the unit vector:

  

  

   and    are the ray origin and
unnormalized direction, respectively; the vector described by xas,
yas, and zas is any position in acceleration structure
space; and the vector described by xr, yr, and zr is
the same position in ray space.

An *intersection candidate* is a unique point of intersection between a ray
and a geometric primitive.
For any primitive that has within its bounds a position
   such that

  

  

(where   ), an intersection
candidate exists.

Triangle primitive bounds consist of all points on the plane formed by the
three vertices and within the bounds of the edges between the vertices,
subject to the watertightness constraints below.
AABB primitive bounds consist of all points within an implementation-defined
bound which includes the specified box.

|  | The bounds of the AABB including all points internal to the bound implies
| --- | --- |
that a ray started within the AABB will hit that AABB. |

![ray intersection candidate](../_images/ray_intersection_candidate.svg)

Figure 1. Ray intersection candidate

The determination of this condition is performed in an implementation
specific manner, and **may** be performed with floating-point operations.
Due to the complexity and number of operations involved, inaccuracies are
expected, particularly as the scale of values involved begins to diverge.
Implementations **should** take efforts to maintain as much precision as
possible.

|  | One very common case is when geometries are close to each other at some
| --- | --- |
distance from the origin in acceleration structure space, where an effect
similar to “z-fighting” is likely to be observed.
Applications can mitigate this by ensuring their detailed geometries remain
close to the origin.

Another likely case is when the origin of a ray is set to a position on a
previously intersected surface, and its tmin is zero or near zero;
an intersection may be detected on the emitting surface.
This case can usually be mitigated by offsetting tmin slightly. |

For a motion primitive or a motion instance, the positions for intersection
are evaluated at the time specified in the `time` parameter to
`OpTraceRayMotionNV` by interpolating between the two endpoints as
specified for the given motion type.
If a motion acceleration structure is traced with `OpTraceRayKHR`, it
behaves as a `OpTraceRayMotionNV` with `time` of 0.0.

In the case of AABB geometries, implementations **may** increase their size in
an acceleration structure in order to mitigate precision issues.
This **may** result in false positive intersections being reported to the
application.

For triangle intersection candidates, the b and c
[barycentric coordinates](primsrast.html#primsrast-polygon-barycentrics) on the triangle
where the above condition is met are made available to future shading.
If the ray was traced with a [pipeline trace ray](../appendices/glossary.html#glossary-pipeline-trace-ray) instruction, these values are available as a vector of 2 32-bit
floating-point values in the `HitAttributeKHR` storage class.

For linear swept sphere intersection candidate, the ray t value along
with a single u parameter suffice to identify the hit.
The u value specifies the position of the hit along the LSS
midsection, within the range [0, 1].
If the u value is exactly `0` or `1`, then the intersection occurred
on the respective endcap `0`, or endcap `1`.
For pure sphere primitives, u is always set to 0.
LSS primitives may be self-enclosing if one of the endcap spheres is
completely enclosed within the other, and both endcaps are enabled.
In these instances, only the outer of the two endcaps is intersection
tested, and u will be returned as `0` or `1` accordingly.
For rays that originate inside a LSS or sphere primitive, or enter through
an absent endcap, no intersections will be reported.

Once an intersection candidate is determined, it proceeds through the
following operations, in order:

[Ray Intersection Culling](#ray-intersection-culling)

[Ray Intersection Confirmation](#ray-intersection-confirmation)

[Ray Closest Hit Determination](#ray-closest-hit-determination)

[Ray Result Determination](#ray-result-determination)

The sections below describe the exact details of these tests.
There is no ordering guarantee between operations performed on different
intersection candidates.

For a set of triangles with identical transforms, within a single instance:

* 
Any set of two or more triangles where all triangles have one vertex
with an identical position value, that vertex is a *shared vertex*.

* 
Any set of two triangles with two shared vertices that were specified in
the same [winding order](drawing.html#drawing-triangle-lists) in each triangle have
a *shared edge* defined by those vertices.

A *closed fan* is a set of three or more triangles where:

* 
All triangles in the set have the same shared vertex as one of their
vertices.

* 
All edges that include the above vertex are shared edges.

* 
All above shared edges are shared by exactly two triangles from the set.

* 
No two triangles in the set intersect, except at shared edges.

* 
Every triangle in the set is joined to every other triangle in the set
by a series of the above shared edges.

Implementations **should** not double-hit or miss when a ray intersects a
shared edge, or a shared vertex of a closed fan.

|  | Because of the complexity of a definition of watertightness the language
| --- | --- |
above does not list a **must** requirement but it is expected and tested that
implementations will perform watertight intersection tests. |

For LSS primitives, connected LSS might overlap not only at the shared
vertex endcap but also along their midsections.
This applies even if an LSS disables the shared endcap.
As such, there is no clear equivalent edge or vertex that could
deterministically map a hit to just one of the LSS.
So, unlike the ray-triangle intersection, the ray-LSS intersection provides
no single-hit guarantee for LSS, including those that share a vertex causing
the LSS to overlap.
However, as with triangles, LSS intersection still returns the closest hit.

Candidate intersections go through several phases of culling before
confirmation as an actual hit.
There is no particular ordering dependency between the different culling
operations.

If the [`rayTraversalPrimitiveCulling`](features.html#features-rayTraversalPrimitiveCulling) or [`rayQuery`](features.html#features-rayQuery) features are enabled, the `SkipTrianglesKHR` and
`SkipAABBsKHR` ray flags **can** be specified when tracing a ray.
`SkipTrianglesKHR` and `SkipAABBsKHR` are mutually exclusive.
`SkipTrianglesKHR` is also mutually exclusive with
`CullBackFacingTrianglesKHR` and `CullFrontFacingTrianglesKHR`.

If `SkipTrianglesKHR` was included in the `Ray Flags` operand of the ray
trace instruction, and the intersection is with a triangle primitive, the
intersection is dropped, and no further processing of this intersection
occurs.
If [VK_PIPELINE_CREATE_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR](pipelines.html#VkPipelineCreateFlagBits) was included
in the pipeline, traversal with [pipeline trace ray](../appendices/glossary.html#glossary-pipeline-trace-ray) instructions will all behave as if `SkipTrianglesKHR` was
included in their `Ray Flags` operand.

If `SkipAABBsKHR` was included in the `Ray Flags` operand of the ray
trace instruction, and the intersection is with an AABB primitive, the
intersection is dropped, and no further processing of this intersection
occurs.
If [VK_PIPELINE_CREATE_RAY_TRACING_SKIP_AABBS_BIT_KHR](pipelines.html#VkPipelineCreateFlagBits) was included in
the pipeline, traversal with [pipeline trace ray](../appendices/glossary.html#glossary-pipeline-trace-ray) instructions will all behave as if `SkipAABBsKHR` was included in
their `Ray Flags` operand.

Instances **can** be made invisible to particular rays based on the value of
[VkAccelerationStructureInstanceKHR](accelstructures.html#VkAccelerationStructureInstanceKHR)::`mask` used to add that
instance to a top-level acceleration structure, and the `Cull Mask`
parameter used to trace the ray.

For the instance which is intersected, if `mask` & `Cull Mask` ==
0, the intersection is dropped, and no further processing occurs.

As in [polygon rasterization](primsrast.html#primsrast-polygons-basic), one of the stages
of ray traversal is to determine if a triangle primitive is back- or
front-facing, and primitives **can** be culled based on that facing.

If the intersection candidate is with an AABB primitive, this operation is
skipped.

Determination
When a ray intersects a triangle primitive, the order that vertices are
specified for the polygon affects whether the ray intersects the front or
back face.
Front or back facing is determined in the same way as they are for
[rasterization](primsrast.html#primsrast-polygons-basic), based on the sign of the
polygon’s area but using the ray space coordinates instead of framebuffer
coordinates.
One way to compute this area is:

  

  

where    and    are the x and y
[ray space coordinates](#ray-intersection-candidate-determination) of the
ith vertex of the n-vertex polygon (vertices are numbered
starting at zero for the purposes of this computation) and i ⊕ 1
is (i +  1) mod n.

By default, if a is negative then the intersection is with the front
face of the triangle, otherwise it is with the back face.
If [VK_GEOMETRY_INSTANCE_TRIANGLE_FLIP_FACING_BIT_KHR](accelstructures.html#VkGeometryInstanceFlagBitsNV) is included in
[VkAccelerationStructureInstanceKHR](accelstructures.html#VkAccelerationStructureInstanceKHR)::`flags` for the instance
containing the intersected triangle, this determination is reversed.
Additionally, if a is 0, the intersection candidate is treated as not
intersecting with any face, irrespective of the sign.

|  | In a left-handed coordinate system, an intersection will be with the front
| --- | --- |
face of a triangle if the vertices of the triangle, as defined in index
order, appear from the ray’s perspective in a clockwise rotation order.
[VK_GEOMETRY_INSTANCE_TRIANGLE_FLIP_FACING_BIT_KHR](accelstructures.html#VkGeometryInstanceFlagBitsNV) was previously
annotated as
[VK_GEOMETRY_INSTANCE_TRIANGLE_FRONT_COUNTERCLOCKWISE_BIT_KHR](accelstructures.html#VkGeometryInstanceFlagBitsNV) because
of this. |

If the ray was traced with a [pipeline trace ray](../appendices/glossary.html#glossary-pipeline-trace-ray) instruction, the `HitKindKHR` built-in is set to
`HitKindFrontFacingTriangleKHR` if the intersection is with front-facing
geometry, and `HitKindBackFacingTriangleKHR` if the intersection is with
back-facing geometry, for shader stages considering this intersection.
For LSS or sphere intersections, the `HitKindKHR` built-in is set to
`HitKindLssPrimitiveNV` or `HitKindSpherePrimitiveNV` respectively.

If the ray was traced with `OpRayQueryProceedKHR`,
`OpRayQueryGetIntersectionFrontFaceKHR` will return true for intersection
candidates with front faces, or false for back faces.

Culling
If `CullBackFacingTrianglesKHR` was included in the `Ray Flags` parameter
of the ray trace instruction, and the intersection is determined as with the
back face of a triangle primitive, the intersection is dropped, and no
further processing of this intersection occurs.

If `CullFrontFacingTrianglesKHR` was included in the `Ray Flags`
parameter of the ray trace instruction, and the intersection is determined
as with the front face of a triangle primitive, the intersection is dropped,
and no further processing of this intersection occurs.

This culling is disabled if
[VK_GEOMETRY_INSTANCE_TRIANGLE_FACING_CULL_DISABLE_BIT_KHR](accelstructures.html#VkGeometryInstanceFlagBitsNV) was included
in [VkAccelerationStructureInstanceKHR](accelstructures.html#VkAccelerationStructureInstanceKHR)::`flags` for the instance
which the intersected geometry belongs to.

Intersection candidates that have not intersected with any face (a ==
0) are unconditionally culled, irrespective of ray flags and geometry
instance flags.

The `CullBackFacingTrianglesKHR` and `CullFrontFacingTrianglesKHR`
`Ray Flags` are mutually exclusive.

Each geometry in the acceleration structure **may** be considered either opaque
or not.
Opaque geometries continue through traversal as normal, whereas non-opaque
geometries need to be either confirmed or discarded by shader code.
Intersection candidates **can** also be culled based on their opacity.

Determination
Each individual intersection candidate is initially determined as opaque if
[VK_GEOMETRY_OPAQUE_BIT_KHR](resources.html#VkGeometryFlagBitsNV) was included in the
[VkGeometryNV](resources.html#VkGeometryNV)::`flags`
or
[VkAccelerationStructureGeometryKHR](accelstructures.html#VkAccelerationStructureGeometryKHR)::`flags`
when the geometry it intersected with was built, otherwise it is considered
non-opaque.

If the geometry includes an opacity micromap, the opacity of the
intersection at this point is instead derived as described in
[Ray Opacity Micromap](#ray-opacity-micromap).

If the intersection candidate was generated by an [intersection shader](shaders.html#shaders-intersection), the intersection is initially considered to have
opacity matching the AABB candidate that it was generated from.

However, this opacity can be overridden when it is built into an instance.
Setting [VK_GEOMETRY_INSTANCE_FORCE_OPAQUE_BIT_KHR](accelstructures.html#VkGeometryInstanceFlagBitsNV) in
[VkAccelerationStructureInstanceKHR](accelstructures.html#VkAccelerationStructureInstanceKHR)::`flags` will force all
geometries in the instance to be considered opaque.
Similarly, setting [VK_GEOMETRY_INSTANCE_FORCE_NO_OPAQUE_BIT_KHR](accelstructures.html#VkGeometryInstanceFlagBitsNV) will
force all geometries in the instance to be considered non-opaque.

This can again be overridden by including `OpaqueKHR` or `NoOpaqueKHR`
in the `Ray Flags` parameter when tracing a ray.
`OpaqueKHR` forces all geometries to behave as if they are opaque,
regardless of their build parameters.
Similarly, `NoOpaqueKHR` forces all geometries to behave as if they are
non-opaque.

If the ray was traced with `OpRayQueryProceedKHR`, to determine the
opacity of AABB intersection candidates,
`OpRayQueryGetIntersectionCandidateAABBOpaqueKHR` **can** be used.
This instruction will return `true` for opaque intersection candidates,
and `false` for non-opaque intersection candidates.

Culling
If `CullOpaqueKHR` is included in the `Ray Flags` parameter when tracing
a ray, an intersection with a geometry that is considered opaque is dropped,
and no further processing occurs.

If `CullNoOpaqueKHR` is included in the `Ray Flags` parameter when
tracing a ray, an intersection with a geometry that is considered non-opaque
is dropped, and no further processing occurs.

The `OpaqueKHR`, `NoOpaqueKHR`, `CullOpaqueKHR`, and
`CullNoOpaqueKHR` `Ray Flags` are mutually exclusive.

A [VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV)
or [VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](resources.html#VkGeometryTypeNV)
geometry in the acceleration structure **may** have an opacity micromap
associated with it to give finer-grained opacity information.

If the intersection candidate is with a geometry with an associated opacity
micromap and [VK_GEOMETRY_INSTANCE_DISABLE_OPACITY_MICROMAPS_BIT_EXT](accelstructures.html#VkGeometryInstanceFlagBitsNV) is
not set in its instance then the micromap is used to determine geometry
opacity instead of the [VK_GEOMETRY_OPAQUE_BIT_KHR](resources.html#VkGeometryFlagBitsNV) flag in the
geometry.

The opacity information in the micromap object is accessed using the
candidate intersection u and v coordinates.
The integer u and v are computed from ⌊u⌋
+  ⌊v⌋, clamping ⌊u⌋ as needed to
keep the sum less than or equal to 1 .
These values are mapped into a linear index with a space filling curve which
is defined recursively by traversing into the sub-triangle nearest vertex 0,
then the middle triangle with ordering flipped, then nearest vertex 1, then
nearest vertex 2 with ordering flipped.

![micromap subd](../_images/micromap-subd.svg)

Figure 2. Example ordering for micromap data

Caption

In the [ordering for micromap data](#img-micromap-ordering) diagram, the dot
in each sub-triangle indicates the entry point of the curve and the arrows
show the traversal order through its children at the next subdivision level.

|  | This encoding is spatially coherent, purely hierarchical, and allows a
| --- | --- |
bit-parallel conversion between barycentric address and index values.

See the [Reference Code](../appendices/extensions.html#opacity-micromap-reference-code) implementing this mapping. |

The result of the opacity micromap lookup and operations is to treat the
intersection as opaque, non-opaque, or ignored.
The interpretation of the values depends on
[VK_GEOMETRY_INSTANCE_FORCE_OPACITY_MICROMAP_2_STATE_BIT_EXT](accelstructures.html#VkGeometryInstanceFlagBitsNV) in the
instance of the candidate intersection or `ForceOpacityMicromap2StateEXT`
ray flags on the ray.
If either is set, the opacity micromap information is interpreted in 2 state
override mode.
If the result of the micromap lookup is to treat the intersection candidate
as ignored, no further processing of that candidate is done.

If the associated opacity micromap has format
[VK_OPACITY_MICROMAP_FORMAT_2_STATE_EXT](VK_EXT_opacity_micromap/micromaps.html#VkOpacityMicromapFormatEXT), each element of the micromap
is represented by a single bit at the index derived above.

If the associated opacity micromap has format
[VK_OPACITY_MICROMAP_FORMAT_4_STATE_EXT](VK_EXT_opacity_micromap/micromaps.html#VkOpacityMicromapFormatEXT), each element is represented by
a two bit value at the index derived above.

| 4 State value | 2 State value | Special index value | 2 State override | Result |
| --- | --- | --- | --- | --- |
| 0 | 0 | [VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_TRANSPARENT_EXT](accelstructures.html#VkOpacityMicromapSpecialIndexEXT) | Y | Ignored |
| 0 | 0 | [VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_TRANSPARENT_EXT](accelstructures.html#VkOpacityMicromapSpecialIndexEXT) | N | Ignored |
| 1 | 1 | [VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_OPAQUE_EXT](accelstructures.html#VkOpacityMicromapSpecialIndexEXT) | Y | Opaque |
| 1 | 1 | [VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_OPAQUE_EXT](accelstructures.html#VkOpacityMicromapSpecialIndexEXT) | N | Opaque |
| 2 |  | [VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_TRANSPARENT_EXT](accelstructures.html#VkOpacityMicromapSpecialIndexEXT) | Y | Ignored |
| 2 |  | [VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_TRANSPARENT_EXT](accelstructures.html#VkOpacityMicromapSpecialIndexEXT) | N | Non-opaque |
| 3 |  | [VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_OPAQUE_EXT](accelstructures.html#VkOpacityMicromapSpecialIndexEXT) | Y | Opaque |
| 3 |  | [VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_OPAQUE_EXT](accelstructures.html#VkOpacityMicromapSpecialIndexEXT) | N | Non-opaque |

Depending on the opacity of intersected geometry and whether it is a
triangle or an AABB, candidate intersections are further processed to
determine the eventual hit result.
Candidates generated from AABB intersections run through the same
confirmation process as triangle hits.

For an intersection candidate with an AABB geometry generated by
[Ray Intersection Candidate Determination](#ray-intersection-candidate-determination), shader code is executed to
determine whether any hits should be reported to the traversal
infrastructure; no further processing of this intersection candidate occurs.
The occurrence of an AABB intersection candidate does not guarantee the ray
intersects the application-provided AABB.
To avoid propagating false intersections the application **should** verify the
intersection candidate before reporting any hits and only report
intersections within the bounds of the desired geometry.
Reporting an intersection outside the AABB either through the implementation
giving a conservative bound or reporting a t out of range is legal but
**may** result in unpredictable closest hit results.

If the ray was traced with a [pipeline trace ray](../appendices/glossary.html#glossary-pipeline-trace-ray) instruction, an [intersection shader](shaders.html#shaders-intersection) is
invoked from the [Shader Binding Table](raytracing.html#shader-binding-table) according to the
[specified indexing](raytracing.html#shader-binding-table-indexing-rules) for the
intersected geometry.
If this shader calls `OpReportIntersectionKHR`, a new intersection
candidate is generated as described
[below](#aabb-intersection-candidate-generation).
If the intersection shader is [VK_SHADER_UNUSED_KHR](pipelines.html#VK_SHADER_UNUSED_KHR) (which is only
allowed for a zero shader group) then no further processing of the
intersection candidate occurs.

Each new candidate generated as a result of this processing is a generated
intersection candidate from the intersection with AABB geometry, with a
t value equal to the `Hit` parameter of the
`OpReportIntersectionKHR` instruction.
The new generated candidate is then independently run through
[Ray Intersection Confirmation](#ray-intersection-confirmation) as a
[generated intersection](#ray-triangle-and-generated-intersection-candidates).

If the ray was traced with `OpRayQueryProceedKHR`, control is returned to
the shader which executed `OpRayQueryProceedKHR`, returning `true`.
The resulting ray query has a candidate intersection type of
`RayQueryCandidateIntersectionAABBKHR`.
`OpRayQueryGenerateIntersectionKHR` **can** be called to commit a new
intersection candidate with committed intersection type of
`RayQueryCommittedIntersectionGeneratedKHR`.
Further ray query processing **can** be continued by executing
`OpRayQueryProceedKHR` with the same ray query, or intersection **can** be
terminated with `OpRayQueryTerminateKHR`.
Unlike rays traced with a [pipeline trace ray](../appendices/glossary.html#glossary-pipeline-trace-ray) instruction, candidates generated in this way skip generated
intersection candidate confirmation; applications **should** make this
determination before generating the intersection.

This operation **may** be executed multiple times for the same intersection
candidate.

For triangle and [generated intersection candidates](#aabb-intersection-candidate-generation), additional shader code **may** be executed based on
the intersection’s opacity.

If the intersection is opaque, the candidate is immediately confirmed as a
valid hit and passes to the next stage of processing.

For non-opaque intersection candidates, shader code is executed to determine
whether a hit occurred or not.

If the ray was traced with a [pipeline trace ray](../appendices/glossary.html#glossary-pipeline-trace-ray) instruction, an [any-hit shader](shaders.html#shaders-any-hit) is invoked from
the [Shader Binding Table](raytracing.html#shader-binding-table) according to the specified indexing.
If this shader calls `OpIgnoreIntersectionKHR`, the candidate is dropped
and no further processing of the candidate occurs.
If the [any-hit shader](shaders.html#shaders-any-hit) identified is
[VK_SHADER_UNUSED_KHR](pipelines.html#VK_SHADER_UNUSED_KHR), the candidate is immediately confirmed as a
valid hit and passes to the next stage of processing.

If the ray was traced with `OpRayQueryProceedKHR`, control is returned to
the shader which executed `OpRayQueryProceedKHR`, returning `true`.
As only triangle candidates participate in this operation with ray queries,
the resulting candidate intersection type is always
`RayQueryCandidateIntersectionTriangleKHR`.
`OpRayQueryConfirmIntersectionKHR` **can** be called on the ray query to
confirm the candidate as a hit with committed intersection type of
`RayQueryCommittedIntersectionTriangleKHR`.
Further ray query processing **can** be continued by executing
`OpRayQueryProceedKHR` with the same ray query, or intersection **can** be
terminated with `OpRayQueryTerminateKHR`.
If `OpRayQueryConfirmIntersectionKHR` has not been executed, the
candidate is dropped and no further processing of the candidate occurs.

This operation **may** be executed multiple times for the same intersection
candidate unless [VK_GEOMETRY_NO_DUPLICATE_ANY_HIT_INVOCATION_BIT_KHR](resources.html#VkGeometryFlagBitsNV)
was specified for the intersected geometry.

Unless the ray was traced with the `TerminateOnFirstHitKHR` ray flag, the
implementation **must** track the closest confirmed hit until all geometries
have been tested and either confirmed or dropped.

After an intersection candidate is confirmed, its t value is compared
to tmax to determine which intersection is closer, where t is
the parametric distance along the ray at which the intersection occurred.

* 
If t max, tmax is set to t and the candidate is
set as the current closest hit.

* 
If t > tmax, the candidate is dropped and no further processing
of that candidate occurs.

* 
If t = tmax, the candidate **may** be set as the current closest
hit or dropped.

If `TerminateOnFirstHitKHR` was included in the `Ray Flags` used to trace
the ray, once the first hit is confirmed, the ray trace is terminated.

Once all candidates have finished processing the prior stages, or if the ray
is forcibly terminated, the final result of the ray trace is determined.

If a closest hit result was identified by [Ray Closest Hit Determination](#ray-closest-hit-determination),
a closest hit has occurred, otherwise the final result is a miss.

For rays traced with [pipeline trace ray](../appendices/glossary.html#glossary-pipeline-trace-ray)
instructions which **can** invoke a closest hit shader, if a closest hit result
was identified, a [closest hit shader](shaders.html#shaders-closest-hit) is invoked
from the [Shader Binding Table](raytracing.html#shader-binding-table) according to the
[specified indexing](raytracing.html#shader-binding-table-indexing-rules) for the
intersected geometry.
Control returns to the shader that executed the
[pipeline trace ray](../appendices/glossary.html#glossary-pipeline-trace-ray) instruction once this
shader returns.
This shader is skipped if either the ray flags included
`SkipClosestHitShaderKHR`, or if the [closest hit shader](shaders.html#shaders-closest-hit) identified is [VK_SHADER_UNUSED_KHR](pipelines.html#VK_SHADER_UNUSED_KHR).

For rays traced with a [pipeline trace ray](../appendices/glossary.html#glossary-pipeline-trace-ray)
instruction where no hit result was identified, the [miss shader](shaders.html#shaders-miss) identified by the `Miss Index` parameter of the instruction is
invoked.
Control returns to the shader that executed the pipeline trace ray
instruction once this shader returns.
This shader is skipped if the miss shader identified is
[VK_SHADER_UNUSED_KHR](pipelines.html#VK_SHADER_UNUSED_KHR).

If the ray was traced with `OpRayQueryProceedKHR`, control is returned to
the shader which executed `OpRayQueryProceedKHR`, returning `false`.
If a closest hit was identified by [Ray Closest Hit Determination](#ray-closest-hit-determination), the
ray query will now have a committed intersection type of
`RayQueryCommittedIntersectionGeneratedKHR` or
`RayQueryCommittedIntersectionTriangleKHR`.
If no closest hit was identified, the committed intersection type will be
`RayQueryCommittedIntersectionNoneKHR`.

No further processing of a ray query occurs after this result is determined.
