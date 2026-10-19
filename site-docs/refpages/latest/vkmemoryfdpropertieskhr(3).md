# VkMemoryFdPropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryFdPropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryFdPropertiesKHR - Properties of External Memory File Descriptors

The `VkMemoryFdPropertiesKHR` structure returned is defined as:

// Provided by VK_KHR_external_memory_fd
typedef struct VkMemoryFdPropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           memoryTypeBits;
} VkMemoryFdPropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memoryTypeBits` is a bitmask containing one bit set for every
memory type which the specified file descriptor **can** be imported as.

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryFdPropertiesKHR-sType-sType) VUID-VkMemoryFdPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_FD_PROPERTIES_KHR](VkStructureType.html)

* 
[](#VUID-VkMemoryFdPropertiesKHR-pNext-pNext) VUID-VkMemoryFdPropertiesKHR-pNext-pNext

 `pNext` **must** be `NULL`

[VK_KHR_external_memory_fd](VK_KHR_external_memory_fd.html), [VkStructureType](VkStructureType.html), [vkGetMemoryFdPropertiesKHR](vkGetMemoryFdPropertiesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkMemoryFdPropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
