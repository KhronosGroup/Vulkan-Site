# VK_KHR_fragment_shader_barycentric

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_fragment_shader_barycentric.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. New SPIR-V decorations](#_new_spir_v_decorations)
- [3.1._New_SPIR-V_decorations](#_new_spir_v_decorations)
- [3.2. Barycentric weights](#_barycentric_weights)
- [3.2._Barycentric_weights](#_barycentric_weights)
- [3.3. Per-vertex attributes](#_per_vertex_attributes)
- [3.3._Per-vertex_attributes](#_per_vertex_attributes)
- [3.4. Properties](#_properties)
- [3.5. GLSL mapping](#_glsl_mapping)
- [3.5._GLSL_mapping](#_glsl_mapping)
- [3.6. HLSL mapping](#_hlsl_mapping)
- [3.6._HLSL_mapping](#_hlsl_mapping)
- [4. Issues](#_issues)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. New SPIR-V decorations](#_new_spir_v_decorations)
[3.2. Barycentric weights](#_barycentric_weights)
[3.3. Per-vertex attributes](#_per_vertex_attributes)
[3.4. Properties](#_properties)
[3.5. GLSL mapping](#_glsl_mapping)
[3.6. HLSL mapping](#_hlsl_mapping)

[4. Issues](#_issues)

This document details the VK_KHR_fragment_shader_barcentric extension, which adds a cross-vendor way to access barycentric coordinates in a fragment shader.

Barycentric coordinates are widely used in computer graphics, and are an important building block for various algorithms.  By being able to access the location of a pixel within a primitive and
the non-interpolated attributes at the vertices, pixel shaders are able to perform things such as custom attribute interpolation or effects based on the pixel’s location within a primitive.

Two options have been considered:

* 
Take VK_NV_fragment_shader_barycentric and add any new required properties and behaviors.

* 
Start afresh

This proposal focuses on the first option.

A new SPIR-V extension [SPV_KHR_fragment_shader_barycentric](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_fragment_shader_barycentric.html)
adds three fragment shader variable decorations:

* 
`PerVertexKHR`, which indicates that a fragment shader input will not
have interpolated values, but instead must be accessed with an extra
array index that identifies one of the vertices of the primitive
producing the fragment

* 
`BaryCoordKHR`, which indicates that the variable is a three-component
floating-point vector holding barycentric weights for the fragment
produced using perspective interpolation

* 
`BaryCoordNoPerspKHR`, which indicates that the variable is a
three-component floating-point vector holding barycentric weights for
the fragment produced using linear interpolation

* 
For point primitives, `BaryCoordKHR` and `BaryCoordNoPerspKHR` are assigned the value (1,0,0).

* 
For line primitives, `BaryCoordKHR` and `BaryCoordNoPerspKHR` are assigned the values (1,0,0) and (0,1,0) at the ends of the primitive.

* 
For polygon primitives, `BaryCoordKHR` and `BaryCoordNoPerspKHR` are assigned the values (1,0,0), (0,1,0), and (0,0,1) at the three vertices.

Per-vertex attributes for "missing" vertices, such as the third vertex of a line primitive, will return values from the valid vertex with the highest index.

Vertices are numbered as follows:

| Primitive Topology | Vertex 0 | Vertex 1 | Vertex 2 |
| --- | --- | --- | --- |
| `VK_PRIMITIVE_TOPOLOGY_POINT_LIST` | i | i | i |
| `VK_PRIMITIVE_TOPOLOGY_LINE_LIST` | 2i | 2i+1 | 2i+1 |
| `VK_PRIMITIVE_TOPOLOGY_LINE_STRIP` | i | i+1 | i+1 |
| `VK_PRIMITIVE_TOPOLOGY_TRIANGLE_LIST` | 3i | 3i+1 | 3i+2 |
| `VK_PRIMITIVE_TOPOLOGY_TRIANGLE_STRIP` (even) | i | i+1 | i+2 |
| `VK_PRIMITIVE_TOPOLOGY_TRIANGLE_STRIP` (odd) | i | i+2 | i+1 |
| `VK_PRIMITIVE_TOPOLOGY_TRIANGLE_FAN` | i+1 | i+2 | 0 |
| `VK_PRIMITIVE_TOPOLOGY_LINE_LIST_WITH_ADJACENCY` | 4i+1 | 4i+2 | 4i+2 |
| `VK_PRIMITIVE_TOPOLOGY_LINE_STRIP_WITH_ADJACENCY` | i+1 | i+2 | i+2 |
| `VK_PRIMITIVE_TOPOLOGY_TRIANGLE_LIST_WITH_ADJACENCY` | 6i | 6i+2 | 6i+4 |
| `VK_PRIMITIVE_TOPOLOGY_TRIANGLE_STRIP_WITH_ADJACENCY` (even) | 2i | 2i+2 | 2i+4 |
| `VK_PRIMITIVE_TOPOLOGY_TRIANGLE_STRIP_WITH_ADJACENCY` (odd) | 2i | 2i+4 | 2i+2 |

When the provoking vertex mode is `VK_PROVOKING_VERTEX_MODE_LAST_VERTEX_EXT`, the original vertex numbers used are the same as above except as indicated in the table below.

| Primitive Topology | Vertex 0 | Vertex 1 | Vertex 2 |
| --- | --- | --- | --- |
| VK_PRIMITIVE_TOPOLOGY_TRIANGLE_STRIP (odd, and `triStripVertexOrderIndependentOfProvokingVertex`  is `VK_FALSE`) | i+1 | i | i+2 |
| VK_PRIMITIVE_TOPOLOGY_TRIANGLE_FAN | 0 | i+1 | i+2 |
| VK_PRIMITIVE_TOPOLOGY_TRIANGLE_STRIP_WITH_ADJACENCY (odd) | 2i+2 | 2i | 2i+4 |

A new property structure is added:

typedef struct VkPhysicalDeviceFragmentShaderBarycentricPropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           triStripVertexOrderIndependentOfProvokingVertex;
} VkPhysicalDeviceFragmentShaderBarycentricPropertiesKHR;

The `triStripVertexOrderIndependentOfProvokingVertex` property indicates that the implementation does not change its vertex numbering for triangle strip primitives
when the [provoking vertex mode](https://docs.vulkan.org/spec/latest/chapters/vertexpostproc.html#VkProvokingVertexModeEXT) is `VK_PROVOKING_VERTEX_MODE_LAST_VERTEX_EXT`.

The following variables from [`GL_EXT_fragment_shader_barycentric`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_fragment_shader_barycentric.txt)
map to these SPIR-V built-in decorations:

* 
in vec3 gl_BaryCoordEXT; → BaryCoordKHR

* 
in vec3 gl_BaryCoordNoPerspEXT; → BaryCoordNoPerspKHR

GLSL variables declared using the `__pervertexEXT` GLSL qualifier are expected to be decorated with `PerVertexKHR` in SPIR-V.

* 
in float3 barycentrics : SV_Barycentrics; → BaryCoordKHR

* 
in noperspective float3 barycentrics : SV_Barycentrics; → BaryCoordNoPerspKHR

Values of per-vertex attributes provided by `GetAttributeAtVertex` are expected to be decorated with `PerVertexKHR` in SPIR-V.

None
