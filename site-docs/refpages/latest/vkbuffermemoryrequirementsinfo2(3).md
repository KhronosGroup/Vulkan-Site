# VkBufferMemoryRequirementsInfo2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBufferMemoryRequirementsInfo2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBufferMemoryRequirementsInfo2 - (None)

The `VkBufferMemoryRequirementsInfo2` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkBufferMemoryRequirementsInfo2 {
    VkStructureType    sType;
    const void*        pNext;
    VkBuffer           buffer;
} VkBufferMemoryRequirementsInfo2;

// Provided by VK_KHR_get_memory_requirements2
// Equivalent to VkBufferMemoryRequirementsInfo2
typedef VkBufferMemoryRequirementsInfo2 VkBufferMemoryRequirementsInfo2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`buffer` is the buffer to query.

Valid Usage (Implicit)

* 
[](#VUID-VkBufferMemoryRequirementsInfo2-sType-sType) VUID-VkBufferMemoryRequirementsInfo2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_MEMORY_REQUIREMENTS_INFO_2](VkStructureType.html)

* 
[](#VUID-VkBufferMemoryRequirementsInfo2-pNext-pNext) VUID-VkBufferMemoryRequirementsInfo2-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkBufferMemoryRequirementsInfo2-buffer-parameter) VUID-VkBufferMemoryRequirementsInfo2-buffer-parameter

 `buffer` **must** be a valid [VkBuffer](VkBuffer.html) handle

[VK_KHR_get_memory_requirements2](VK_KHR_get_memory_requirements2.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkBuffer](VkBuffer.html), [VkStructureType](VkStructureType.html), [vkGetBufferMemoryRequirements2](vkGetBufferMemoryRequirements2.html), [vkGetBufferMemoryRequirements2](vkGetBufferMemoryRequirements2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkBufferMemoryRequirementsInfo2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
