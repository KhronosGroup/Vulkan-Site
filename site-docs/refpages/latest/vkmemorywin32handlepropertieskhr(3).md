# VkMemoryWin32HandlePropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryWin32HandlePropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryWin32HandlePropertiesKHR - Properties of External Memory Windows Handles

The `VkMemoryWin32HandlePropertiesKHR` structure returned is defined as:

// Provided by VK_KHR_external_memory_win32
typedef struct VkMemoryWin32HandlePropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           memoryTypeBits;
} VkMemoryWin32HandlePropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memoryTypeBits` is a bitmask containing one bit set for every
memory type which the specified windows handle **can** be imported as.

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryWin32HandlePropertiesKHR-sType-sType) VUID-VkMemoryWin32HandlePropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_WIN32_HANDLE_PROPERTIES_KHR](VkStructureType.html)

* 
[](#VUID-VkMemoryWin32HandlePropertiesKHR-pNext-pNext) VUID-VkMemoryWin32HandlePropertiesKHR-pNext-pNext

 `pNext` **must** be `NULL`

[VK_KHR_external_memory_win32](VK_KHR_external_memory_win32.html), [VkStructureType](VkStructureType.html), [vkGetMemoryWin32HandlePropertiesKHR](vkGetMemoryWin32HandlePropertiesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkMemoryWin32HandlePropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
