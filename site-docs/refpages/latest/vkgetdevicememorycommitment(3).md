# vkGetDeviceMemoryCommitment(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDeviceMemoryCommitment.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDeviceMemoryCommitment - Query the current commitment for a VkDeviceMemory

To determine the amount of lazily-allocated memory that is currently
committed for a memory object, call:

// Provided by VK_VERSION_1_0
void vkGetDeviceMemoryCommitment(
    VkDevice                                    device,
    VkDeviceMemory                              memory,
    VkDeviceSize*                               pCommittedMemoryInBytes);

* 
`device` is the logical device that owns the memory.

* 
`memory` is the memory object being queried.

* 
`pCommittedMemoryInBytes` is a pointer to a `VkDeviceSize`
value in which the number of bytes currently committed is returned, on
success.

The implementation **may** update the commitment at any time, and the value
returned by this query **may** be out of date.

The implementation guarantees to allocate any committed memory from the
`heapIndex` indicated by the memory type that the memory object was
created with.

Valid Usage

* 
[](#VUID-vkGetDeviceMemoryCommitment-memory-00690) VUID-vkGetDeviceMemoryCommitment-memory-00690

`memory` **must** have been created with a memory type that reports
[VK_MEMORY_PROPERTY_LAZILY_ALLOCATED_BIT](VkMemoryPropertyFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceMemoryCommitment-device-parameter) VUID-vkGetDeviceMemoryCommitment-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDeviceMemoryCommitment-memory-parameter) VUID-vkGetDeviceMemoryCommitment-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](VkDeviceMemory.html) handle

* 
[](#VUID-vkGetDeviceMemoryCommitment-pCommittedMemoryInBytes-parameter) VUID-vkGetDeviceMemoryCommitment-pCommittedMemoryInBytes-parameter

 `pCommittedMemoryInBytes` **must** be a valid pointer to a `VkDeviceSize` value

* 
[](#VUID-vkGetDeviceMemoryCommitment-memory-parent) VUID-vkGetDeviceMemoryCommitment-memory-parent

 `memory` **must** have been created, allocated, or retrieved from `device`

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDevice](VkDevice.html), [VkDeviceMemory](VkDeviceMemory.html), `VkDeviceSize`

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#vkGetDeviceMemoryCommitment).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
