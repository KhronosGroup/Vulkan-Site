# VkMicromapVersionInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMicromapVersionInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMicromapVersionInfoEXT - Micromap version information

The `VkMicromapVersionInfoEXT` structure is defined as:

// Provided by VK_EXT_opacity_micromap
typedef struct VkMicromapVersionInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    const uint8_t*     pVersionData;
} VkMicromapVersionInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pVersionData` is a pointer to the version header of a micromap as
defined in [vkCmdCopyMicromapToMemoryEXT](vkCmdCopyMicromapToMemoryEXT.html)

|  | `pVersionData` is a *pointer* to an array of 2×[VK_UUID_SIZE](VK_UUID_SIZE.html)
| --- | --- |
`uint8_t` values instead of two [VK_UUID_SIZE](VK_UUID_SIZE.html) arrays as the expected
use case for this member is to be pointed at the header of a previously
serialized micromap (via [vkCmdCopyMicromapToMemoryEXT](vkCmdCopyMicromapToMemoryEXT.html) or
[vkCopyMicromapToMemoryEXT](vkCopyMicromapToMemoryEXT.html)) that is loaded in memory.
Using arrays would necessitate extra memory copies of the UUIDs. |

Valid Usage (Implicit)

* 
[](#VUID-VkMicromapVersionInfoEXT-sType-sType) VUID-VkMicromapVersionInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MICROMAP_VERSION_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkMicromapVersionInfoEXT-pNext-pNext) VUID-VkMicromapVersionInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMicromapVersionInfoEXT-pVersionData-parameter) VUID-VkMicromapVersionInfoEXT-pVersionData-parameter

 `pVersionData` **must** be a valid pointer to an array of    `uint8_t` values

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), [VkStructureType](VkStructureType.html), [vkGetDeviceMicromapCompatibilityEXT](vkGetDeviceMicromapCompatibilityEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_EXT_opacity_micromap/micromaps.html#VkMicromapVersionInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
