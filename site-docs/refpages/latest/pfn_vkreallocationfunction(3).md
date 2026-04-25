# PFN_vkReallocationFunction(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/PFN_vkReallocationFunction.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

PFN_vkReallocationFunction - Application-defined memory reallocation function

The type of `pfnReallocation` is:

// Provided by VK_VERSION_1_0
typedef void* (*PFN_vkReallocationFunction)(
    void*                                       pUserData,
    void*                                       pOriginal,
    size_t                                      size,
    size_t                                      alignment,
    VkSystemAllocationScope                     allocationScope);

* 
`pUserData` is the value specified for
[VkAllocationCallbacks](VkAllocationCallbacks.html)::`pUserData` in the allocator specified
by the application.

* 
`pOriginal` **must** be either `NULL` or a pointer previously returned
by `pfnReallocation` or `pfnAllocation` of a compatible
allocator.

* 
`size` is the size in bytes of the requested allocation.

* 
`alignment` is the requested alignment of the allocation in bytes
and **must** be a power of two.

* 
`allocationScope` is a [VkSystemAllocationScope](VkSystemAllocationScope.html) value
specifying the allocation scope of the lifetime of the allocation, as
described [here](../../../../spec/latest/chapters/memory.html#memory-host-allocation-scope).

If the reallocation was successful, `pfnReallocation` **must** return an
allocation with enough space for `size` bytes, and the contents of the
original allocation from bytes zero to min(original size, new size) -
1 **must** be preserved in the returned allocation.
If `size` is larger than the old size, the contents of the additional
space are **undefined**.
If satisfying these requirements involves creating a new allocation, then
the old allocation **should** be freed.

If `pOriginal` is `NULL`, then `pfnReallocation` **must** behave
equivalently to a call to [PFN_vkAllocationFunction](PFN_vkAllocationFunction.html) with the same
parameter values (without `pOriginal`).

If `size` is zero, then `pfnReallocation` **must** behave equivalently
to a call to [PFN_vkFreeFunction](PFN_vkFreeFunction.html) with the same `pUserData`
parameter value, and `pMemory` equal to `pOriginal`.

If `pOriginal` is non-`NULL`, the implementation **must** ensure that
`alignment` is equal to the `alignment` used to originally allocate
`pOriginal`.

If this function fails and `pOriginal` is non-`NULL` the application
**must** not free the old allocation.

`pfnReallocation` **must** follow the same
[rules for return values as `PFN_vkAllocationFunction`](../../../../spec/latest/chapters/memory.html#vkAllocationFunction_return_rules).

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkSystemAllocationScope](VkSystemAllocationScope.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#PFN_vkReallocationFunction).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
