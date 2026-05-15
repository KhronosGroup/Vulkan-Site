# VkPhysicalDeviceFragmentShaderBarycentricPropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceFragmentShaderBarycentricPropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceFragmentShaderBarycentricPropertiesKHR - Structure describing fragment shader barycentric limits of an implementation

The `VkPhysicalDeviceFragmentShaderBarycentricPropertiesKHR` structure
is defined as:

// Provided by VK_KHR_fragment_shader_barycentric
typedef struct VkPhysicalDeviceFragmentShaderBarycentricPropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           triStripVertexOrderIndependentOfProvokingVertex;
} VkPhysicalDeviceFragmentShaderBarycentricPropertiesKHR;

* 
 When the
[provoking vertex mode](../../../../spec/latest/chapters/vertexpostproc.html#vertexpostproc-flatshading) is
[VK_PROVOKING_VERTEX_MODE_LAST_VERTEX_EXT](VkProvokingVertexModeEXT.html), and the primitive order
is odd in a triangle strip, the ordering of vertices is defined in
[last vertex table](../../../../spec/latest/chapters/primsrast.html#primsrast-barycentric-order-table-last-vertex).
`triStripVertexOrderIndependentOfProvokingVertex` equal to
[VK_TRUE](VK_TRUE.html) indicates that the implementation ignores this and uses
the vertex order defined by
[VK_PROVOKING_VERTEX_MODE_FIRST_VERTEX_EXT](VkProvokingVertexModeEXT.html) instead.

If the `VkPhysicalDeviceFragmentShaderBarycentricPropertiesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFragmentShaderBarycentricPropertiesKHR-sType-sType) VUID-VkPhysicalDeviceFragmentShaderBarycentricPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_SHADER_BARYCENTRIC_PROPERTIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_KHR_fragment_shader_barycentric](VK_KHR_fragment_shader_barycentric.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceFragmentShaderBarycentricPropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
