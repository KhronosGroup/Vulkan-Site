# PFN_vkAllocationFunction(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/PFN_vkAllocationFunction.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

PFN_vkAllocationFunction - Application-defined memory allocation function

The type of `pfnAllocation` is:

// Provided by VK_VERSION_1_0
typedef void* (*PFN_vkAllocationFunction)(
    void*                                       pUserData,
    size_t                                      size,
    size_t                                      alignment,
    VkSystemAllocationScope                     allocationScope);

* 
`pUserData` is the value specified for
[VkAllocationCallbacks](VkAllocationCallbacks.html)::`pUserData` in the allocator specified
by the application.

* 
`size` is the size in bytes of the requested allocation.

* 
`alignment` is the requested alignment of the allocation in bytes
and **must** be a power of two.

* 
`allocationScope` is a [VkSystemAllocationScope](VkSystemAllocationScope.html) value
specifying the allocation scope of the lifetime of the allocation, as
described [here](../../../../spec/latest/chapters/memory.html#memory-host-allocation-scope).

If `pfnAllocation` is unable to allocate the requested memory, it **must**
return `NULL`.
If the allocation was successful, it **must** return a valid pointer to memory
allocation containing at least `size` bytes, and with the pointer value
being a multiple of `alignment`.

|  | Correct Vulkan operation **cannot** be assumed if the application does not
| --- | --- |
follow these rules.

For example, `pfnAllocation` (or `pfnReallocation`) could cause
termination of running Vulkan instance(s) on a failed allocation for
debugging purposes, either directly or indirectly.
In these circumstances, it **cannot** be assumed that any part of any affected
[VkInstance](VkInstance.html) objects are going to operate correctly (even
[vkDestroyInstance](vkDestroyInstance.html)), and the application **must** ensure it cleans up
properly via other means (e.g. process termination). |

If `pfnAllocation` returns `NULL`, and if the implementation is unable
to continue correct processing of the current command without the requested
allocation, it **must** treat this as a runtime error, and generate
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html) at the appropriate time for the command in
which the condition was detected, as described in [Return Codes](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes).

If the implementation is able to continue correct processing of the current
command without the requested allocation, then it **may** do so, and **must** not
generate [VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html) as a result of this failed
allocation.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkSystemAllocationScope](VkSystemAllocationScope.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#PFN_vkAllocationFunction).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
