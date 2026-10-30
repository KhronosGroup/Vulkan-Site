# VkImageSparseMemoryRequirementsInfo2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageSparseMemoryRequirementsInfo2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageSparseMemoryRequirementsInfo2 - (None)

The `VkImageSparseMemoryRequirementsInfo2` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkImageSparseMemoryRequirementsInfo2 {
    VkStructureType    sType;
    const void*        pNext;
    VkImage            image;
} VkImageSparseMemoryRequirementsInfo2;

// Provided by VK_KHR_get_memory_requirements2
// Equivalent to VkImageSparseMemoryRequirementsInfo2
typedef VkImageSparseMemoryRequirementsInfo2 VkImageSparseMemoryRequirementsInfo2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`image` is the image to query.

Valid Usage (Implicit)

* 
[](#VUID-VkImageSparseMemoryRequirementsInfo2-sType-sType) VUID-VkImageSparseMemoryRequirementsInfo2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_SPARSE_MEMORY_REQUIREMENTS_INFO_2](VkStructureType.html)

* 
[](#VUID-VkImageSparseMemoryRequirementsInfo2-pNext-pNext) VUID-VkImageSparseMemoryRequirementsInfo2-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkImageSparseMemoryRequirementsInfo2-image-parameter) VUID-VkImageSparseMemoryRequirementsInfo2-image-parameter

 `image` **must** be a valid [VkImage](VkImage.html) handle

[VK_KHR_get_memory_requirements2](VK_KHR_get_memory_requirements2.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkImage](VkImage.html), [VkStructureType](VkStructureType.html), [vkGetImageSparseMemoryRequirements2](vkGetImageSparseMemoryRequirements2.html), [vkGetImageSparseMemoryRequirements2](vkGetImageSparseMemoryRequirements2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/sparsemem.html#VkImageSparseMemoryRequirementsInfo2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
