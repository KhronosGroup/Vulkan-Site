# VkMemoryRequirements(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryRequirements.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryRequirements - Structure specifying memory requirements

The `VkMemoryRequirements` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkMemoryRequirements {
    VkDeviceSize    size;
    VkDeviceSize    alignment;
    uint32_t        memoryTypeBits;
} VkMemoryRequirements;

* 
`size` is the size, in bytes, of the memory allocation **required** for
the resource.

* 
`alignment` is the alignment, in bytes, of the offset within the
allocation **required** for the resource.

* 
`memoryTypeBits` is a bitmask and contains one bit set for every
supported memory type for the resource.
Bit `i` is set if and only if the memory type `i` in the
`VkPhysicalDeviceMemoryProperties` structure for the physical device
is supported for the resource.

[VK_VERSION_1_0](VK_VERSION_1_0.html), `VkDeviceSize`, [VkMemoryRequirements2](VkMemoryRequirements2.html), [VkVideoSessionMemoryRequirementsKHR](VkVideoSessionMemoryRequirementsKHR.html), [vkGetBufferMemoryRequirements](vkGetBufferMemoryRequirements.html), [vkGetImageMemoryRequirements](vkGetImageMemoryRequirements.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkMemoryRequirements).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
