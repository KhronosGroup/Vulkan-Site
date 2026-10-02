# VkPrimitiveTopology(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPrimitiveTopology.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPrimitiveTopology - Supported primitive topologies

The primitive topologies defined by [VkPrimitiveTopology](#) are:

// Provided by VK_VERSION_1_0
typedef enum VkPrimitiveTopology {
    VK_PRIMITIVE_TOPOLOGY_POINT_LIST = 0,
    VK_PRIMITIVE_TOPOLOGY_LINE_LIST = 1,
    VK_PRIMITIVE_TOPOLOGY_LINE_STRIP = 2,
    VK_PRIMITIVE_TOPOLOGY_TRIANGLE_LIST = 3,
    VK_PRIMITIVE_TOPOLOGY_TRIANGLE_STRIP = 4,
    VK_PRIMITIVE_TOPOLOGY_TRIANGLE_FAN = 5,
    VK_PRIMITIVE_TOPOLOGY_LINE_LIST_WITH_ADJACENCY = 6,
    VK_PRIMITIVE_TOPOLOGY_LINE_STRIP_WITH_ADJACENCY = 7,
    VK_PRIMITIVE_TOPOLOGY_TRIANGLE_LIST_WITH_ADJACENCY = 8,
    VK_PRIMITIVE_TOPOLOGY_TRIANGLE_STRIP_WITH_ADJACENCY = 9,
    VK_PRIMITIVE_TOPOLOGY_PATCH_LIST = 10,
} VkPrimitiveTopology;

* 
[VK_PRIMITIVE_TOPOLOGY_POINT_LIST](#) specifies a series of
[separate point primitives](../../../../spec/latest/chapters/drawing.html#drawing-point-lists).

* 
[VK_PRIMITIVE_TOPOLOGY_LINE_LIST](#) specifies a series of
[separate line primitives](../../../../spec/latest/chapters/drawing.html#drawing-line-lists).

* 
[VK_PRIMITIVE_TOPOLOGY_LINE_STRIP](#) specifies a series of
[connected line primitives](../../../../spec/latest/chapters/drawing.html#drawing-line-strips) with consecutive lines
sharing a vertex.

* 
[VK_PRIMITIVE_TOPOLOGY_TRIANGLE_LIST](#) specifies a series of
[separate triangle primitives](../../../../spec/latest/chapters/drawing.html#drawing-triangle-lists).

* 
[VK_PRIMITIVE_TOPOLOGY_TRIANGLE_STRIP](#) specifies a series of
[connected triangle primitives](../../../../spec/latest/chapters/drawing.html#drawing-triangle-strips) with
consecutive triangles sharing an edge.

* 
[VK_PRIMITIVE_TOPOLOGY_TRIANGLE_FAN](#) specifies a series of
[connected triangle primitives](../../../../spec/latest/chapters/drawing.html#drawing-triangle-fans) with all
triangles sharing a common vertex.
If the `[VK_KHR_portability_subset](VK_KHR_portability_subset.html)` extension is enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](VkPhysicalDevicePortabilitySubsetFeaturesKHR.html)::`triangleFans`
is [VK_FALSE](VK_FALSE.html), then triangle fans are not supported by the
implementation, and [VK_PRIMITIVE_TOPOLOGY_TRIANGLE_FAN](#) **must** not
be used.

* 
[VK_PRIMITIVE_TOPOLOGY_LINE_LIST_WITH_ADJACENCY](#) specifies a series
of [separate line primitives with    adjacency](../../../../spec/latest/chapters/drawing.html#drawing-line-lists-with-adjacency).

* 
[VK_PRIMITIVE_TOPOLOGY_LINE_STRIP_WITH_ADJACENCY](#) specifies a series
of [connected line primitives with    adjacency](../../../../spec/latest/chapters/drawing.html#drawing-line-strips-with-adjacency), with consecutive primitives sharing three vertices.

* 
[VK_PRIMITIVE_TOPOLOGY_TRIANGLE_LIST_WITH_ADJACENCY](#) specifies a
series of [separate triangle    primitives with adjacency](../../../../spec/latest/chapters/drawing.html#drawing-triangle-lists-with-adjacency).

* 
[VK_PRIMITIVE_TOPOLOGY_TRIANGLE_STRIP_WITH_ADJACENCY](#) specifies
[connected triangle primitives    with adjacency](../../../../spec/latest/chapters/drawing.html#drawing-triangle-strips-with-adjacency), with consecutive triangles sharing an edge.

* 
[VK_PRIMITIVE_TOPOLOGY_PATCH_LIST](#) specifies
[separate patch primitives](../../../../spec/latest/chapters/drawing.html#drawing-patch-lists).

Each primitive topology, and its construction from a list of vertices, is
described in detail below with a supporting diagram, according to the
following key:

| ![primitive topology key vertex](../_images/primitive_topology_key_vertex.svg) | Vertex | A point in 3-dimensional space.
| --- | --- | --- |
  Positions chosen within the diagrams are arbitrary and for
  illustration only. |
| ![primitive topology key vertex number](../_images/primitive_topology_key_vertex_number.svg) | Vertex Number | Sequence position of a vertex within the provided vertex data. |
| ![primitive topology key provoking vertex](../_images/primitive_topology_key_provoking_vertex.svg) | Provoking Vertex | Provoking vertex within the main primitive.
  The tail is angled towards the relevant primitive.
  Used in [flat shading](../../../../spec/latest/chapters/vertexpostproc.html#vertexpostproc-flatshading). |
| ![primitive topology key edge](../_images/primitive_topology_key_edge.svg) | Primitive Edge | An edge connecting the points of a main primitive. |
| ![primitive topology key adjacency edge](../_images/primitive_topology_key_adjacency_edge.svg) | Adjacency Edge | Points connected by these lines do not contribute to a main primitive,
  and are only accessible in a [geometry shader](../../../../spec/latest/chapters/geometry.html#geometry). |
| ![primitive topology key winding order](../_images/primitive_topology_key_winding_order.svg) | Winding Order | The relative order in which vertices are defined within a primitive,
  used in the [facing determination](../../../../spec/latest/chapters/primsrast.html#primsrast-polygons-basic).
  This ordering has no specific start or end point. |

The diagrams are supported with mathematical definitions where the vertices
(v) and primitives (p) are numbered starting from 0;
v0 is the first vertex in the provided data and p0 is the
first primitive in the set of primitives defined by the vertices and
topology.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkPipelineInputAssemblyStateCreateInfo](VkPipelineInputAssemblyStateCreateInfo.html), [vkCmdSetPrimitiveTopology](vkCmdSetPrimitiveTopology.html), [vkCmdSetPrimitiveTopology](vkCmdSetPrimitiveTopology.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/drawing.html#VkPrimitiveTopology).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
