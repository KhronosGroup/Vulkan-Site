# PFN_vkInternalFreeNotification(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/PFN_vkInternalFreeNotification.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

PFN_vkInternalFreeNotification - Application-defined memory free notification function

The type of `pfnInternalFree` is:

// Provided by VK_VERSION_1_0
typedef void (*PFN_vkInternalFreeNotification)(
    void*                                       pUserData,
    size_t                                      size,
    VkInternalAllocationType                    allocationType,
    VkSystemAllocationScope                     allocationScope);

* 
`pUserData` is the value specified for
[VkAllocationCallbacks](VkAllocationCallbacks.html)::`pUserData` in the allocator specified
by the application.

* 
`size` is the requested size of an allocation.

* 
`allocationType` is a [VkInternalAllocationType](VkInternalAllocationType.html) value
specifying the requested type of an allocation.

* 
`allocationScope` is a [VkSystemAllocationScope](VkSystemAllocationScope.html) value
specifying the allocation scope of the lifetime of the allocation, as

described xref:spec::chapters/memory.adoc#memory-host-allocation-scope[here].

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkInternalAllocationType](VkInternalAllocationType.html), [VkSystemAllocationScope](VkSystemAllocationScope.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#PFN_vkInternalFreeNotification).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
