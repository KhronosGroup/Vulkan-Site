# VkMemoryGetFdInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryGetFdInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryGetFdInfoKHR - Structure describing a POSIX FD memory export operation

The `VkMemoryGetFdInfoKHR` structure is defined as:

// Provided by VK_KHR_external_memory_fd
typedef struct VkMemoryGetFdInfoKHR {
    VkStructureType                       sType;
    const void*                           pNext;
    VkDeviceMemory                        memory;
    VkExternalMemoryHandleTypeFlagBits    handleType;
} VkMemoryGetFdInfoKHR;

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

The properties of the file descriptor exported depend on the value of
`handleType`.
See [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) for a description of the
properties of the defined external memory handle types.

|  | The size of the exported file **may** be larger than the size requested by
| --- | --- |
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html)::`allocationSize`.
If `handleType` is [VK_EXTERNAL_MEMORY_HANDLE_TYPE_DMA_BUF_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html),
then the application **can** query the file’s actual size with
[`lseek`](https://man7.org/linux/man-pages/man2/lseek.2.html). |

Valid Usage

* 
[](#VUID-VkMemoryGetFdInfoKHR-handleType-00671) VUID-VkMemoryGetFdInfoKHR-handleType-00671

`handleType` **must** have been included in
[VkExportMemoryAllocateInfo](VkExportMemoryAllocateInfo.html)::`handleTypes` when `memory`
was created

* 
[](#VUID-VkMemoryGetFdInfoKHR-handleType-00672) VUID-VkMemoryGetFdInfoKHR-handleType-00672

`handleType` **must** be
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_FD_BIT](VkExternalMemoryHandleTypeFlagBits.html) or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_DMA_BUF_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryGetFdInfoKHR-sType-sType) VUID-VkMemoryGetFdInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_GET_FD_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkMemoryGetFdInfoKHR-pNext-pNext) VUID-VkMemoryGetFdInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMemoryGetFdInfoKHR-memory-parameter) VUID-VkMemoryGetFdInfoKHR-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](VkDeviceMemory.html) handle

* 
[](#VUID-VkMemoryGetFdInfoKHR-handleType-parameter) VUID-VkMemoryGetFdInfoKHR-handleType-parameter

 `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) value

[VK_KHR_external_memory_fd](VK_KHR_external_memory_fd.html), [VkDeviceMemory](VkDeviceMemory.html), [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html), [VkStructureType](VkStructureType.html), [vkGetMemoryFdKHR](vkGetMemoryFdKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkMemoryGetFdInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
