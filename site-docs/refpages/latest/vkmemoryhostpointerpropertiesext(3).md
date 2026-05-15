# VkMemoryHostPointerPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryHostPointerPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryHostPointerPropertiesEXT - Properties of external memory host pointer

The `VkMemoryHostPointerPropertiesEXT` structure is defined as:

// Provided by VK_EXT_external_memory_host
typedef struct VkMemoryHostPointerPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           memoryTypeBits;
} VkMemoryHostPointerPropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memoryTypeBits` is a bitmask containing one bit set for every
memory type which the specified host pointer **can** be imported as.

The value returned by `memoryTypeBits` **should** only include bits that
identify memory types which are host visible.
Implementations **may** include bits that identify memory types which are not
host visible.
Behavior for imported pointers of such types is defined by
[](../../../../spec/latest/chapters/memory.html#host-memory-import-non-visible-type)[VkImportMemoryHostPointerInfoEXT](VkImportMemoryHostPointerInfoEXT.html).

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryHostPointerPropertiesEXT-sType-sType) VUID-VkMemoryHostPointerPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_HOST_POINTER_PROPERTIES_EXT](VkStructureType.html)

* 
[](#VUID-VkMemoryHostPointerPropertiesEXT-pNext-pNext) VUID-VkMemoryHostPointerPropertiesEXT-pNext-pNext

 `pNext` **must** be `NULL`

[VK_EXT_external_memory_host](VK_EXT_external_memory_host.html), [VkStructureType](VkStructureType.html), [vkGetMemoryHostPointerPropertiesEXT](vkGetMemoryHostPointerPropertiesEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkMemoryHostPointerPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
