# VkMicromapBuildSizesInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMicromapBuildSizesInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMicromapBuildSizesInfoEXT - Structure specifying build sizes for a micromap

The `VkMicromapBuildSizesInfoEXT` structure describes the required build
sizes for a micromap and scratch buffers and is defined as:

// Provided by VK_EXT_opacity_micromap
typedef struct VkMicromapBuildSizesInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkDeviceSize       micromapSize;
    VkDeviceSize       buildScratchSize;
    VkBool32           discardable;
} VkMicromapBuildSizesInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`micromapSize` is the size in bytes required in a
[VkMicromapEXT](VkMicromapEXT.html) for a build or update operation.

* 
`buildScratchSize` is the size in bytes required in a scratch buffer
for a build operation.

* 
`discardable` indicates whether or not the micromap object may be
destroyed after an acceleration structure build or update.
A false value means that acceleration structures built with this
micromap **may** contain references to the data contained therein, and the
application **must** not destroy the micromap until ray traversal has
concluded.
A true value means that the information in the micromap will be copied
by value into the acceleration structure, and the micromap **may** be
destroyed after the acceleration structure build concludes.

Valid Usage (Implicit)

* 
[](#VUID-VkMicromapBuildSizesInfoEXT-sType-sType) VUID-VkMicromapBuildSizesInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MICROMAP_BUILD_SIZES_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkMicromapBuildSizesInfoEXT-pNext-pNext) VUID-VkMicromapBuildSizesInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), `VkBool32`, `VkDeviceSize`, [VkStructureType](VkStructureType.html), [vkGetMicromapBuildSizesEXT](vkGetMicromapBuildSizesEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkMicromapBuildSizesInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
