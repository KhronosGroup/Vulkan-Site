# VkRenderingEndInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRenderingEndInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRenderingEndInfoKHR - Structure specifying render pass end information

The `VkRenderingEndInfoKHR` structure is defined as:

// Provided by VK_KHR_maintenance10
typedef struct VkRenderingEndInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
} VkRenderingEndInfoKHR;

// Provided by VK_EXT_fragment_density_map_offset
// Equivalent to VkRenderingEndInfoKHR
typedef VkRenderingEndInfoKHR VkRenderingEndInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

Valid Usage (Implicit)

* 
[](#VUID-VkRenderingEndInfoKHR-sType-sType) VUID-VkRenderingEndInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDERING_END_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkRenderingEndInfoKHR-pNext-pNext) VUID-VkRenderingEndInfoKHR-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkRenderPassFragmentDensityMapOffsetEndInfoEXT](VkRenderPassFragmentDensityMapOffsetEndInfoEXT.html)

* 
[](#VUID-VkRenderingEndInfoKHR-sType-unique) VUID-VkRenderingEndInfoKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

[VK_EXT_fragment_density_map_offset](VK_EXT_fragment_density_map_offset.html), [VK_KHR_maintenance10](VK_KHR_maintenance10.html), [VkStructureType](VkStructureType.html), [vkCmdEndRendering2KHR](vkCmdEndRendering2KHR.html), [vkCmdEndRendering2KHR](vkCmdEndRendering2KHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkRenderingEndInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
