# VkAcquireProfilingLockInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAcquireProfilingLockInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAcquireProfilingLockInfoKHR - Structure specifying parameters to acquire the profiling lock

The `VkAcquireProfilingLockInfoKHR` structure is defined as:

// Provided by VK_KHR_performance_query
typedef struct VkAcquireProfilingLockInfoKHR {
    VkStructureType                   sType;
    const void*                       pNext;
    VkAcquireProfilingLockFlagsKHR    flags;
    uint64_t                          timeout;
} VkAcquireProfilingLockInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`timeout` indicates how long the function waits, in nanoseconds, if
the profiling lock is not available.

Valid Usage (Implicit)

* 
[](#VUID-VkAcquireProfilingLockInfoKHR-sType-sType) VUID-VkAcquireProfilingLockInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACQUIRE_PROFILING_LOCK_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkAcquireProfilingLockInfoKHR-pNext-pNext) VUID-VkAcquireProfilingLockInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkAcquireProfilingLockInfoKHR-flags-zerobitmask) VUID-VkAcquireProfilingLockInfoKHR-flags-zerobitmask

 `flags` **must** be `0`

If `timeout` is 0, `vkAcquireProfilingLockKHR` will not block while
attempting to acquire the profiling lock.
If `timeout` is `UINT64_MAX`, the function will not return until the
profiling lock was acquired.

[VK_KHR_performance_query](VK_KHR_performance_query.html), [VkAcquireProfilingLockFlagsKHR](VkAcquireProfilingLockFlagsKHR.html), [VkStructureType](VkStructureType.html), [vkAcquireProfilingLockKHR](vkAcquireProfilingLockKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#VkAcquireProfilingLockInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
