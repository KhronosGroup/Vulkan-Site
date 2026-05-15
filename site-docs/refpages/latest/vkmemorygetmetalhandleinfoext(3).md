# VkMemoryGetMetalHandleInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryGetMetalHandleInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryGetMetalHandleInfoEXT - Structure describing a Metal handle memory export operation

The `VkMemoryGetMetalHandleInfoEXT` structure is defined as:

// Provided by VK_EXT_external_memory_metal
typedef struct VkMemoryGetMetalHandleInfoEXT {
    VkStructureType                       sType;
    const void*                           pNext;
    VkDeviceMemory                        memory;
    VkExternalMemoryHandleTypeFlagBits    handleType;
} VkMemoryGetMetalHandleInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memory` is the memory object from which the handle will be
exported.

* 
`handleType` is a [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) value
specifying the type of handle requested.

The properties of the handle returned depend on the value of
`handleType`.
See [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) for a description of the
properties of the defined external memory handle types.

Valid Usage

* 
[](#VUID-VkMemoryGetMetalHandleInfoEXT-memory-10413) VUID-VkMemoryGetMetalHandleInfoEXT-memory-10413

`memory` **must** have been created with a valid
[VkExportMemoryAllocateInfo](VkExportMemoryAllocateInfo.html)

* 
[](#VUID-VkMemoryGetMetalHandleInfoEXT-handleType-10414) VUID-VkMemoryGetMetalHandleInfoEXT-handleType-10414

`handleType` **must** have been included in
[VkExportMemoryAllocateInfo](VkExportMemoryAllocateInfo.html)::`handleTypes` when `memory`
was created

* 
[](#VUID-VkMemoryGetMetalHandleInfoEXT-handleType-10415) VUID-VkMemoryGetMetalHandleInfoEXT-handleType-10415

`handleType` **must** be
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLBUFFER_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html),
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLTEXTURE_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html) or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLHEAP_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryGetMetalHandleInfoEXT-sType-sType) VUID-VkMemoryGetMetalHandleInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_GET_METAL_HANDLE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkMemoryGetMetalHandleInfoEXT-pNext-pNext) VUID-VkMemoryGetMetalHandleInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMemoryGetMetalHandleInfoEXT-memory-parameter) VUID-VkMemoryGetMetalHandleInfoEXT-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](VkDeviceMemory.html) handle

* 
[](#VUID-VkMemoryGetMetalHandleInfoEXT-handleType-parameter) VUID-VkMemoryGetMetalHandleInfoEXT-handleType-parameter

 `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) value

[VK_EXT_external_memory_metal](VK_EXT_external_memory_metal.html), [VkDeviceMemory](VkDeviceMemory.html), [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html), [VkStructureType](VkStructureType.html), [vkGetMemoryMetalHandleEXT](vkGetMemoryMetalHandleEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkMemoryGetMetalHandleInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
