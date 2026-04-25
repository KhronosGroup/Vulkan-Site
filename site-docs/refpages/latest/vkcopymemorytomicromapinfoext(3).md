# VkCopyMemoryToMicromapInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCopyMemoryToMicromapInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCopyMemoryToMicromapInfoEXT - Parameters for deserializing a micromap

The `VkCopyMemoryToMicromapInfoEXT` structure is defined as:

// Provided by VK_EXT_opacity_micromap
typedef struct VkCopyMemoryToMicromapInfoEXT {
    VkStructureType                  sType;
    const void*                      pNext;
    VkDeviceOrHostAddressConstKHR    src;
    VkMicromapEXT                    dst;
    VkCopyMicromapModeEXT            mode;
} VkCopyMemoryToMicromapInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`src` is the device or host address of memory containing the source
data for the copy.

* 
`dst` is the target micromap for the copy.

* 
`mode` is a [VkCopyMicromapModeEXT](VkCopyMicromapModeEXT.html) value specifying additional
operations to perform during the copy.

Valid Usage

* 
[](#VUID-VkCopyMemoryToMicromapInfoEXT-src-07547) VUID-VkCopyMemoryToMicromapInfoEXT-src-07547

The source memory pointed to by `src` **must** contain data previously
serialized using [vkCmdCopyMicromapToMemoryEXT](vkCmdCopyMicromapToMemoryEXT.html)

* 
[](#VUID-VkCopyMemoryToMicromapInfoEXT-mode-07548) VUID-VkCopyMemoryToMicromapInfoEXT-mode-07548

`mode` **must** be [VK_COPY_MICROMAP_MODE_DESERIALIZE_EXT](VkCopyMicromapModeEXT.html)

* 
[](#VUID-VkCopyMemoryToMicromapInfoEXT-src-07549) VUID-VkCopyMemoryToMicromapInfoEXT-src-07549

The data in `src` **must** have a format compatible with the
destination physical device as returned by
[vkGetDeviceMicromapCompatibilityEXT](vkGetDeviceMicromapCompatibilityEXT.html)

* 
[](#VUID-VkCopyMemoryToMicromapInfoEXT-dst-07550) VUID-VkCopyMemoryToMicromapInfoEXT-dst-07550

`dst` **must** have been created with a `size` greater than or
equal to that used to serialize the data in `src`

Valid Usage (Implicit)

* 
[](#VUID-VkCopyMemoryToMicromapInfoEXT-sType-sType) VUID-VkCopyMemoryToMicromapInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COPY_MEMORY_TO_MICROMAP_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkCopyMemoryToMicromapInfoEXT-pNext-pNext) VUID-VkCopyMemoryToMicromapInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCopyMemoryToMicromapInfoEXT-dst-parameter) VUID-VkCopyMemoryToMicromapInfoEXT-dst-parameter

 `dst` **must** be a valid [VkMicromapEXT](VkMicromapEXT.html) handle

* 
[](#VUID-VkCopyMemoryToMicromapInfoEXT-mode-parameter) VUID-VkCopyMemoryToMicromapInfoEXT-mode-parameter

 `mode` **must** be a valid [VkCopyMicromapModeEXT](VkCopyMicromapModeEXT.html) value

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), [VkCopyMicromapModeEXT](VkCopyMicromapModeEXT.html), [VkDeviceOrHostAddressConstKHR](VkDeviceOrHostAddressConstKHR.html), [VkMicromapEXT](VkMicromapEXT.html), [VkStructureType](VkStructureType.html), [vkCmdCopyMemoryToMicromapEXT](vkCmdCopyMemoryToMicromapEXT.html), [vkCopyMemoryToMicromapEXT](vkCopyMemoryToMicromapEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_EXT_opacity_micromap/micromaps.html#VkCopyMemoryToMicromapInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
