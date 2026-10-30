# VkMemoryGetRemoteAddressInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryGetRemoteAddressInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryGetRemoteAddressInfoNV - Structure describing a remote accessible address export operation

The `VkMemoryGetRemoteAddressInfoNV` structure is defined as:

// Provided by VK_NV_external_memory_rdma
typedef struct VkMemoryGetRemoteAddressInfoNV {
    VkStructureType                       sType;
    const void*                           pNext;
    VkDeviceMemory                        memory;
    VkExternalMemoryHandleTypeFlagBits    handleType;
} VkMemoryGetRemoteAddressInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memory` is the memory object from which the remote accessible
address will be exported.

* 
`handleType` is the type of handle requested.

Valid Usage

* 
[](#VUID-VkMemoryGetRemoteAddressInfoNV-handleType-04966) VUID-VkMemoryGetRemoteAddressInfoNV-handleType-04966

`handleType` **must** have been included in
[VkExportMemoryAllocateInfo](VkExportMemoryAllocateInfo.html)::`handleTypes` when `memory`
was created

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryGetRemoteAddressInfoNV-sType-sType) VUID-VkMemoryGetRemoteAddressInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_GET_REMOTE_ADDRESS_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkMemoryGetRemoteAddressInfoNV-pNext-pNext) VUID-VkMemoryGetRemoteAddressInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMemoryGetRemoteAddressInfoNV-memory-parameter) VUID-VkMemoryGetRemoteAddressInfoNV-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](VkDeviceMemory.html) handle

* 
[](#VUID-VkMemoryGetRemoteAddressInfoNV-handleType-parameter) VUID-VkMemoryGetRemoteAddressInfoNV-handleType-parameter

 `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) value

[VK_NV_external_memory_rdma](VK_NV_external_memory_rdma.html), [VkDeviceMemory](VkDeviceMemory.html), [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html), [VkStructureType](VkStructureType.html), [vkGetMemoryRemoteAddressNV](vkGetMemoryRemoteAddressNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkMemoryGetRemoteAddressInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
