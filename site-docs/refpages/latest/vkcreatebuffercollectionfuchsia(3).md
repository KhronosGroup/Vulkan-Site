# vkCreateBufferCollectionFUCHSIA(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateBufferCollectionFUCHSIA.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateBufferCollectionFUCHSIA - Create a new buffer collection

To create a [VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html) for Vulkan to participate in the
buffer collection:

// Provided by VK_FUCHSIA_buffer_collection
VkResult vkCreateBufferCollectionFUCHSIA(
    VkDevice                                    device,
    const VkBufferCollectionCreateInfoFUCHSIA*  pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkBufferCollectionFUCHSIA*                  pCollection);

* 
`device` is the logical device that creates the
`VkBufferCollectionFUCHSIA`

* 
`pCreateInfo` is a pointer to a
[VkBufferCollectionCreateInfoFUCHSIA](VkBufferCollectionCreateInfoFUCHSIA.html) structure containing
parameters affecting creation of the buffer collection

* 
`pAllocator` is a pointer to a [VkAllocationCallbacks](VkAllocationCallbacks.html) structure
controlling host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter

* 
`pCollection` is a pointer to a [VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html)
handle in which the resulting buffer collection object is returned

Valid Usage (Implicit)

* 
[](#VUID-vkCreateBufferCollectionFUCHSIA-device-parameter) VUID-vkCreateBufferCollectionFUCHSIA-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateBufferCollectionFUCHSIA-pCreateInfo-parameter) VUID-vkCreateBufferCollectionFUCHSIA-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkBufferCollectionCreateInfoFUCHSIA](VkBufferCollectionCreateInfoFUCHSIA.html) structure

* 
[](#VUID-vkCreateBufferCollectionFUCHSIA-pAllocator-parameter) VUID-vkCreateBufferCollectionFUCHSIA-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateBufferCollectionFUCHSIA-pCollection-parameter) VUID-vkCreateBufferCollectionFUCHSIA-pCollection-parameter

 `pCollection` **must** be a valid pointer to a [VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html) handle

* 
[](#VUID-vkCreateBufferCollectionFUCHSIA-device-queuecount) VUID-vkCreateBufferCollectionFUCHSIA-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](VkResult.html)

* 
[VK_ERROR_INVALID_EXTERNAL_HANDLE](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

Host Access

All functions referencing a [VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html) **must** be
externally synchronized with the exception of
`vkCreateBufferCollectionFUCHSIA`.

[VK_FUCHSIA_buffer_collection](VK_FUCHSIA_buffer_collection.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkBufferCollectionCreateInfoFUCHSIA](VkBufferCollectionCreateInfoFUCHSIA.html), [VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkCreateBufferCollectionFUCHSIA).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
