# VK_WHOLE_SIZE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_WHOLE_SIZE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_WHOLE_SIZE - Sentinel value to use entire remaining array length

[VK_WHOLE_SIZE](#) is a special value indicating that the entire remaining
length of a buffer or allocation following a given `offset` should be
used.
It **can** be specified for [VkBufferMemoryBarrier](VkBufferMemoryBarrier.html)::`size`,
[vkMapMemory](vkMapMemory.html)::`size`, and other similar structures.

#define VK_WHOLE_SIZE                     (~0ULL)

[VK_VERSION_1_0](VK_VERSION_1_0.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VK_WHOLE_SIZE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
