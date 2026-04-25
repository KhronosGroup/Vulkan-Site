# VK_NV_ray_tracing_linear_swept_spheres

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_NV_ray_tracing_linear_swept_spheres.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. API Features](#_api_features)
- [3.1._API_Features](#_api_features)
- [3.1.1. Feature](#_feature)
- [3.1.2. Creating geometry](#_creating_geometry)
- [3.1.2._Creating_geometry](#_creating_geometry)
- [4. Issues](#_issues)
- [4.1. Should applications be able to zoom-in to the geometry and expect 'good' results?](#_should_applications_be_able_to_zoom_in_to_the_geometry_and_expect_good_results)
- [4.1._Should_applications_be_able_to_zoom-in_to_the_geometry_and_expect_'good'_results?](#_should_applications_be_able_to_zoom_in_to_the_geometry_and_expect_good_results)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. API Features](#_api_features)

[4. Issues](#_issues)

[4.1. Should applications be able to zoom-in to the geometry and expect 'good' results?](#_should_applications_be_able_to_zoom_in_to_the_geometry_and_expect_good_results)

This document outlines the addition of two primitives for ray tracing: a
sphere primitive and a linear swept sphere (LSS) primitive.

Ray tracing complex geometry, such as hair and fur, typically involves either
using triangle representations or relying on procedural primitives with
intersection shaders. Triangle representations often require tessellation
schemes that do not capture the fine details of hair strands and fur as
effectively and generally demand more storage. On the other hand, approaches
using intersection shaders can be compact but are usually highly computationally
expensive.

Incorporating built-in geometry support for primitives such as spheres and
linear swept spheres provides an efficient solution for rendering
complex geometries like fur or hair. This approach offers several advantages
including reduced storage requirements and faster ray traversal,
all while maintaining high-quality visual fidelity. By leveraging these
optimized geometric representations, rendering systems can achieve both
performance and realism without the excessive overhead typically associated
with more traditional methods.

This document proposes introducing two new primitives for ray tracing: the
sphere primitive and the linear swept sphere (LSS) primitive, aimed at enabling
efficient rendering of particle systems or fur-like geometries.

Similar to triangles primitives, spheres and LSS primitives are provided to the
bottom-level acceleration structure build as new geometry types.
For LSS primitives, flags passed to the acceleration structure build call
offer some control over how positions and radii are indexed, as well as
over which of the sphere endcaps are enabled. Additionally, sphere and LSS
primitives support any-hit shading for further control over ray-intersection
behavior.

The LSS-endcap radii are defined in acceleration structure object space. As a
consequence, if an instance in the top-level acceleration structure has
transforms containing shears, the LSS primitives will appear as linear swept
sheared spheres in world space. Similarly, instance transforms with non-uniform
scale alter the apparent swept shape.

The following provides a basic overview of how this extension can be utilized
for rendering spheres and LSS geometry:

typedef struct VkPhysicalDeviceRayTracingLinearSweptSpheresFeaturesNV {
    VkStructureType                       sType;
    void*                                 pNext;
    VkBool32                              spheres;
    VkBool32                              linearSweptSpheres;
} VkPhysicalDeviceRayTracingLinearSweptSpheresFeaturesNV;

`spheres` and `linearSweptSpheres` are the main features enabling this
extension’s functionality and at least one of them must be supported if this
extension is supported.

The sphere geometry can be created with:

typedef struct VkAccelerationStructureGeometrySpheresDataNV {
    VkStructureType                       sType;
    void const*                           pNext;
    VkFormat                              vertexFormat;
    VkDeviceOrHostAddressConstKHR         vertexData;
    VkDeviceSize                          vertexStride;
    VkFormat                              radiusFormat;
    VkDeviceOrHostAddressConstKHR         radiusData;
    VkDeviceSize                          radiusStride;
    VkIndexType                           indexType;
    VkDeviceOrHostAddressConstKHR         indexData;
    VkDeviceSize                          indexStride;
} VkAccelerationStructureGeometrySpheresDataNV;

where `vertexData`, `indexData` and `radiusData` along with other parameters
specify the attributes of the sphere geometry.

Similarly, a LSS geometry can be created with:

typedef struct VkAccelerationStructureGeometryLinearSweptSpheresDataNV {
    VkStructureType                       sType;
    void const*                           pNext;
    VkFormat                              vertexFormat;
    VkDeviceOrHostAddressConstKHR         vertexData;
    VkDeviceSize                          vertexStride;
    VkFormat                              radiusFormat;
    VkDeviceOrHostAddressConstKHR         radiusData;
    VkDeviceSize                          radiusStride;
    VkIndexType                           indexType;
    VkDeviceOrHostAddressConstKHR         indexData;
    VkDeviceSize                          indexStride;
    VkRayTracingLssIndexingModeNV         indexingMode;
    VkRayTracingLssPrimitiveEndCapsModeNV endCapsMode;
} VkAccelerationStructureGeometryLinearSweptSpheresDataNV;

The LSS primitive has additional parameters that specify how the indices in the
`indexBuffer` are indexed and how the endcaps on either end of a LSS primitive
are rendered.

`indexingMode` can be:

typedef enum VkRayTracingLssIndexingModeNV {
    VK_RAY_TRACING_LSS_INDEXING_MODE_LIST_NV = 0,
    VK_RAY_TRACING_LSS_INDEXING_MODE_SUCCESSIVE_NV = 1,
} VkRayTracingLssIndexingModeNV;

`VK_RAY_TRACING_LSS_INDEXING_MODE_LIST_NV` specifies that a list of indices is
provided where each consecutive pair of indices define a LSS primitive.

`VK_RAY_TRACING_LSS_INDEXING_MODE_SUCCESSIVE_NV` specifies a successive implicit
indexing format, in which each LSS primitive is defined by two successive
positions and radii, (k, k + 1), where k is a single index provided in the
index buffer. In this indexing scheme, there is a 1:1 mapping between the
index buffer and primitive index within the geometry.

`endCapsMode` can be:

typedef enum VkRayTracingLssPrimitiveEndCapsModeNV {
    VK_RAY_TRACING_LSS_PRIMITIVE_END_CAPS_MODE_NONE_NV = 0,
    VK_RAY_TRACING_LSS_PRIMITIVE_END_CAPS_MODE_CHAINED_NV = 1,
} VkRayTracingLssPrimitiveEndCapsModeNV;

`VK_RAY_TRACING_LSS_PRIMITIVE_END_CAPS_MODE_NONE_NV` specifies that all endcaps
and the chain boundaries have no influence.

`VK_RAY_TRACING_LSS_PRIMITIVE_END_CAPS_MODE_CHAINED_NV` specifies that when
`VK_RAY_TRACING_LSS_INDEXING_MODE_SUCCESSIVE_NV` is used as indexing mode for
the LSS primitive, the first primitive in each chain will have both endcaps
enabled, and every following primitive in the chain only has endcaps at the
trailing position enabled.

The method for creating a bottom-level acceleration structure with
spheres or LSS geometries follows a process similar to that used for triangle or
AABB based bottom-level acceleration structures, where the above structures are
specified in the `pNext` field of `VkAccelerationStructureGeometryKHR`
and the `geometryType` is set to either `VK_GEOMETRY_TYPE_SPHERES_NV` or
`VK_GEOMETRY_TYPE_LINEAR_SWEPT_SPHERES_NV`.

No. Finding the intersection between a ray and an LSS is more
involved than for a triangle and requires more floating-point operations.
It is expected that there will be more rounding errors in the results, and the
input ranges where the intersection test will produce a usable result will be
narrower than for triangles.
The intended use cases for the new primitives is to specifically accelerate
hair and fur rendering, without being viewed with extreme zoom or
at any extreme distances. The input ranges where floating-point issues start
to become visible can differ significantly across implementation.
Implementations should have the intended use cases in mind and are expected to
make reasonable performance and quality tradeoffs.
