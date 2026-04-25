# VkCopyMicromapInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCopyMicromapInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCopyMicromapInfoEXT - Parameters for copying a micromap

The `VkCopyMicromapInfoEXT` structure is defined as:

// Provided by VK_EXT_opacity_micromap
typedef struct VkCopyMicromapInfoEXT {
    VkStructureType          sType;
    const void*              pNext;
    VkMicromapEXT            src;
    VkMicromapEXT            dst;
    VkCopyMicromapModeEXT    mode;
} VkCopyMicromapInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`src` is the source micromap for the copy.

* 
`dst` is the target micromap for the copy.

* 
`mode` is a [VkCopyMicromapModeEXT](VkCopyMicromapModeEXT.html) value specifying additional
operations to perform during the copy.

Valid Usage

* 
[](#VUID-VkCopyMicromapInfoEXT-mode-07531) VUID-VkCopyMicromapInfoEXT-mode-07531

`mode` **must** be [VK_COPY_MICROMAP_MODE_COMPACT_EXT](VkCopyMicromapModeEXT.html) or
[VK_COPY_MICROMAP_MODE_CLONE_EXT](VkCopyMicromapModeEXT.html)

* 
[](#VUID-VkCopyMicromapInfoEXT-src-07532) VUID-VkCopyMicromapInfoEXT-src-07532

The source acceleration structure `src` **must** have been constructed
prior to the execution of this command

* 
[](#VUID-VkCopyMicromapInfoEXT-mode-07533) VUID-VkCopyMicromapInfoEXT-mode-07533

If `mode` is [VK_COPY_MICROMAP_MODE_COMPACT_EXT](VkCopyMicromapModeEXT.html), `src`
**must** have been constructed with
[VK_BUILD_MICROMAP_ALLOW_COMPACTION_BIT_EXT](VkBuildMicromapFlagBitsEXT.html) in the build

* 
[](#VUID-VkCopyMicromapInfoEXT-buffer-07534) VUID-VkCopyMicromapInfoEXT-buffer-07534

The `buffer` used to create `src` **must** be bound to device
memory

* 
[](#VUID-VkCopyMicromapInfoEXT-buffer-07535) VUID-VkCopyMicromapInfoEXT-buffer-07535

The `buffer` used to create `dst` **must** be bound to device
memory

Valid Usage (Implicit)

* 
[](#VUID-VkCopyMicromapInfoEXT-sType-sType) VUID-VkCopyMicromapInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COPY_MICROMAP_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkCopyMicromapInfoEXT-pNext-pNext) VUID-VkCopyMicromapInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCopyMicromapInfoEXT-src-parameter) VUID-VkCopyMicromapInfoEXT-src-parameter

 `src` **must** be a valid [VkMicromapEXT](VkMicromapEXT.html) handle

* 
[](#VUID-VkCopyMicromapInfoEXT-dst-parameter) VUID-VkCopyMicromapInfoEXT-dst-parameter

 `dst` **must** be a valid [VkMicromapEXT](VkMicromapEXT.html) handle

* 
[](#VUID-VkCopyMicromapInfoEXT-mode-parameter) VUID-VkCopyMicromapInfoEXT-mode-parameter

 `mode` **must** be a valid [VkCopyMicromapModeEXT](VkCopyMicromapModeEXT.html) value

* 
[](#VUID-VkCopyMicromapInfoEXT-commonparent) VUID-VkCopyMicromapInfoEXT-commonparent

 Both of `dst`, and `src` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), [VkCopyMicromapModeEXT](VkCopyMicromapModeEXT.html), [VkMicromapEXT](VkMicromapEXT.html), [VkStructureType](VkStructureType.html), [vkCmdCopyMicromapEXT](vkCmdCopyMicromapEXT.html), [vkCopyMicromapEXT](vkCopyMicromapEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_EXT_opacity_micromap/micromaps.html#VkCopyMicromapInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
