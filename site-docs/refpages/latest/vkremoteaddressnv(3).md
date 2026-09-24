# VkRemoteAddressNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRemoteAddressNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRemoteAddressNV - Remote device address type

`VkRemoteAddressNV` represents an address of a memory object
accessible by remote devices, as returned in
[vkGetMemoryRemoteAddressNV](vkGetMemoryRemoteAddressNV.html)::`pAddress`.

// Provided by VK_NV_external_memory_rdma
typedef void* VkRemoteAddressNV;

[VK_NV_external_memory_rdma](VK_NV_external_memory_rdma.html), [vkGetMemoryRemoteAddressNV](vkGetMemoryRemoteAddressNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkRemoteAddressNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
