# VkMemoryMetalHandlePropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryMetalHandlePropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryMetalHandlePropertiesEXT - Properties of External Memory Metal Handles

The `VkMemoryMetalHandlePropertiesEXT` structure returned is defined as:

// Provided by VK_EXT_external_memory_metal
typedef struct VkMemoryMetalHandlePropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           memoryTypeBits;
} VkMemoryMetalHandlePropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memoryTypeBits` is a bitmask containing one bit set for every
memory type which the specified Metal handle **can** be imported as.

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryMetalHandlePropertiesEXT-sType-sType) VUID-VkMemoryMetalHandlePropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_METAL_HANDLE_PROPERTIES_EXT](VkStructureType.html)

* 
[](#VUID-VkMemoryMetalHandlePropertiesEXT-pNext-pNext) VUID-VkMemoryMetalHandlePropertiesEXT-pNext-pNext

 `pNext` **must** be `NULL`

[VK_EXT_external_memory_metal](VK_EXT_external_memory_metal.html), [VkStructureType](VkStructureType.html), [vkGetMemoryMetalHandlePropertiesEXT](vkGetMemoryMetalHandlePropertiesEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkMemoryMetalHandlePropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
