# VkCopyMicromapToMemoryInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCopyMicromapToMemoryInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCopyMicromapToMemoryInfoEXT - Parameters for serializing a micromap

// Provided by VK_EXT_opacity_micromap
typedef struct VkCopyMicromapToMemoryInfoEXT {
    VkStructureType             sType;
    const void*                 pNext;
    VkMicromapEXT               src;
    VkDeviceOrHostAddressKHR    dst;
    VkCopyMicromapModeEXT       mode;
} VkCopyMicromapToMemoryInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`src` is the source micromap for the copy

* 
`dst` is the device or host address of memory which is the target
for the copy

* 
`mode` is a [VkCopyMicromapModeEXT](VkCopyMicromapModeEXT.html) value specifying additional
operations to perform during the copy.

Valid Usage

* 
[](#VUID-VkCopyMicromapToMemoryInfoEXT-src-07540) VUID-VkCopyMicromapToMemoryInfoEXT-src-07540

The source micromap `src` **must** have been constructed prior to the
execution of this command

* 
[](#VUID-VkCopyMicromapToMemoryInfoEXT-dst-07541) VUID-VkCopyMicromapToMemoryInfoEXT-dst-07541

The memory pointed to by `dst` **must** be at least as large as the
serialization size of `src`, as reported by
[vkWriteMicromapsPropertiesEXT](vkWriteMicromapsPropertiesEXT.html) or
[vkCmdWriteMicromapsPropertiesEXT](vkCmdWriteMicromapsPropertiesEXT.html) with a query type of
[VK_QUERY_TYPE_MICROMAP_SERIALIZATION_SIZE_EXT](VkQueryType.html)

* 
[](#VUID-VkCopyMicromapToMemoryInfoEXT-mode-07542) VUID-VkCopyMicromapToMemoryInfoEXT-mode-07542

`mode` **must** be [VK_COPY_MICROMAP_MODE_SERIALIZE_EXT](VkCopyMicromapModeEXT.html)

Valid Usage (Implicit)

* 
[](#VUID-VkCopyMicromapToMemoryInfoEXT-sType-sType) VUID-VkCopyMicromapToMemoryInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COPY_MICROMAP_TO_MEMORY_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkCopyMicromapToMemoryInfoEXT-pNext-pNext) VUID-VkCopyMicromapToMemoryInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCopyMicromapToMemoryInfoEXT-src-parameter) VUID-VkCopyMicromapToMemoryInfoEXT-src-parameter

 `src` **must** be a valid [VkMicromapEXT](VkMicromapEXT.html) handle

* 
[](#VUID-VkCopyMicromapToMemoryInfoEXT-mode-parameter) VUID-VkCopyMicromapToMemoryInfoEXT-mode-parameter

 `mode` **must** be a valid [VkCopyMicromapModeEXT](VkCopyMicromapModeEXT.html) value

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), [VkCopyMicromapModeEXT](VkCopyMicromapModeEXT.html), [VkDeviceOrHostAddressKHR](VkDeviceOrHostAddressKHR.html), [VkMicromapEXT](VkMicromapEXT.html), [VkStructureType](VkStructureType.html), [vkCmdCopyMicromapToMemoryEXT](vkCmdCopyMicromapToMemoryEXT.html), [vkCopyMicromapToMemoryEXT](vkCopyMicromapToMemoryEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_EXT_opacity_micromap/micromaps.html#VkCopyMicromapToMemoryInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
