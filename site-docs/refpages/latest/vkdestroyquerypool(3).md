# vkDestroyQueryPool(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyQueryPool.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyQueryPool - Destroy a query pool object

To destroy a query pool, call:

// Provided by VK_VERSION_1_0
void vkDestroyQueryPool(
    VkDevice                                    device,
    VkQueryPool                                 queryPool,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the query pool.

* 
`queryPool` is the query pool to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyQueryPool-queryPool-00793) VUID-vkDestroyQueryPool-queryPool-00793

All submitted commands that refer to `queryPool` **must** have
completed execution

* 
[](#VUID-vkDestroyQueryPool-queryPool-00794) VUID-vkDestroyQueryPool-queryPool-00794

If `VkAllocationCallbacks` were provided when `queryPool` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyQueryPool-queryPool-00795) VUID-vkDestroyQueryPool-queryPool-00795

If no `VkAllocationCallbacks` were provided when `queryPool` was
created, `pAllocator` **must** be `NULL`

|  | Applications **can** verify that `queryPool` **can** be destroyed by checking
| --- | --- |
that `vkGetQueryPoolResults`() without the
[VK_QUERY_RESULT_PARTIAL_BIT](VkQueryResultFlagBits.html) flag returns [VK_SUCCESS](VkResult.html) for all
queries that are used in command buffers submitted for execution. |

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyQueryPool-device-parameter) VUID-vkDestroyQueryPool-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyQueryPool-queryPool-parameter) VUID-vkDestroyQueryPool-queryPool-parameter

 If `queryPool` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `queryPool` **must** be a valid [VkQueryPool](VkQueryPool.html) handle

* 
[](#VUID-vkDestroyQueryPool-pAllocator-parameter) VUID-vkDestroyQueryPool-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyQueryPool-queryPool-parent) VUID-vkDestroyQueryPool-queryPool-parent

 If `queryPool` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `queryPool` **must** be externally synchronized

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkQueryPool](VkQueryPool.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#vkDestroyQueryPool).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
