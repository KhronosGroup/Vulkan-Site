# VkMemoryGetZirconHandleInfoFUCHSIA(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryGetZirconHandleInfoFUCHSIA.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryGetZirconHandleInfoFUCHSIA - Structure specifying export parameters for Zircon handle to device memory

`VkMemoryGetZirconHandleInfoFUCHSIA` is defined as:

// Provided by VK_FUCHSIA_external_memory
typedef struct VkMemoryGetZirconHandleInfoFUCHSIA {
    VkStructureType                       sType;
    const void*                           pNext;
    VkDeviceMemory                        memory;
    VkExternalMemoryHandleTypeFlagBits    handleType;
} VkMemoryGetZirconHandleInfoFUCHSIA;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memory` the [VkDeviceMemory](VkDeviceMemory.html) being exported.

* 
`handleType` is a [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) value
specifying the type of the handle pointed to by
[vkGetMemoryZirconHandleFUCHSIA](vkGetMemoryZirconHandleFUCHSIA.html)::`pZirconHandle`.

Valid Usage

* 
[](#VUID-VkMemoryGetZirconHandleInfoFUCHSIA-handleType-04775) VUID-VkMemoryGetZirconHandleInfoFUCHSIA-handleType-04775

`handleType` **must** be
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ZIRCON_VMO_BIT_FUCHSIA](VkExternalMemoryHandleTypeFlagBits.html)

* 
[](#VUID-VkMemoryGetZirconHandleInfoFUCHSIA-handleType-04776) VUID-VkMemoryGetZirconHandleInfoFUCHSIA-handleType-04776

`handleType` **must** have been included in the `handleTypes` field
of the `VkExportMemoryAllocateInfo` structure when the external
memory was allocated

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryGetZirconHandleInfoFUCHSIA-sType-sType) VUID-VkMemoryGetZirconHandleInfoFUCHSIA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_GET_ZIRCON_HANDLE_INFO_FUCHSIA](VkStructureType.html)

* 
[](#VUID-VkMemoryGetZirconHandleInfoFUCHSIA-pNext-pNext) VUID-VkMemoryGetZirconHandleInfoFUCHSIA-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMemoryGetZirconHandleInfoFUCHSIA-memory-parameter) VUID-VkMemoryGetZirconHandleInfoFUCHSIA-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](VkDeviceMemory.html) handle

* 
[](#VUID-VkMemoryGetZirconHandleInfoFUCHSIA-handleType-parameter) VUID-VkMemoryGetZirconHandleInfoFUCHSIA-handleType-parameter

 `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) value

[VK_FUCHSIA_external_memory](VK_FUCHSIA_external_memory.html), [VkDeviceMemory](VkDeviceMemory.html), [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html), [VkStructureType](VkStructureType.html), [vkGetMemoryZirconHandleFUCHSIA](vkGetMemoryZirconHandleFUCHSIA.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkMemoryGetZirconHandleInfoFUCHSIA).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
