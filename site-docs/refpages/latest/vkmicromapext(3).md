# VkMicromapEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMicromapEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMicromapEXT - Opaque handle to a micromap object

Micromaps are opaque data structures that are built by the implementation to
encode sub-triangle data to be included in an acceleration structure.

Micromaps are represented by `VkMicromapEXT` handles:

// Provided by VK_EXT_opacity_micromap
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkMicromapEXT)

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), [VkAccelerationStructureTrianglesDisplacementMicromapNV](VkAccelerationStructureTrianglesDisplacementMicromapNV.html), [VkAccelerationStructureTrianglesOpacityMicromapEXT](VkAccelerationStructureTrianglesOpacityMicromapEXT.html), [VkCopyMemoryToMicromapInfoEXT](VkCopyMemoryToMicromapInfoEXT.html), [VkCopyMicromapInfoEXT](VkCopyMicromapInfoEXT.html), [VkCopyMicromapToMemoryInfoEXT](VkCopyMicromapToMemoryInfoEXT.html), [VkMicromapBuildInfoEXT](VkMicromapBuildInfoEXT.html), [vkCmdWriteMicromapsPropertiesEXT](vkCmdWriteMicromapsPropertiesEXT.html), [vkCreateMicromapEXT](vkCreateMicromapEXT.html), [vkDestroyMicromapEXT](vkDestroyMicromapEXT.html), [vkWriteMicromapsPropertiesEXT](vkWriteMicromapsPropertiesEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkMicromapEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
