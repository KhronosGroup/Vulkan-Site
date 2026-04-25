# VkMemoryType(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryType.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryType - Structure specifying memory type

The `VkMemoryType` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkMemoryType {
    VkMemoryPropertyFlags    propertyFlags;
    uint32_t                 heapIndex;
} VkMemoryType;

* 
`heapIndex` describes which memory heap this memory type corresponds
to, and **must** be less than `memoryHeapCount` from the
[VkPhysicalDeviceMemoryProperties](VkPhysicalDeviceMemoryProperties.html) structure.

* 
`propertyFlags` is a bitmask of [VkMemoryPropertyFlagBits](VkMemoryPropertyFlagBits.html) of
properties for this memory type.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkMemoryPropertyFlags](VkMemoryPropertyFlags.html), [VkPhysicalDeviceMemoryProperties](VkPhysicalDeviceMemoryProperties.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkMemoryType).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
