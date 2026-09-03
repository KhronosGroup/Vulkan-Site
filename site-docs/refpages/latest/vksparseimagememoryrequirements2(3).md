# VkSparseImageMemoryRequirements2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSparseImageMemoryRequirements2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSparseImageMemoryRequirements2 - (None)

The `VkSparseImageMemoryRequirements2` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkSparseImageMemoryRequirements2 {
    VkStructureType                    sType;
    void*                              pNext;
    VkSparseImageMemoryRequirements    memoryRequirements;
} VkSparseImageMemoryRequirements2;

// Provided by VK_KHR_get_memory_requirements2
// Equivalent to VkSparseImageMemoryRequirements2
typedef VkSparseImageMemoryRequirements2 VkSparseImageMemoryRequirements2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memoryRequirements` is a [VkSparseImageMemoryRequirements](VkSparseImageMemoryRequirements.html)
structure describing the memory requirements of the sparse image.

Valid Usage (Implicit)

* 
[](#VUID-VkSparseImageMemoryRequirements2-sType-sType) VUID-VkSparseImageMemoryRequirements2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SPARSE_IMAGE_MEMORY_REQUIREMENTS_2](VkStructureType.html)

* 
[](#VUID-VkSparseImageMemoryRequirements2-pNext-pNext) VUID-VkSparseImageMemoryRequirements2-pNext-pNext

 `pNext` **must** be `NULL`

[VK_KHR_get_memory_requirements2](VK_KHR_get_memory_requirements2.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkSparseImageMemoryRequirements](VkSparseImageMemoryRequirements.html), [VkStructureType](VkStructureType.html), [vkGetDeviceImageSparseMemoryRequirements](vkGetDeviceImageSparseMemoryRequirements.html), [vkGetDeviceImageSparseMemoryRequirements](vkGetDeviceImageSparseMemoryRequirements.html), [vkGetImageSparseMemoryRequirements2](vkGetImageSparseMemoryRequirements2.html), [vkGetImageSparseMemoryRequirements2](vkGetImageSparseMemoryRequirements2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/sparsemem.html#VkSparseImageMemoryRequirements2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
